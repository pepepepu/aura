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
        O Aura utiliza a API Web do Spotify para personalizar sua experiência
        com base em seus hábitos musicais. Esta política explica como seus dados
        são utilizados, armazenados e protegidos durante o uso do serviço.
      </Text>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Quais dados acessamos do Spotify?
        </Text>
        <Text $textAlign={"justify"}>
          Ao fazer login com sua conta do Spotify, o Aura solicita acesso apenas
          leitura às seguintes informações:
          <strong> Seu nome de usuário e imagem de perfil no Spotify</strong>,
          <strong> a música que você está ouvindo no momento</strong>,
          <strong> suas músicas reproduzidas recentemente</strong>,
          <strong> seus artistas e faixas mais ouvidas</strong>,
          <strong>
            {" "}
            características acústicas das músicas (como tempo, energia,
            dançabilidade)
          </strong>
          .<br></br>
          <br></br>O Aura não acessa nem modifica suas playlists, seguidores,
          biblioteca ou dados privados.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Como usamos seus dados?
        </Text>
        <Text $textAlign={"justify"}>
          Utilizamos essas informações para:
          <strong>
            {" "}
            Gerar visuais personalizados baseados na sua música atual ou recente
          </strong>{" "}
          e
          <strong>
            {" "}
            criar uma experiência imersiva e interativa com base nos seus gostos
            musicais
          </strong>
          .<br></br>
          <br></br>
          Esses dados são utilizados apenas durante sua sessão e nunca são
          compartilhados ou vendidos.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Armazenamento de dados
        </Text>
        <Text $textAlign={"justify"}>
          O Aura não armazena nenhum dado do Spotify em servidores ou bancos de
          dados.
          <br></br>
          <br></br>
          Todos os dados são acessados em tempo real via API oficial do Spotify.
          Eles permanecem apenas temporariamente na memória do seu navegador e,
          ao fechar a página, todos os dados são descartados.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Cookies e rastreamento
        </Text>
        <Text $textAlign={"justify"}>
          O Aura não utiliza ferramentas de rastreamento ou cookies de
          terceiros. Cookies básicos podem ser usados para lembrar preferências
          como tema ou idioma, mas nunca para dados pessoais do Spotify.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Exclusão de dados
        </Text>
        <Text $textAlign={"justify"}>
          Como o Aura não armazena dados, normalmente não é necessário
          excluí-los. Se houver dúvidas ou preocupações, entre em contato:
          spedrobreno.2012@hotmail.com.
          <br></br>
          <br></br>
          Você também pode revogar o acesso ao app em:
          https://www.spotify.com/account/apps.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Segurança
        </Text>
        <Text $textAlign={"justify"}>
          Toda a autenticação e acesso aos dados são feitos com segurança
          através do sistema oficial OAuth do Spotify.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"center"} $margin={"10px 0px 0px 0px"}>
        <Text $fontStyle={"italic"}>Última Atualização: 30/07/2025</Text>
      </Box>
    </Box>
  );
};

export default VersaoPTBR;
