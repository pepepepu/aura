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
        Welcome to Aura!
        <br></br>
        <br></br>
        These Terms of Service govern your access to and use of our website and
        the music visualization services offered by Aura. Please read these
        Terms carefully. By accessing or using our Service, you agree to be
        bound by these Terms and our Privacy Policy.
      </Text>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          1. Description of the Service
        </Text>
        <Text $textAlign={"justify"}>
          Aura is a service that connects to your Spotify account to create
          visual and interactive experiences based on your listening data, such
          as the music you are currently playing, your most-played tracks and
          artists, and the acoustic features of songs. The Service is provided
          for your personal, non-commercial use only.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          2. Eligibility
        </Text>
        <Text $textAlign={"justify"}>
          To use our Service, you must be of legal age to enter into a binding
          contract and be eligible to use the Spotify service in accordance with
          Spotify's terms. By using Aura, you represent and warrant that you
          meet these requirements.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          3. Spotify Integration and User Accounts
        </Text>
        <Text $textAlign={"justify"}>
          For Aura to function, you must authorize access to your Spotify
          account through Spotify's official authentication system (OAuth 2.0).
          You are responsible for maintaining the confidentiality of your
          Spotify credentials.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          4. Relationship with Spotify
        </Text>
        <Text $textAlign={"justify"}>
          Aura is a third-party application that uses the Spotify Developer
          Platform API to operate. Aura is not affiliated, associated,
          authorized, endorsed by, or in any way officially connected with
          Spotify. The Spotify brand, as well as all related names, logos,
          music, and data, are registered trademarks and property of Spotify AB.
          The use of the Spotify API is governed by the Spotify Developer Terms
          of Service.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          5. Intellectual Property
        </Text>
        <Box $width={"100%"} $alignItems={"flex-start"}>
          <Text $textAlign={"justify"} $fontWeight={"800"}>
            ✦ Our Content:
          </Text>
          <Text $textAlign={"justify"}>
            The name "Aura", the logo, the website, the generated visuals
            (excluding album art), the source code, and all design elements are
            the property of Pedro Paulo Oliveira Barros Souza and are protected
            by copyright and trademark laws. You may not copy, modify, or
            distribute our content without our explicit permission.
          </Text>
        </Box>
        <Box $width={"100%"} $alignItems={"flex-start"}>
          <Text $textAlign={"justify"} $fontWeight={"800"}>
            ✦ Spotify Content:
          </Text>
          <Text $textAlign={"justify"}>
            All Spotify content (such as song names, artists, album art, etc.)
            accessed through our Service remains the property of Spotify and/or
            its licensors.
          </Text>
        </Box>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          6. Acceptable Use and User Responsibilities
        </Text>
        <Text $textAlign={"justify"}>
          You agree not to use the Service for:
          <br></br>✦ Any illegal or unauthorized purpose.
          <br></br>✦ Attempting to reverse engineer, decompile, or otherwise try
          to discover the source code of the Service.
          <br></br>✦ Introducing viruses, malware, or any other malicious code.
          <br></br>✦ Attempting to bypass any security measures or rate limits
          imposed by Aura or Spotify.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          7. Privacy and User Data
        </Text>
        <Text $textAlign={"justify"}>
          We take your privacy seriously. Our Privacy Policy describes in detail
          what data we access from your Spotify account, how we use it, and why
          we do not store it. We strongly recommend that you read it.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          8. Disclaimer of Warranties and Limitation of Liability
        </Text>
        <Text $textAlign={"justify"}>
          The Service is provided "AS IS" and "AS AVAILABLE", without warranties
          of any kind, either express or implied.
          <br></br>
          <br></br>
          TO THE FULLEST EXTENT PERMITTED BY LAW, PEDRO PAULO OLIVEIRA BARROS
          SOUZA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, USE, OR OTHER
          INTANGIBLE LOSSES, RESULTING FROM (i) YOUR ACCESS TO OR USE OF OR
          INABILITY TO ACCESS OR USE THE SERVICE; (ii) ANY INTERRUPTION OR
          CESSATION OF TRANSMISSION TO OR FROM OUR SERVICE.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          9. Termination
        </Text>
        <Text $textAlign={"justify"}>
          You may stop using our Service at any time. The recommended way to
          unlink your account is to revoke Aura's access directly in your
          Spotify account settings by visiting
          https://www.spotify.com/account/apps.
          <br></br>
          <br></br>
          We reserve the right to suspend or terminate your access to the
          Service at any time, for any reason, especially if you violate these
          Terms.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          10. Changes to the Terms
        </Text>
        <Text $textAlign={"justify"}>
          We reserve the right to modify these Terms at any time. If we make
          changes, we will update the "Last Updated" date at the bottom of this
          page. Your continued use of the Service after the effective date of
          such changes will constitute your acceptance of the modified Terms.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          11. Governing Law
        </Text>
        <Text $textAlign={"justify"}>
          These Terms shall be governed and construed in accordance with the
          laws of Brazil, without regard to its conflict of law provisions.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          12. Contact
        </Text>
        <Text $textAlign={"justify"}>
          If you have any questions about these Terms of Service, please contact
          us by email: spedrobreno.2012@hotmail.com.
        </Text>
      </Box>
      <Box $width={"100%"} $alignItems={"center"} $margin={"10px 0px 0px 0px"}>
        <Text $fontStyle={"italic"}>Last Updated: July 30, 2025</Text>
      </Box>
    </Box>
  );
};

export default VersaoENG;
