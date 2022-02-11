export const makeRoomID = () => {
  let result = '';
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateRandomString = function (length: number) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const generateErrorResponse = (message: string) => {
  return {
    errorMessage: message,
  };
};

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const generateSpotifyOptions = (
  path: string,
  method: Method,
  authToken: string,
) => {
  return {
    hostname: 'api.spotify.com',
    path: path,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      Accept: 'application/json',
    },
  };
};
