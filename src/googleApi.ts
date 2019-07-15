import { GoogleToken } from "./gtoken";
import { envFetch } from "./envFetch";
import { qs } from "./utils";

export async function getClient(creds: any) {
  const googleToken = new GoogleToken({
    keyFile: creds,
    scope: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const token = await googleToken.getToken();
  return token;
}

export async function getSheet(id: string, token: string) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/A1:Z1000`;
  const res = await envFetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return await res.json();
}

export async function updateSheet(id: string, token: string, update: any) {
  const range = "A2:Z1000";
  const options = {
    valueInputOption: "USER_ENTERED",
    responseValueRenderOption: "FORMATTED_VALUE"
  };
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?${qs(
    options
  )}`;

  const body = JSON.stringify({
    range,
    values: update
  });
  console.log(body);

  const response = await envFetch(url, {
    method: "PUT",
    body,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return await response.json();
}
