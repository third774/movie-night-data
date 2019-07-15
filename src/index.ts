import credentials from "../credentials.json";
import { getClient, getSheet, updateSheet } from "./googleApi";
import { parseMovieDataFromSheet, delayedPromise } from "./utils";
import { byIdOrTitle } from "./omdbApi";
import { MovieData } from "./types/omdb.js";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID!;

process.env.RUNTIME === "webworker" &&
  addEventListener("fetch", (event: any) => {
    event.respondWith(handleRequest(event.request));
  });

async function handleRequest(_: Request) {
  const resData = await run();
  return new Response(resData, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

async function run() {
  const token = await getClient(credentials);
  const sheet = await getSheet(SPREADSHEET_ID, token.access_token!);
  const movieMetaData = await populateMissingData(
    sheet.values,
    token.access_token!
  );

  process.env.RUNTIME === "node" && console.log("movie data: ", movieMetaData);

  const responseJson = JSON.stringify(movieMetaData);
  return responseJson;
}

async function populateMissingData(values: any, token: string) {
  const { movies, headers } = parseMovieDataFromSheet(values);
  const moviesNeedingUpdates = movies.filter((m: ParsedMovie) => !m.metaData);

  if (moviesNeedingUpdates.length === 0)
    return movies.map(m => JSON.parse(m.metaData));

  const movieMetaData = await Promise.all(
    moviesNeedingUpdates.map((m, i) =>
      delayedPromise(i * 20, () => {
        const year = parseInt(m.released);
        const y = isNaN(year) ? undefined : year;
        return byIdOrTitle({
          t: m.title,
          y,
          i: m.imdbId || undefined
        });
      })
    )
  );

  const movieDataMap = movieMetaData.reduce(
    (acc, movie) => ({
      ...acc,
      [movie.options.t as any]: movie.response
    }),
    {} as { [key: string]: MovieData }
  );

  const update = movies.map(m =>
    headers.map(header =>
      header === "metaData"
        ? m[header] || JSON.stringify(movieDataMap[m.title])
        : m[header] || ""
    )
  );

  await updateSheet(SPREADSHEET_ID, token, update);

  return movies.map(m =>
    m.metaData ? JSON.parse(m.metaData) : movieDataMap[m.title]
  );
}

process.env.RUNTIME === "node" && run();
