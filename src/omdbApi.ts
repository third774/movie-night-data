import fetch from "node-fetch";
import { ByIdOrTitleOptions, MovieData } from "./types/omdb";

const API_URL = "https://www.omdbapi.com/?";
const OMDB_API_KEY = process.env.OMDB_API_KEY;

interface OmdbApiResponse {
  options: ByIdOrTitleOptions;
  response: MovieData;
}

export async function byIdOrTitle(
  options: ByIdOrTitleOptions
): Promise<OmdbApiResponse> {
  const qs = Object.entries({
    apikey: OMDB_API_KEY,
    ...options
  })
    .map(([key, value]) => `${key}=${encodeURIComponent(value || "")}`)
    .join("&");

  const response = await fetch(`${API_URL}${qs}`).then(res => res.json());
  return await {
    options,
    response
  };
}
