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
        Bem-vindo(a) ao Aura!
        <br></br>
        <br></br>
        Estes Termos de Serviço governam o seu acesso e uso do nosso site e dos
        serviços de visualização de música oferecidos pelo Aura. Por favor, leia
        estes Termos com atenção. Ao acessar ou usar nosso Serviço, você
        concorda em ficar vinculado a estes Termos e à nossa Política de
        Privacidade.
      </Text>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          1. Descrição do Serviço
        </Text>
        <Text $textAlign={"justify"}>
          O Aura é um serviço que se conecta à sua conta{" "}
          <strong>Last.fm</strong> para acessar seu histórico de músicas e
          utiliza a API pública do <strong>Spotify</strong> para obter as capas
          dos álbuns. Com esses dados, criamos experiências visuais e
          interativas. O Serviço é fornecido apenas para seu uso pessoal e não
          comercial.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          2. Elegibilidade
        </Text>
        <Text $textAlign={"justify"}>
          Para usar o nosso Serviço, você deve ter idade legal para firmar um
          contrato vinculativo e deve ser elegível para usar o serviço do
          Last.fm de acordo com os termos do próprio Last.fm. Ao usar o Aura,
          você declara e garante que cumpre esses requisitos.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          3. Integração com APIs e Contas de Usuário
        </Text>
        <Text $textAlign={"justify"}>
          Para que o Aura funcione, é necessário que você autorize o acesso à
          sua conta <strong>Last.fm</strong> através do sistema de autenticação
          oficial do Last.fm. Você é responsável por manter a confidencialidade
          das suas credenciais do Last.fm. O Aura não solicita e não requer
          acesso ou login à sua conta do Spotify.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          4. Relacionamento com Last.fm e Spotify
        </Text>
        <Text $textAlign={"justify"}>
          O Aura é uma aplicação de terceiros que utiliza as APIs do Last.fm e
          do Spotify para funcionar. O Aura não é afiliado, associado,
          autorizado ou endossado por Last.fm ou Spotify. As marcas, nomes,
          logotipos, músicas e dados relacionados são propriedade de seus
          respectivos donos.
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
            leis de direitos autorais.
          </Text>
        </Box>
        <Box $width={"100%"} $alignItems={"flex-start"}>
          <Text $textAlign={"justify"} $fontWeight={"800"}>
            ✦ Conteúdo de Terceiros:
          </Text>
          <Text $textAlign={"justify"}>
            Todo o conteúdo (como nomes de músicas, artistas, capas de álbuns,
            etc.) acessado através do nosso Serviço permanece propriedade do
            Last.fm, Spotify e/ou de seus licenciadores.
          </Text>
        </Box>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          6. Uso Aceitável
        </Text>
        <Text $textAlign={"justify"}>
          Você concorda em não usar o Serviço para:
          <br />✦ Qualquer finalidade ilegal ou não autorizada.
          <br />✦ Tentar fazer engenharia reversa ou de outra forma tentar
          descobrir o código-fonte.
          <br />✦ Introduzir vírus, malware ou qualquer outro código malicioso.
          <br />✦ Tentar contornar quaisquer medidas de segurança do Aura,
          Last.fm ou Spotify.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          7. Privacidade e Dados
        </Text>
        <Text $textAlign={"justify"}>
          Levamos sua privacidade a sério. Nossa{" "}
          <strong>Política de Privacidade</strong> descreve em detalhes quais
          dados acessamos da sua conta Last.fm, como os utilizamos e por que não
          os armazenamos. Recomendamos fortemente que você a leia.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          8. Isenção de Garantias e Limitação de Responsabilidade
        </Text>
        <Text $textAlign={"justify"}>
          O Serviço é fornecido "COMO ESTÁ", sem garantias de qualquer tipo. NA
          MÁXIMA EXTENSÃO PERMITIDA PELA LEI, PEDRO PAULO OLIVEIRA BARROS SOUZA
          NÃO SERÁ RESPONSÁVEL POR QUAISQUER DANOS INDIRETOS, INCIDENTAIS,
          ESPECIAIS, CONSEQUENCIAIS OU PUNITIVOS RESULTANTES DO SEU ACESSO OU
          USO DO SERVIÇO.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          9. Encerramento
        </Text>
        <Text $textAlign={"justify"}>
          Você pode parar de usar nosso Serviço a qualquer momento. A maneira
          recomendada de desvincular sua conta é revogar o acesso do Aura
          diretamente nas configurações da sua conta <strong>Last.fm</strong>,
          conforme descrito em nossa Política de Privacidade.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          10. Alterações nos Termos
        </Text>
        <Text $textAlign={"justify"}>
          Nós nos reservamos o direito de modificar estes Termos a qualquer
          momento. Se fizermos alterações, atualizaremos a data da "Última
          Atualização" no fim desta página.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          11. Lei Aplicável
        </Text>
        <Text $textAlign={"justify"}>
          Estes Termos serão regidos e interpretados de acordo com as leis do
          Brasil.
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
        <Text $fontStyle={"italic"}>
          Última Atualização: 06 de Agosto de 2025
        </Text>
      </Box>
    </Box>
  );
};

export default VersaoPTBR;
