export interface AuraTrack {
  id: string;
  name: string;
  artists: { name: string; id: string }[];
  album: {
    images: { url: string }[];
    mbid?: string;
  };
}

export interface UserInfo {
  name: string;
  imageUrl: string;
}

// --- SEÇÃO LAST.FM ---
const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const API_BASE_URL = "https://ws.audioscrobbler.com/2.0/";

const mapLastfmTrackToAuraTrack = (lastfmTrack: any): AuraTrack => {
  const imageUrl =
    lastfmTrack.image?.find((img: any) => img.size === "extralarge")?.[
      "#text"
    ] || "";

  const mainArtist = {
    name: lastfmTrack.artist.name || lastfmTrack.artist["#text"],
    id: lastfmTrack.artist.mbid,
  };
  const allArtists = [mainArtist];
  const featRegex = /\s\(?(?:feat|ft)\.?\s([^)]+)\)?|\s(?:&|with)\s(.+)/i;
  const match = lastfmTrack.name.match(featRegex);

  let cleanTrackName = lastfmTrack.name;

  if (match) {
    cleanTrackName = lastfmTrack.name.replace(featRegex, "").trim();
    const featuredArtistsString = match[1] || match[2];
    const featuredArtists = featuredArtistsString
      .split(/,\s*|\s*&\s*/)
      .map((name: string) => ({
        name: name.trim(),
        id: "",
      }));

    allArtists.push(...featuredArtists);
  }

  return {
    id: lastfmTrack.mbid || `${lastfmTrack.name}-${mainArtist.name}`,
    name: cleanTrackName,
    artists: allArtists,
    album: {
      images: [{ url: imageUrl }],
      mbid: lastfmTrack.album?.mbid,
    },
  };
};

const mapSpotifyTrackToAuraTrack = (spotifyTrack: any): AuraTrack => {
  return {
    id: spotifyTrack.id,
    name: spotifyTrack.name,
    artists: spotifyTrack.artists.map((artist: any) => ({
      name: artist.name,
      id: artist.id,
    })),
    album: {
      images: [{ url: spotifyTrack.album.images[0]?.url || "" }],
      mbid: undefined,
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

    const lastfmTrack = data.recenttracks?.track?.[0];

    if (lastfmTrack && lastfmTrack["@attr"]?.nowplaying === "true") {
      console.log(
        "Last.fm encontrou:",
        lastfmTrack.name,
        "-",
        lastfmTrack.artist["#text"]
      );

      const spotifyTrack = await searchTrackOnSpotify(
        lastfmTrack.name,
        lastfmTrack.artist["#text"]
      );

      if (spotifyTrack) {
        console.log("Spotify encontrou detalhes completos. Mapeando...");
        return mapSpotifyTrackToAuraTrack(spotifyTrack);
      } else {
        console.warn(
          "Não encontrado no Spotify. Usando dados do Last.fm como fallback."
        );
        return mapLastfmTrackToAuraTrack(lastfmTrack);
      }
    }

    return null; // Nenhuma música tocando
  } catch (error) {
    console.error("Erro no fluxo do getNowPlaying:", error);
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

/**
 * Busca informações pessoais do usuário. (nome de usuário e foto de perfil)
 * Usado no componente Header.
 */
export const getUserInfo = async (): Promise<UserInfo | null> => {
  const username = window.localStorage.getItem("lastfm_username");
  if (!username) return null;

  const url = `${API_BASE_URL}?method=user.getInfo&user=${username}&api_key=${LASTFM_API_KEY}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) throw new Error(data.message);

    let imageUrl = data.user.image?.find((img: any) => img.size === "medium")?.[
      "#text"
    ];

    if (!imageUrl || imageUrl.length === 0) {
      imageUrl = null;
    }

    return {
      name: data.user.name,
      imageUrl: imageUrl,
    };
  } catch (error) {
    console.error("Erro ao buscar informações do usuário do Last.fm:", error);
    return null;
  }
};

/**
 * Busca as tags relacionadas a uma música
 * Usado em Constelação.
 */
export const getTrackTopGenres = async (
  trackName: string,
  artistName: string
): Promise<string[]> => {
  const url = `${API_BASE_URL}?method=track.getTopTags&artist=${encodeURIComponent(
    artistName
  )}&track=${encodeURIComponent(
    trackName
  )}&api_key=${LASTFM_API_KEY}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error || !data.toptags?.tag || data.toptags.tag.length === 0) {
      console.warn(`Nenhum gênero encontrado para "${trackName}"`);
      return [];
    }
    const allGenres = data.toptags.tag.map((tag: any) => tag.name);

    return allGenres;
  } catch (error) {
    console.error("Erro ao buscar gêneros da música:", error);
    return [];
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

export async function searchTrackOnSpotify(
  trackName: string,
  artistName: string
): Promise<any | null> {
  const token = await getSpotifyClientToken();
  if (!token) return null;

  const cleanTrackName = trackName.replace(/\s\(.+\)/, "").trim();

  const query = encodeURIComponent(
    `track:${cleanTrackName} artist:${artistName}`
  );
  const url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      console.error("Erro na busca do Spotify:", await response.text());
      return null;
    }

    const data = await response.json();
    return data.tracks.items[0] || null;
  } catch (e) {
    console.error(`Erro ao buscar no Spotify para "${trackName}"`, e);
    return null;
  }
}

export async function getCoverArtFromSpotify(
  trackName: string,
  artistName: string
): Promise<string | null> {
  const track = await searchTrackOnSpotify(trackName, artistName);
  return track?.album.images[0]?.url || null;
}
