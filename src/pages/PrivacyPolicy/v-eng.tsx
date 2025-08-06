import React from "react";
import { Box, Text } from "../../components";

const VersaoENG: React.FC = () => {
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
        Welcome to Aura's Privacy Policy. To create your personalized visual
        experience, we use the APIs of <strong>Last.fm</strong> and{" "}
        <strong>Spotify</strong>, each for a specific purpose. This policy
        transparently explains how your data is used.
      </Text>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          What Data Do We Access?
        </Text>
        <Text $textAlign={"justify"}>
          Aura uses two distinct data sources to function:
          <br />
          <br />
          <strong>1. With your permission, via Last.fm:</strong>
          <br />
          By connecting with your Last.fm account, Aura requests{" "}
          <strong>read-only</strong> access to the following information from
          your profile:
          <ul>
            <li>Your Last.fm username.</li>
            <li>Your currently playing track (now playing).</li>
            <li>Your top tracks over different periods.</li>
          </ul>
          Aura does not access, store, or modify any other information from your
          Last.fm account.
          <br />
          <br />
          <strong>2. Anonymously, via Spotify:</strong>
          <br />
          Aura does <strong>NOT</strong> request access to or login with your
          Spotify account. We use the track name and artist name (obtained from
          Last.fm) to perform a public, anonymous search on the Spotify API with
          the sole purpose of retrieving the URL for the official, high-quality
          album art. No personal information of yours is sent or associated with
          this search.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          How We Use Your Data
        </Text>
        <Text $textAlign={"justify"}>
          We use this information exclusively to:
          <ul>
            <li>
              Generate personalized visual projections ("auras") based on your
              top tracks or currently playing song, using data from Last.fm.
            </li>
            <li>
              Ensure the best possible visual quality by fetching official album
              covers from Spotify to extract color palettes.
            </li>
          </ul>
          Your listening data is never stored on our servers, shared, or sold.
          It is only used in real-time during your session on the site.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Data Storage
        </Text>
        <Text $textAlign={"justify"}>
          Aura does not have a user database. The only piece of information we
          store, so you don't have to log in on every visit, is your Last.fm
          session key (`session_key`). It is stored securely in your browser's
          `localStorage` and is discarded when you log out.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Data Deletion
        </Text>
        <Text $textAlign={"justify"}>
          Since we do not store your data, the deletion process is simple. When
          you log out of Aura, your session key is removed from your browser. To
          permanently revoke Aura's access to your Last.fm account, you can do
          so at any time in your account settings:
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
          Security
        </Text>
        <Text $textAlign={"justify"}>
          All authentication and access to your listening data are handled
          securely through Last.fm's official authentication system. We never
          have access to your password.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"center"} $margin={"10px 0px 0px 0px"}>
        <Text $fontStyle={"italic"}>Last updated: August 6, 2025</Text>
      </Box>
    </Box>
  );
};

export default VersaoENG;
