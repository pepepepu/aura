import React, { useEffect, useState } from "react";
import { AuraBG, Box } from "../../components";
import { themes } from "../../styles/themes";

// (Opcional) Interfaces para tipagem dos dados
interface Artist {
  name: string;
  id: string;
}

interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: {
    images: { url: string }[];
  };
}

const Dashboard: React.FC = () => {
  // 1. Estados para armazenar os novos dados
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Track | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtist, setTopArtist] = useState<Artist | null>(null);
  const [error, setError] = useState<string | null>(null);


  // 2. Efeito para buscar todos os dados da API
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = window.localStorage.getItem("spotify_token");
      if (!token) {
        setError("Token de autenticação não encontrado.");
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const spotifyApiBase = "https://api.spotify.com/v1/me";

      try {
        // Busca a música que está tocando
        const playingResponse = await fetch(`${spotifyApiBase}/player/currently-playing`, { headers });
        if (playingResponse.status === 200) {
          const playingData = await playingResponse.json();
          setCurrentlyPlaying(playingData.item);
        } // Se o status for 204, nada está tocando, o que não é um erro.

        // Busca as 8 músicas mais ouvidas (short_term = ~4 semanas)
        const tracksResponse = await fetch(`${spotifyApiBase}/top/tracks?time_range=short_term&limit=8`, { headers });
        if (!tracksResponse.ok) throw new Error("Falha ao buscar as top músicas.");
        const tracksData = await tracksResponse.json();
        setTopTracks(tracksData.items);

        // Busca o artista mais ouvido (short_term = ~4 semanas)
        const artistResponse = await fetch(`${spotifyApiBase}/top/artists?time_range=short_term&limit=1`, { headers });
        if (!artistResponse.ok) throw new Error("Falha ao buscar o top artista.");
        const artistData = await artistResponse.json();
        if (artistData.items.length > 0) {
          setTopArtist(artistData.items[0]);
        }

      } catch (err: any) {
        setError("Seu token pode ter expirado. Faça login novamente. (" + err.message + ")");
      }
    };

    fetchDashboardData();
  }, []);

  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentThemeIndex(prevIndex => (prevIndex + 1) % themes.length);
    }, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const currentTheme = themes[currentThemeIndex];

  return (
    <AuraBG
      width={"100vw"}
      height={"100vh"}
      colors={currentTheme.colors}
      backgroundColor={currentTheme.backgroundColor}
      interactive={true}
      grainy={true}
    >
      <Box $width={"100vw"} $height={"100vh"} $padding={"30px"} $flexDirection={"column"} $gap={"20px"}>
        <h1>Seu Dashboard</h1>
        {error && <p style={{ color: "red" }}>Erro: {error}</p>}

        {/* Seção: Tocando Agora */}
        <Box $flexDirection={"column"}>
          <h2>Tocando Agora</h2>
          {currentlyPlaying ? (
            <div>
              <p><strong>{currentlyPlaying.name}</strong> por {currentlyPlaying.artists.map(a => a.name).join(", ")}</p>
            </div>
          ) : (
            <p>Nenhuma música tocando no momento.</p>
          )}
        </Box>

        {/* Seção: Artista Mais Ouvido */}
        <Box $flexDirection={"column"}>
          <h2>Artista Mais Ouvido da Semana</h2>
          {topArtist ? <p>{topArtist.name}</p> : !error && <p>Carregando...</p>}
        </Box>

        {/* Seção: Músicas Mais Ouvidas */}
        <Box $flexDirection={"column"}>
          <h2>Suas 8 Músicas Mais Ouvidas da Semana</h2>
          {topTracks.length > 0 ? (
            <ol style={{ listStyle: "decimal", paddingLeft: "20px", margin: 0 }}>
              {topTracks.map((track) => (
                <li key={track.id}>{track.name}</li>
              ))}
            </ol>
          ) : (
            !error && <p>Carregando...</p>
          )}
        </Box>
      </Box>
    </AuraBG>
  );
};

export default Dashboard;