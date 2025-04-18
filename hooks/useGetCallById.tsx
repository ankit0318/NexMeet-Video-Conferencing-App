"use client";

/* -------------------------------------------------------------------------- */
// *this is client side code, so we can use hooks and other client side libraries*
/* -------------------------------------------------------------------------- */


import { useStreamVideoClient, Call } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string) => {
  const [call, setCall] = useState<Call>();
  const [isLoading, setIsLoading] = useState(true);
  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;


    //*function wrote bcus you cant use async code in useEffect directly so use async function inside it

    const fetchCall = async () => {
      try {
        const { calls } = await client?.queryCalls({
          filter_conditions: { id },
        });
        if (calls.length > 0) setCall(calls[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching call:", error);
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };
    // Set loading to false after fetching the call

    fetchCall();
  }, [client, id]);

  return { call, isLoading };
};
