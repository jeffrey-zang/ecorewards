import React, { useEffect, useRef } from "react";
import { Home, Users, Camera, Wallet, CircleUserRound } from "lucide-react";
import { Link, useLocation } from "@remix-run/react";
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
import Webcam from "react-webcam";
// import { ClientOnly } from "remix-utils/client-only";

function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <footer className="sticky bottom-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-end px-4 py-4">
        <Link to="/" className="flex flex-col items-center">
          <Home
            className={`h-6 w-6 ${
              currentPath === "/" ? "text-green-600" : "text-gray-500"
            }`}
          />
          <span className="text-xs mt-1 text-gray-500 sr-only">Home</span>
        </Link>
        <Link to="/social" className="flex flex-col items-center">
          <Users
            className={`h-6 w-6 ${
              currentPath === "/social" ? "text-green-600" : "text-gray-500"
            }`}
          />
          <span className="text-xs mt-1 text-gray-500 sr-only">Social</span>
        </Link>
        {/* place holder */}
        <span className="w-16" />
        <Link to="/history" className="flex flex-col items-center">
          <Wallet
            className={`h-6 w-6 ${
              currentPath === "/history" ? "text-green-600" : "text-gray-500"
            }`}
          />
          <span className="text-xs mt-1 text-gray-500 sr-only">History</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center">
          <CircleUserRound
            className={`h-6 w-6 ${
              currentPath === "/profile" ? "text-green-600" : "text-gray-500"
            }`}
          />
          <span className="text-xs mt-1 text-gray-500 sr-only">Profile</span>
        </Link>
        <ScanDialog />
      </div>
    </footer>
  );
}

export default Footer;

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
        {/* <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader> */}
        <div className="flex items-center w-full h-screen">
          <WebcamComponent />
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function WebcamComponent() {
  const webcamRef = useRef<any>(null);

  useEffect(() => {
    // console.log("what")
    const resizeWebcam = () => {
      if (webcamRef.current) {
        const container = webcamRef.current.parentElement;
        console.log(webcamRef.current);
        webcamRef.current.video.width = container.clientWidth;
        webcamRef.current.video.height = container.clientHeight;
      }
    };

    resizeWebcam();

    window.addEventListener("resize", resizeWebcam);

    return () => {
      window.removeEventListener("resize", resizeWebcam);
    };
  }, [webcamRef]);

  const capture = React.useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        className="w-full h-full"
        videoConstraints={{
          facingMode: {
            exact: "environment",
          },
        }}
      />
    </div>
  );
}
