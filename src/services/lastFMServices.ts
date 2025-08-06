// src/services/lastFMServices.ts

export interface AuraTrack {
  id: string;
  name: string;
  artists: { name: string; id: string }[];
  album: {
    images: { url: string }[];
    mbid?: string;
  };
}

// --- SEÇÃO LAST.FM ---
const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const API_BASE_URL = "https://ws.audioscrobbler.com/2.0/";

const mapLastfmTrackToAuraTrack = (lastfmTrack: any): AuraTrack => {
  const imageUrl =
    lastfmTrack.image?.find((img: any) => img.size === "extralarge")?.[
      "#text"
    ] || "";

  return {
    id: lastfmTrack.mbid || `${lastfmTrack.name}-${lastfmTrack.artist.name}`,
    name: lastfmTrack.name,
    artists: [
      {
        name: lastfmTrack.artist.name || lastfmTrack.artist["#text"],
        id: lastfmTrack.artist.mbid,
      },
    ],
    album: {
      images: [{ url: imageUrl }],
      mbid: lastfmTrack.album?.mbid,
    },
  };
};

/**
 * Busca a música que está tocando agora (em scrobble) no Last.fm.
 * Usado no Dashboard.
 */
export const getNowPlaying = async (): Promise<AuraTrack | null> => {
  const username = window.localStorage.getItem("lastfm_username");
  if (!username) throw new Error("Usuário Last.fm não encontrado.");

  const url = `${API_BASE_URL}?method=user.getRecentTracks&user=${username}&api_key=${LASTFM_API_KEY}&limit=1&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) throw new Error(data.message);

    const firstTrack = data.recenttracks?.track?.[0];

    if (firstTrack && firstTrack["@attr"]?.nowplaying === "true") {
      return mapLastfmTrackToAuraTrack(firstTrack);
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar música atual do Last.fm:", error);
    return null;
  }
};

/**
 * Busca as 9 músicas mais ouvidas do usuário na última semana no Last.fm.
 * Usado em Energia da Semana.
 */
export const getTopTracksWeekly = async (): Promise<AuraTrack[]> => {
  const username = window.localStorage.getItem("lastfm_username");
  if (!username) throw new Error("Usuário Last.fm não encontrado.");

  const url = `${API_BASE_URL}?method=user.getTopTracks&user=${username}&api_key=${LASTFM_API_KEY}&period=7day&limit=9&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) throw new Error(data.message);
    const tracks = data.toptracks?.track || [];
    return tracks.map(mapLastfmTrackToAuraTrack);
  } catch (error) {
    console.error("Erro ao buscar Top 9 da semana do Last.fm:", error);
    return [];
  }
};

/**
 * Busca a música mais ouvida de um determinado período.
 * Usado em Minha Aura.
 */
export const getTopTrackForPeriod = async (
  period: "7day" | "1month" | "3month" | "6month" | "12month" | "overall"
): Promise<AuraTrack | null> => {
  const username = window.localStorage.getItem("lastfm_username");
  if (!username) throw new Error("Usuário Last.fm não encontrado.");

  const url = `${API_BASE_URL}?method=user.getTopTracks&user=${username}&api_key=${LASTFM_API_KEY}&period=${period}&limit=1&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) throw new Error(data.message);

    const firstTrack = data.toptracks?.track?.[0];
    if (firstTrack) {
      return mapLastfmTrackToAuraTrack(firstTrack);
    }

    return null;
  } catch (error) {
    console.error(`Erro ao buscar top track para o período ${period}:`, error);
    return null;
  }
};

// --- SEÇÃO SPOTIFY (Client Credentials) ---
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

let spotifyToken: { value: string | null; expires: number } = {
  value: null,
  expires: 0,
};

async function getSpotifyClientToken(): Promise<string | null> {
  if (spotifyToken.value && Date.now() < spotifyToken.expires) {
    return spotifyToken.value;
  }

  const authString = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    console.error("Falha ao obter token de cliente do Spotify");
    return null;
  }

  const data = await response.json();
  spotifyToken = {
    value: data.access_token,
    expires: Date.now() + (data.expires_in - 60) * 1000,
  };
  return spotifyToken.value;
}

/**
 * Busca a URL da capa de uma música no Spotify usando o nome da faixa e do artista.
 */
export async function getCoverArtFromSpotify(
  trackName: string,
  artistName: string
): Promise<string | null> {
  const token = await getSpotifyClientToken();
  if (!token) return null;

  const query = encodeURIComponent(`track:${trackName} artist:${artistName}`);
  const url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) return null;

    const data = await response.json();
    return data.tracks.items[0]?.album.images[0]?.url || null;
  } catch (e) {
    console.error(`Erro ao buscar capa no Spotify para "${trackName}"`, e);
    return null;
  }
}
