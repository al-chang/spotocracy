import axios from "axios";

export const fetchAuthToken = async () => {
  const result = await axios.get("http://localhost:8080/spotify/login/", {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  console.log(result);
  return result;
};

interface AuthTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export const getUserAuthToken = async (code: string) => {
  const result = await axios.get<AuthTokenResponse>(
    `http://localhost:8080/spotify/userAuthToken?code=${code}`
  );
  console.log(result);
  return result;
};
