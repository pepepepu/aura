import CryptoJS from "crypto-js";

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const SHARED_SECRET = import.meta.env.VITE_LASTFM_SHARED_SECRET;
const CALLBACK_URI = import.meta.env.VITE_LASTFM_CALLBACK_URI;

export const handleLastfmLogin = () => {
  const authUrl = `https://www.last.fm/api/auth/?api_key=${API_KEY}&cb=${encodeURIComponent(
    CALLBACK_URI
  )}`;
  window.location.href = authUrl;
};

export const getSessionKey = async (token: string) => {
  const apiSigString = `api_key${API_KEY}methodauth.getSessiontoken${token}${SHARED_SECRET}`;

  const apiSig = CryptoJS.MD5(apiSigString).toString();

  const url = `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&api_key=${API_KEY}&token=${token}&api_sig=${apiSig}&format=json`;

  try {
    const response = await fetch(url, { method: "POST" });
    const data = await response.json();

    if (data.error) {
      console.error("Last.fm getSession Error:", data.message);
      throw new Error(data.message);
    }

    const sessionKey = data.session.key;
    const username = data.session.name;

    window.localStorage.setItem("lastfm_session_key", sessionKey);
    window.localStorage.setItem("lastfm_username", username);

    return sessionKey;
  } catch (error) {
    console.error("Falha ao obter a chave de sessão do Last.fm", error);
    throw error;
  }
};
