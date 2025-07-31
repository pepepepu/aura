// src/services/lastfmAuth.ts

import md5 from "md5";

// Variáveis de ambiente e constantes
const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const SECRET = import.meta.env.VITE_LASTFM_SECRET;
const API_ROOT_URL = "https://ws.audioscrobbler.com/2.0/";

/**
 * Helper para gerar a assinatura MD5 exigida pela API do Last.fm para chamadas autenticadas.
 * @param params - Objeto com os parâmetros da requisição (ex: method, api_key, token).
 * @param secret - Seu "Shared Secret" do Last.fm.
 * @returns A assinatura MD5.
 */
const generateApiSignature = (
  params: Record<string, string>,
  secret: string
): string => {
  // Ordena as chaves dos parâmetros em ordem alfabética
  const sortedKeys = Object.keys(params).sort();

  // Concatena chave e valor (ex: "api_keySUACHAVEmethodauth.getSession")
  let signatureString = "";
  sortedKeys.forEach((key) => {
    signatureString += key + params[key];
  });

  // Adiciona o "secret" no final
  signatureString += secret;

  // Retorna o hash MD5 da string resultante
  return md5(signatureString);
};

/**
 * PASSO 1 e 2: Inicia o processo de login, obtendo um token temporário
 * e redirecionando o usuário para a página de autorização do Last.fm.
 */
export const handleLastfmLogin = async () => {
  // O callback é opcional aqui, mas recomendado. Ele pode ser configurado no painel do Last.fm também.
  const REDIRECT_URI = import.meta.env.VITE_LASTFM_REDIRECT_URI;
  const method = "auth.getToken";
  const url = `${API_ROOT_URL}?method=${method}&api_key=${API_KEY}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error("Erro ao obter o token do Last.fm:", data.message);
      // Aqui você pode mostrar um erro para o usuário na UI
      return;
    }

    const token = data.token;

    // Redireciona o usuário para autorizar o app, passando o token obtido
    const authUrl = `http://googleusercontent.com/last.fm/6`;
    window.location.href = `${authUrl}?api_key=${API_KEY}&token=${token}&cb=${encodeURIComponent(
      REDIRECT_URI
    )}`;
  } catch (error) {
    console.error("Erro de rede ao iniciar o login com Last.fm:", error);
  }
};

/**
 * PASSO 3: A ser chamado na sua página de callback.
 * Usa o token autorizado (da URL) para obter a chave de sessão permanente.
 * @param token - O token recebido como parâmetro na URL de callback.
 * @returns Um objeto com a chave de sessão (`sk`) e o nome de usuário (`name`), ou null em caso de erro.
 */
export const getLastfmSession = async (token: string) => {
  const method = "auth.getSession";

  // Prepara os parâmetros para gerar a assinatura
  const params = {
    method,
    api_key: API_KEY,
    token,
  };

  // Gera a assinatura da API
  const api_sig = generateApiSignature(params, SECRET);

  // Constrói a URL final da requisição
  const url = `${API_ROOT_URL}?method=${method}&api_key=${API_KEY}&token=${token}&api_sig=${api_sig}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error("Erro ao obter a sessão do Last.fm:", data.message);
      return null;
    }

    // Sucesso! O objeto data.session contém o que precisamos.
    console.log("Sessão do Last.fm obtida com sucesso:", data.session);
    return data.session; // Ex: { name: 'meu_usuario', sk: 'CHAVE_DE_SESSAO_LONGA' }
  } catch (error) {
    console.error("Erro de rede ao obter a sessão do Last.fm:", error);
    return null;
  }
};
