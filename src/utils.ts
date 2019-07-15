export function delayedPromise<T>(
  delay: number,
  generatePromise: () => Promise<T>
) {
  return new Promise<T>((res, rej) => {
    setTimeout(() => {
      res(generatePromise());
    }, delay);
  });
}

export function parseMovieDataFromSheet(values: any) {
  const [headers, ...data] = values as [
    Extract<keyof ParsedMovie, string>[],
    string[]
  ];
  const movies: ParsedMovie[] = data.map((values: string[], rowIdx: number) =>
    values.reduce(
      (acc: ParsedMovie, value: string, valueIdx: number) => ({
        ...acc,
        [headers[valueIdx]]: value,
        rowId: rowIdx + 2
      }),
      {} as ParsedMovie
    )
  );

  return { movies, headers };
}

export function qs<T extends object>(obj: T) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}
