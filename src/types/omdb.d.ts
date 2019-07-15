export type QueryType = "movie" | "series" | "episode";
export type ApiResponseType = "json" | "xml";

export interface ByIdOrTitleOptions {
  /**
   * A valid IMDb ID (e.g. tt1285016)
   */
  i?: string;

  /**
   * Movie title to search for.
   */
  t?: string;

  /**
   * Type of result to return.
   */
  type?: QueryType;

  /**
   * Year of release.
   */
  y?: number;

  /**
   * Return short or full plot.
   */
  plot?: "short" | "full";

  /**
   * The data type to return.
   */
  r?: ApiResponseType;

  /**
   * JSONP callback name.
   */
  callback?: string;

  /**
   * API version (reserved for future use).
   */
  v?: number;
}

export interface BySearchOptions {
  /**
   * Movie title to search for.
   */
  s: string;

  /**
   * Type of result to return.
   */
  type?: QueryType;

  /**
   * Year of release.
   */
  y?: number;

  /**
   * The data type to return.
   */
  r?: ApiResponseType;

  /**
   * Page number to return.
   */
  page?: number;

  /**
   * JSONP callback name.
   */
  callback?: string;

  /**
   * API version (reserved for future use).
   */
  v?: number;
}

export interface MovieData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings?: (Rating)[] | null;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface Rating {
  Source: string;
  Value: string;
}
