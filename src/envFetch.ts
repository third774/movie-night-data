export const envFetch: typeof fetch =
  process.env.RUNTIME === "webworker" && typeof fetch !== "undefined"
    ? fetch
    : require("node-fetch").default;
