import ICONS from "@/public/icons";
import "./global.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "sonner";
import "@stream-io/video-react-sdk/dist/css/styles.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider  appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: ICONS.VIDEO_CAMERA_PNG
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#0E78F9",
            colorBackground: "#1C1F2E",
            colorInputBackground: "#252A41",
            colorInputText: "#fff",
        
          },
          
        }}>
        <body className="bg-dark-2">
          {children}
          <Toaster/>
        </body>
      </ClerkProvider>
    </html>
  );
}
