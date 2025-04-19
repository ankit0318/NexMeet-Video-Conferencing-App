import StreamVideoProvider  from "@/provider/StreamVideoProvider";
import React, { Suspense } from "react";

import Loader from "@/components/ui/Loader";

function Rootlayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      
      <StreamVideoProvider>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </StreamVideoProvider>
    </main>
  );
}

export default Rootlayout;
