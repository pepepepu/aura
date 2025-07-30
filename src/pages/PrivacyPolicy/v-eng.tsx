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
        Aura uses the Spotify Web API to personalize your experience by retrieving your listening data and related profile information.
        This policy explains how your data is used, stored, and protected when you use the Aura service.
      </Text>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          What Data We Access from Spotify
        </Text>
        <Text $textAlign={"justify"}>
          When you log in with your Spotify account, Aura requests read-only access to:
          <strong> Your Spotify display name and profile image</strong>,
          <strong> your currently playing track</strong>,
          <strong> your recently played tracks</strong>,
          <strong> your top artists and top tracks</strong>,
          <strong> audio features of your tracks (such as tempo, energy, danceability)</strong>.
          <br></br>
          <br></br>
          Aura does not access or modify your playlists, followers, library, or private account details.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          How We Use Your Data?
        </Text>
        <Text $textAlign={"justify"}>
          We use this information to:
          <strong> Generate personalized visuals based on your current or recent listening</strong> e
          <strong> enhance the interactive and immersive experience of the Aura interface</strong>.
          <br></br>
          <br></br>
          This data is used only during your session and is never sold or shared with third parties.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Data Storage
        </Text>
        <Text $textAlign={"justify"}>
          Aura does not store any Spotify data on servers or in a database.
          <br></br>
          <br></br>
          All data is fetched securely via Spotify's API.
          It remains in your browser's memory temporarily. Once you close the page, all data is discarded.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Cookies and Tracking
        </Text>
        <Text $textAlign={"justify"}>
          Aura does not use analytics tools or third-party tracking cookies. Basic cookies may be used to store preferences like theme or language, but not for tracking personal Spotify data.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Data Deletion
        </Text>
        <Text $textAlign={"justify"}>
          Aura does not store personal data, so deletion is generally unnecessary. If you have concerns, contact us at: spedrobreno.2012@hotmail.com.
          <br></br>
          <br></br>
          You can also revoke app access via: https://www.spotify.com/account/apps.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          Security
        </Text>
        <Text $textAlign={"justify"}>
          All authentication and data access are handled securely through Spotify’s official OAuth process.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"center"} $margin={"10px 0px 0px 0px"}>
        <Text $fontStyle={"italic"}>
          Last updated: July 30, 2025
        </Text>
      </Box>
    </Box>
  )
}

export default VersaoENG;