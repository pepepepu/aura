export const handleSpotifyLogin = () => {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const AUTH_ENDPOINT = import.meta.env.VITE_SPOTIFY_AUTH_ENDPOINT;
  const RESPONSE_TYPE = "token";
  const SCOPES = [
    "user-top-read",
    "user-read-currently-playing",
  ];
  const scopesString = SCOPES.join(" ");
  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(scopesString)}&response_type=${RESPONSE_TYPE}`;
  window.location.href = authUrl;
};