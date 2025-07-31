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
        Bem-vindx ao Aura!
        <br></br>
        <br></br>
        Estes Termos de Serviço governam o seu acesso e uso do nosso site e dos
        serviços de visualização de música oferecidos pelo Aura. Por favor, leia
        estes Termos com atenção. Ao acessar ou usar nosso Serviço, você
        concorda em ficar vinculado a estes Termos e à nossa Política de
        Privacidade
      </Text>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          1. Descrição do Serviço
        </Text>
        <Text $textAlign={"justify"}>
          O Aura é um serviço que se conecta à sua conta Spotify para criar
          experiências visuais e interativas com base nos seus dados de audição,
          como a música que você está ouvindo, suas faixas e artistas mais
          ouvidos e as características acústicas das músicas. O Serviço é
          fornecido apenas para seu uso pessoal e não comercial.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          2. Elegibilidade
        </Text>
        <Text $textAlign={"justify"}>
          Para usar o nosso Serviço, você deve ter idade legal para firmar um
          contrato vinculativo e deve ser elegível para usar o serviço Spotify
          de acordo com os termos da Spotify. Ao usar o Aura, você declara e
          garante que cumpre esses requisitos.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          3. Integração com o Spotify e Contas de Usuário
        </Text>
        <Text $textAlign={"justify"}>
          Para que o Aura funcione, é necessário que você autorize o acesso à
          sua conta Spotify através do sistema de autenticação oficial do
          Spotify (OAuth 2.0). Você é responsável por manter a confidencialidade
          das suas credenciais do Spotify.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          4. Relacionamento com o Spotify
        </Text>
        <Text $textAlign={"justify"}>
          O Aura é uma aplicação de terceiros que utiliza a API da Plataforma de
          Desenvolvedores do Spotify para funcionar. O Aura não é afiliado,
          associado, autorizado, endossado por, ou de qualquer forma
          oficialmente conectado com o Spotify. A marca Spotify, bem como todos
          os nomes, logotipos, músicas e dados relacionados são marcas
          registradas e propriedade da Spotify AB. O uso da API do Spotify é
          regido pelos Termos de Serviço para Desenvolvedores do Spotify.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          5. Propriedade Intelectual
        </Text>
        <Box $width={"100%"} $alignItems={"flex-start"}>
          <Text $textAlign={"justify"} $fontWeight={"800"}>
            ✦ Nosso Conteúdo:
          </Text>
          <Text $textAlign={"justify"}>
            O nome "Aura", o logotipo, o site, os visuais gerados (excluindo as
            capas dos álbuns), o código-fonte e todos os elementos de design são
            propriedade de Pedro Paulo Oliveira Barros Souza e protegidos por
            leis de direitos autorais e marcas registradas. Você não pode
            copiar, modificar ou distribuir nosso conteúdo sem nossa permissão
            explícita.
          </Text>
        </Box>
        <Box $width={"100%"} $alignItems={"flex-start"}>
          <Text $textAlign={"justify"} $fontWeight={"800"}>
            ✦ Conteúdo do Spotify:
          </Text>
          <Text $textAlign={"justify"}>
            Todo o conteúdo do Spotify (como nomes de músicas, artistas, capas
            de álbuns, etc.) acessado através do nosso Serviço permanece
            propriedade do Spotify e/ou de seus licenciadores.
          </Text>
        </Box>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          6. Uso Aceitável e Responsabilidades do Usuário
        </Text>
        <Text $textAlign={"justify"}>
          Você concorda em não usar o Serviço para:
          <br></br>✦ Qualquer finalidade ilegal ou não autorizada.
          <br></br>✦ Tentar fazer engenharia reversa, descompilar ou de outra
          forma tentar descobrir o código-fonte do Serviço.
          <br></br>✦ Introduzir vírus, malware ou qualquer outro código
          malicioso.
          <br></br>✦ Tentar contornar quaisquer medidas de segurança ou limites
          de taxa impostos pelo Aura ou pelo Spotify.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          7. Privacidade e Dados do Usuário
        </Text>
        <Text $textAlign={"justify"}>
          Levamos sua privacidade a sério. Nossa Política de Privacidade
          descreve em detalhes quais dados acessamos da sua conta Spotify, como
          os utilizamos e por que não os armazenamos. Recomendamos fortemente
          que você a leia.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          8. Isenção de Garantias e Limitação de Responsabilidade
        </Text>
        <Text $textAlign={"justify"}>
          O Serviço é fornecido "COMO ESTÁ" e "CONFORME DISPONÍVEL", sem
          garantias de qualquer tipo, expressas ou implícitas.
          <br></br>
          <br></br>
          NA MÁXIMA EXTENSÃO PERMITIDA PELA LEI, PEDRO PAULO OLIVEIRA BARROS
          SOUZA NÃO SERÁ RESPONSÁVEL POR QUAISQUER DANOS INDIRETOS, INCIDENTAIS,
          ESPECIAIS, CONSEQUENCIAIS OU PUNITIVOS, OU QUALQUER PERDA DE DADOS,
          USO, OU OUTRAS PERDAS INTANGÍVEIS, RESULTANTES DE (i) SEU ACESSO OU
          USO OU INCAPACIDADE DE ACESSAR OU USAR O SERVIÇO; (ii) QUALQUER
          INTERRUPÇÃO OU CESSAÇÃO DA TRANSMISSÃO DE OU PARA O NOSSO SERVIÇO.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          9. Encerramento
        </Text>
        <Text $textAlign={"justify"}>
          Você pode parar de usar nosso Serviço a qualquer momento. A maneira
          recomendada de desvincular sua conta é revogar o acesso do Aura
          diretamente nas configurações da sua conta Spotify, acessando
          https://www.spotify.com/account/apps.
          <br></br>
          <br></br>
          Nós nos reservamos o direito de suspender ou encerrar seu acesso ao
          Serviço a qualquer momento, por qualquer motivo, especialmente se você
          violar estes Termos.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          10. Alterações nos Termos
        </Text>
        <Text $textAlign={"justify"}>
          Nós nos reservamos o direito de modificar estes Termos a qualquer
          momento. Se fizermos alterações, atualizaremos a data da "Última
          Atualização" no fim desta página. O seu uso continuado do Serviço após
          a data de vigência de tais alterações constituirá a sua aceitação dos
          Termos modificados.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          11. Lei Aplicável
        </Text>
        <Text $textAlign={"justify"}>
          Estes Termos serão regidos e interpretados de acordo com as leis do
          Brasil, sem levar em conta o conflito de disposições legais.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          12. Contato
        </Text>
        <Text $textAlign={"justify"}>
          Se você tiver alguma dúvida sobre estes Termos de Serviço, entre em
          contato conosco pelo e-mail: spedrobreno.2012@hotmail.com.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"center"} $margin={"10px 0px 0px 0px"}>
        <Text $fontStyle={"italic"}>Última Atualização: 30/07/2025</Text>
      </Box>
    </Box>
  );
};

export default VersaoPTBR;
