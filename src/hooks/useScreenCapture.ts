// src/hooks/useScreenCapture.ts

import { useState } from "react";

// Opcional: para dar um nome de arquivo dinâmico
interface CaptureOptions {
  fileName?: string;
}

export const useScreenCapture = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCapture = async (options?: CaptureOptions) => {
    setIsCapturing(true);
    setError(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      setError(
        "A API de captura de tela não é suportada neste navegador ou o contexto não é seguro (HTTPS)."
      );
      setIsCapturing(false);
      return;
    }

    let stream: MediaStream | null = null;

    try {
      stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

      const video = document.createElement("video");
      video.style.display = "none";
      document.body.appendChild(video);
      video.srcObject = stream;
      video.play();

      await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => resolve();
      });

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      }

      const imageURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = options?.fileName
        ? `${options.fileName}.png`
        : "aura-capture.png";
      link.click();

      document.body.removeChild(video);
    } catch (err) {
      console.error("Erro detalhado ao capturar a tela:", err);
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setError(
          "Permissão para capturar a tela foi negada. Verifique também as permissões do seu sistema operacional (macOS/Windows)."
        );
      } else {
        setError(`Ocorreu um erro inesperado: ${(err as Error).message}`);
      }
    } finally {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setIsCapturing(false);
    }
  };

  // Função para limpar o erro (será usada pelo modal)
  const clearError = () => {
    setError(null);
  };

  return { isCapturing, error, startCapture, clearError };
};
