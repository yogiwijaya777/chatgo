import { isLoggedIn } from "@/lib/auth/isLoggedIn";
import { SocketContextProvider } from "@/lib/context/SocketContext";
import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Chat:Go",
  description: "Chat:Go is a chat app that allows you to chat with anyone, anywhere.",
  icons: [{ rel: "icon", url: "/Chat Go.svg" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const authUser = isLoggedIn();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <SocketContextProvider authUser={authUser}>{children}</SocketContextProvider>
      </body>
    </html>
  );
}
