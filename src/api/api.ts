import axios from "axios";

export const fetchAuthToken = async () => {
  const result = await axios.get("http://localhost:8080/spotify/login", {});
  console.log(result);
  return result;
};
