"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const VideoMeeting = () => {
  const params = useParams();
  const roomID = params.roomId;
  const { data: session, status } = useSession();
  const router = useRouter();
  const containerRef = useRef(null);
  const [zp, setZp] = useState(null);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.name && containerRef.current) {
      joinMeeting(containerRef.current);
    }
  }, [session, status]);

  useEffect(() => {
    return () => {
      if (zp) {
        zp.destroy();
      }
    };
  }, [zp]);

  const joinMeeting = async (element) => {
    const appID = Number(process.env.NEXT_PUBLIC_ZEGOAPP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

    if (!appID || !serverSecret) {
      throw new Error("Please provide both appID and serverSecret.");
    }

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      session?.user?.id || Date.now().toString(),
      session?.user?.name || "Guest"
    );

    const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
    setZp(zegoInstance);

    zegoInstance.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Join using this link",
          url: `${window.location.origin}/video-meeting/${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      onJoinRoom: () => {
        toast.success("You have successfully joined the meeting.");
        setIsInMeeting(true);
      },
      onLeaveRoom: () => {
        endMeeting();
      },
    });
  };

  const startRecording = () => {
    if (zp) {
      zp.startRecording();
      setIsRecording(true);
      toast.info("Recording started.");
    }
  };

  const stopRecording = () => {
    if (zp) {
      zp.stopRecording();
      setIsRecording(false);
      toast.info("Recording stopped.");
    }
  };

  const endMeeting = () => {
    if (zp) {
      zp.destroy();
    }
    toast.success("Meeting ended successfully.");
    setZp(null);
    setIsInMeeting(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white flex flex-col">
      
{/* Header Section */}
<header className="relative bg-red-600 text-white p-5 text-center rounded-b-xl shadow-md">
  <div className="flex items-center justify-center space-x-4">
    {/* Animated Video Logo */}
    <div className="w-12 h-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="animate-pulse w-full h-full text-white"
        fill="currentColor"
      >
        <path d="M16 8h32a8 8 0 018 8v32a8 8 0 01-8 8H16a8 8 0 01-8-8V16a8 8 0 018-8zM30 20v24l20-12z" />
      </svg>
    </div>
    <h3 className="text-4xl font-extrabold tracking-wide">NASENIKonnect</h3>
  </div>
  <div className="mt-5 text-lg">
    <p className="mb-1">
      Participant Name: <span className="font-semibold">{session?.user?.name || "Guest"}</span>
    </p>
    <p className="text-sm">
      Room ID: <span className="italic">{roomID}</span>
    </p>
  </div>
</header>


      {/* Video Container */}
      <main className={`flex-grow flex flex-col ${isInMeeting ? "h-screen" : ""}`}>
        <div
          ref={containerRef}
          className="bg-navy-950 flex-grow rounded-md shadow-lg mt-4 mx-6"
          style={{ height: isInMeeting ? "100%" : "calc(100vh - 14rem)" }}
        ></div>
      </main>

      {/* Footer Buttons */}
      <footer className="p-6 bg-navy-900 rounded-t-3xl">
        <div className="flex justify-center space-x-4">
          {isInMeeting ? (
            <>
              <Button
                onClick={startRecording}
                className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
              >
                Start Recording
              </Button>
              <Button
                onClick={stopRecording}
                className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
              >
                Stop Recording
              </Button>
              <Button
                onClick={endMeeting}
                className="bg-red-700 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
              >
                End Meeting
              </Button>
            </>
          ) : (
            <Button
              onClick={endMeeting}
              className="bg-red-700 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md w-full"
            >
              Exit Meeting
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default VideoMeeting;
