import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: [
    {
      rel: 'icon',
      url: '/favicon-light.svg',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      url: '/favicon-dark.svg',
      media: '(prefers-color-scheme: dark)',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Kino cinema</title>
        <meta name="description" content="Kino: tu cine al alcance de un clic. Reservá butacas y pedí snacks y bebidas desde la app." />
        <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&loading=async`}></script>
      </head>
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <AuthProvider>
          <div>
            <Navbar />
            <div>{children}</div>

            <Toaster position="top-center" toastOptions={{ style: { zIndex: 9999999999, background: "#000",  color: "#fff",  borderRadius: "12px",  padding: "16px",  fontWeight: "500", }, success: {  style: { background: "#000", color: "#fff", }, }, error: { style: { background: "#000", color: "#fff", }, }, }} />
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}