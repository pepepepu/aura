export const getUserProfile = async (token: any) => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar perfil do Spotify");
  }

  const data = await response.json();
  return data;
};