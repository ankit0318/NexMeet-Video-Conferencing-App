import StreamVideoProvider  from "@/provider/StreamVideoProvider";
import React, { Suspense } from "react";
import { Toaster } from "sonner";
import Loader from "@/components/ui/Loader";

function Rootlayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Toaster richColors position="top-center" />
      <StreamVideoProvider>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </StreamVideoProvider>
    </main>
  );
}

export default Rootlayout;
