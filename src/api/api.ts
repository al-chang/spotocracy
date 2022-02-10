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

export const getUserAuthToken = async (code: string) => {
  const result = await axios.get<string>(
    `http://localhost:8080/spotify/userAuthToken?code=${code}`
  );
  return result;
};
