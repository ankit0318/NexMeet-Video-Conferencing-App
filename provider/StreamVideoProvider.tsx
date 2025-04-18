"use client";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import tokenProvider from "@/actions/stream.actions";
import Loader from "@/components/ui/Loader";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamVideoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, isLoaded } = useUser();
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!API_KEY) {
      console.error("Stream API key is missing");
      return;
    }

    const initClient = async () => {
      try {
        setIsInitializing(true);
        const client = new StreamVideoClient({
          apiKey: API_KEY,
          user: {
            id: user?.id,
            name: user?.username || user?.id,
            image: user?.imageUrl,
          },
          tokenProvider,
          options: {
            minWatchTimeoutMS: 3000,
          },
        });

        setVideoClient(client);
      } catch (error) {
        console.error("Error initializing Stream video client:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    initClient();

    return () => {
      videoClient?.disconnectUser();
    };
  }, [user?.id, isLoaded]);

  if (!videoClient) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
