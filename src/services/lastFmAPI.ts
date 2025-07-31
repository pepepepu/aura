// src/services/lastfmApi.ts

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const API_ROOT_URL = "https://ws.audioscrobbler.com/2.0/";

/**
 * Busca a faixa mais recente de um usuário no Last.fm.
 * @param user - O nome de usuário do Last.fm.
 * @returns Os dados das faixas recentes ou null em caso de erro.
 */
export const getRecentTracks = async (user: string) => {
  const method = "user.getRecentTracks";
  // Usamos limit=1 para pegar apenas a música mais recente (a que pode estar tocando agora)
  const url = `${API_ROOT_URL}?method=${method}&user=${user}&api_key=${API_KEY}&limit=1&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Erro na API do Last.fm: ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro de rede ao buscar faixas recentes:", error);
    return null;
  }
};

// Vamos adicionar as outras funções que você vai precisar em breve para adiantar
// Todas seguem o mesmo padrão simples.

/**
 * Busca as faixas mais ouvidas de um usuário.
 * @param user - O nome de usuário do Last.fm.
 * @param period - O período (ex: "7day", "1month", "overall").
 * @param limit - O número de faixas a serem retornadas.
 */
export const getTopTracks = async (
  user: string,
  period = "7day",
  limit = 9
) => {
  const method = "user.getTopTracks";
  const url = `${API_ROOT_URL}?method=${method}&user=${user}&period=${period}&limit=${limit}&api_key=${API_KEY}&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Erro de rede ao buscar Top Tracks:", error);
    return null;
  }
};
