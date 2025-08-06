import React from "react";
import { Box, Text } from "../../components";

const VersaoPTBR: React.FC = () => {
  return (
    <Box
      $width={{ base: "90%", lg: "50%", md: "75%" }}
      $maxHeight={"60dvh"}
      $overflowY={"auto"}
      $borderRadius={"10px"}
      $padding={{ base: "20px", lg: "20px 30px", md: "20px 30px" }}
      $gap={"20px"}
      $alignItems={"flex-start"}
      $justifyContent={"flex-start"}
    >
      <Text $textAlign={"justify"}>
        Bem-vindo à Política de Privacidade do Aura. Para criar sua experiência
        visual e personalizada, utilizamos as APIs do <strong>Last.fm</strong> e
        do <strong>Spotify</strong>, cada uma com uma finalidade específica.
        Esta política explica de forma transparente como seus dados são
        utilizados.
      </Text>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Quais dados acessamos?
        </Text>
        <Text $textAlign={"justify"}>
          O Aura utiliza duas fontes de dados distintas para funcionar:
          <br />
          <br />
          <strong>1. Com sua permissão, via Last.fm:</strong>
          <br />
          Ao se conectar com sua conta do Last.fm, o Aura solicita acesso de{" "}
          <strong>apenas leitura</strong> às seguintes informações do seu
          perfil:
          <ul>
            <li>Seu nome de usuário do Last.fm.</li>
            <li>Sua música tocando no momento (now playing).</li>
            <li>
              Suas músicas mais ouvidas em diferentes períodos (top tracks).
            </li>
          </ul>
          O Aura não acessa, armazena ou modifica qualquer outra informação da
          sua conta Last.fm.
          <br />
          <br />
          <strong>2. De forma anônima, via Spotify:</strong>
          <br />O Aura <strong>NÃO</strong> solicita acesso ou login à sua conta
          do Spotify. Nós utilizamos o nome da música e do artista (obtidos
          através do Last.fm) para fazer uma busca pública e anônima na API do
          Spotify com um único objetivo: obter a URL da capa oficial do álbum em
          alta qualidade. Nenhuma informação pessoal sua é enviada ou associada
          a essa busca.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Como usamos seus dados?
        </Text>
        <Text $textAlign={"justify"}>
          Utilizamos essas informações exclusivamente para:
          <ul>
            <li>
              Gerar as projeções visuais ("auras") com base nas suas músicas
              mais ouvidas ou na música que você está ouvindo no momento, a
              partir dos dados do Last.fm.
            </li>
            <li>
              Garantir a melhor qualidade visual possível, buscando as capas
              oficiais no Spotify para extrair as paletas de cores.
            </li>
          </ul>
          Seus dados de escuta nunca são armazenados em nossos servidores,
          compartilhados ou vendidos. Eles são usados apenas em tempo real,
          durante sua sessão no site.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Armazenamento de dados
        </Text>
        <Text $textAlign={"justify"}>
          O Aura não possui um banco de dados de usuários. A única informação
          que guardamos, para que você não precise fazer login a cada visita, é
          a sua chave de sessão (`session_key`) do Last.fm. Ela fica armazenada
          de forma segura no `localStorage` do seu navegador e é descartada
          quando você faz logout.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Exclusão de dados
        </Text>
        <Text $textAlign={"justify"}>
          Como não armazenamos seus dados, o processo de exclusão é simples. Ao
          fazer logout no Aura, sua chave de sessão é removida do navegador.
          Para revogar permanentemente o acesso do Aura à sua conta Last.fm,
          você pode fazer isso a qualquer momento nas configurações da sua
          conta:
          <br />
          <br />
          <a
            href="https://www.last.fm/settings/applications"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>https://www.last.fm/settings/applications</strong>
          </a>
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Segurança
        </Text>
        <Text $textAlign={"justify"}>
          Toda a autenticação e acesso aos seus dados de escuta são feitos com
          segurança através do sistema de autenticação oficial do Last.fm. Nós
          nunca temos acesso à sua senha.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"center"} $margin={"10px 0px 0px 0px"}>
        <Text $fontStyle={"italic"}>
          Última Atualização: 06 de Agosto de 2025
        </Text>
      </Box>
    </Box>
  );
};

export default VersaoPTBR;
