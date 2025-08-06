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
          Aura is a service that connects to your <strong>Last.fm</strong>{" "}
          account to access your listening history and utilizes the public{" "}
          <strong>Spotify</strong> API to retrieve album art. With this data, we
          create visual and interactive experiences. The Service is provided for
          your personal, non-commercial use only.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          2. Eligibility
        </Text>
        <Text $textAlign={"justify"}>
          To use our Service, you must be of legal age to enter into a binding
          contract and be eligible to use the Last.fm service in accordance with
          Last.fm's own terms. By using Aura, you represent and warrant that you
          meet these requirements.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          3. API Integration and User Accounts
        </Text>
        <Text $textAlign={"justify"}>
          For Aura to function, you must authorize access to your{" "}
          <strong>Last.fm</strong> account through Last.fm's official
          authentication system. You are responsible for maintaining the
          confidentiality of your Last.fm credentials. Aura does not request or
          require access to or login with your Spotify account.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          4. Relationship with Last.fm and Spotify
        </Text>
        <Text $textAlign={"justify"}>
          Aura is a third-party application that uses the Last.fm and Spotify
          APIs to operate. Aura is not affiliated, associated, authorized, or
          endorsed by Last.fm or Spotify. The brands, names, logos, music, and
          related data are the property of their respective owners.
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
            by copyright laws.
          </Text>
        </Box>
        <Box $width={"100%"} $alignItems={"flex-start"}>
          <Text $textAlign={"justify"} $fontWeight={"800"}>
            ✦ Third-Party Content:
          </Text>
          <Text $textAlign={"justify"}>
            All content (such as song names, artists, album art, etc.) accessed
            through our Service remains the property of Last.fm, Spotify, and/or
            their licensors.
          </Text>
        </Box>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          6. Acceptable Use
        </Text>
        <Text $textAlign={"justify"}>
          You agree not to use the Service for:
          <br />✦ Any illegal or unauthorized purpose.
          <br />✦ Attempting to reverse engineer or otherwise try to discover
          the source code.
          <br />✦ Introducing viruses, malware, or any other malicious code.
          <br />✦ Attempting to bypass any security measures of Aura, Last.fm,
          or Spotify.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          7. Privacy and Data
        </Text>
        <Text $textAlign={"justify"}>
          We take your privacy seriously. Our <strong>Privacy Policy</strong>{" "}
          describes in detail what data we access from your Last.fm account, how
          we use it, and why we do not store it. We strongly recommend that you
          read it.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          8. Disclaimer of Warranties and Limitation of Liability
        </Text>
        <Text $textAlign={"justify"}>
          The Service is provided "AS IS", without warranties of any kind. TO
          THE FULLEST EXTENT PERMITTED BY LAW, PEDRO PAULO OLIVEIRA BARROS SOUZA
          SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES RESULTING FROM YOUR ACCESS TO OR
          USE OF THE SERVICE.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          9. Termination
        </Text>
        <Text $textAlign={"justify"}>
          You may stop using our Service at any time. The recommended way to
          unlink your account is to revoke Aura's access directly in your{" "}
          <strong>Last.fm</strong> account settings, as described in our Privacy
          Policy.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          10. Changes to the Terms
        </Text>
        <Text $textAlign={"justify"}>
          We reserve the right to modify these Terms at any time. If we make
          changes, we will update the "Last Updated" date at the bottom of this
          page.
        </Text>
      </Box>

      <Box $width={"100%"} $alignItems={"flex-start"} $gap={"5px"}>
        <Text $textAlign={"justify"} $fontSize={"1.5rem"}>
          11. Governing Law
        </Text>
        <Text $textAlign={"justify"}>
          These Terms shall be governed and construed in accordance with the
          laws of Brazil.
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
        <Text $fontStyle={"italic"}>Last Updated: August 6, 2025</Text>
      </Box>
    </Box>
  );
};

export default VersaoENG;
