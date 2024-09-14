import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    ENV: {
      API_URL: string;
    };
  }
}
import { Camera } from "lucide-react";
import { json } from "@remix-run/react";

function ScanDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute left-1/2 -translate-x-1/2 -top-3 p-1 bg-white rounded-full shadow-[0_-3px_3px_-3px_rgba(0,0,0,0.25)]">
          <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
            <Camera className="h-6 w-6 text-white" />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[calc(100dvh)] h-screen p-0"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        <div className="flex items-center w-full h-screen">
          <WebcamComponent />
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const WebcamComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
                ideal: "environment"
            },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            aspectRatio: { ideal: 16 / 9 }
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        setError(
          "Unable to access the webcam. Please check your device settings."
        );
        console.error(err);
      }
    };

    startWebcam();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = async () => {
    const video = videoRef.current;
    
    if (video) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataURL = canvas.toDataURL('image/png');

        const blob = await (await fetch(imageDataURL)).blob();

        const formData = new FormData();
        formData.append('image', blob, 'webcam-capture.png'); // Adjust filename as needed

        try {
          const apiResponse = await fetch(window.ENV.API_URL + '/api/v1/img', {
            method: 'POST',
            body: blob,
            headers: {
              'Content-Type': 'application/octet-stream',
            }
          });

          if (!apiResponse.ok) {
            throw new Error('Failed to upload image');
          }

          console.log('Image uploaded successfully');
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
        }
      }
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%" }}
        autoPlay
        muted
        playsInline
        onClick={captureImage}
      />
      {error && <p>{error}</p>}
      {imageSrc && (
        <div className="image-preview">
          <h3>Captured Image:</h3>
          <img src={imageSrc} alt="Captured" />
        </div>
      )}
    </>
  );
};

export default ScanDialog;
