Spotocracy is a WIP application built for creating collaborative queues that users can vote on.

To run spotocracy, create a .env file in the client and server folders.

The client requires the following config values:
| Config Value | Description |
| ----------------------- | ----------------------------------------- |
| `REACT_APP_CLIENT_ID` | The spotify API client id. |
| `REACT_APP_REDIRECT_URI` | The redirect URI provided when setting up Spotify app. |
| `REACT_APP_SCOPE` | The scope of permissions requested from Spotify. |
| `REACT_APP_URL` | The URL of the back-end. |

The server requires the following config values:
| Config Value | Description |
| ----------------------- | ----------------------------------------- |
| `CLIENT_ID` | The Spotify API client id. |
| `CLIENT_SECRET` | the Spotify API secret. |
| `CLIENT_URL` | The URL of the front-end. |
| `REDIRECT_URI` | The redirect URI provided when setting up Spotify app. (currently not used) |
