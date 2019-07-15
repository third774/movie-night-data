# Movie Night Data Worker

Powers the [data visualization found here](https://observablehq.com/d/3eec4121b807b199).

A Cloudflare worker for fetching movie meta data from the Google Sheets API. Just enter the movie `title` and optionally `year` and the metadata will be automatically fetched and populated by the worker.

| title        | released | watched  | theme    | showing | imdbId    | metaData             |
| ------------ | -------- | -------- | -------- | ------- | --------- | -------------------- |
| Blade Runner | 1982     | 12/13/15 | Neo-noir | primary | tt0083658 | { ...IMDb metadata } |

## Setup

Needs a `.env` file with the following variables:

```
OMDB_API_KEY=
SPREADSHEET_ID=
```

and a `credentials.json` file for a [Google Service Account](https://cloud.google.com/iam/docs/service-accounts) that should look like this:

```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "...",
  "client_email": "...",
  "client_id": "...",
  "auth_uri": "...",
  "token_uri": "...",
  "auth_provider_x509_cert_url": "...",
  "client_x509_cert_url": "..."
}
```
