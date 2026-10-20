import "./globals.css";

export const metadata = {
  title: "Nimesh & Dilhani — Sri Lankan Traditional Wedding Invitation",
  description: "Request the honour of your presence at the celebration of the marriage of Nimesh & Dilhani. Sunday, 27th December 2026 at Grand Monarch, Colombo.",
  keywords: ["wedding invitation", "Sri Lanka traditional wedding", "Poruwa ceremony", "Kandyan wedding", "Nimesh and Dilhani"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#c69446",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
