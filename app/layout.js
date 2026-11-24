import { Lexend } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import WhatsAppChat from "@/components/WhatsAppChat";
import MotionProvider from "@/components/MotionProvider";

// Same font as the DheeneX One admin app (variable font: every weight 100-900)
const lexend = Lexend({ variable: "--font-lexend", subsets: ["latin"], display: "swap" });

// Light design on every device, also when the phone is in Dark mode (see globals.css)
export const viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export const metadata = {
  title: "DHEENEX TECHNOLOGIES | Leading Web & Mobile App Development Agency in India",
  description:
    "DHEENEX TECHNOLOGIES provides premium web development, mobile app solutions, and custom software engineering. Specializing in SaaS, E-commerce, and Fintech apps in Perambalur, Coimbatore, and across India.",

  keywords: [
    "DHEENEX TECHNOLOGIES",
    "Web Development India",
    "Mobile App Development Perambalur",
    "Custom Software Development",
    "E-commerce Website Design",
    "SaaS Product Development",
    "UI/UX Design Services",
    "Next.js Agency India",
    "React Native App Development",
    "Fintech App Solutions",
    "Admin Dashboard Development",
    "Cloud Infrastructure Services",
    "SEO Services for Businesses",
    "API Development and Integration",
    "Full Stack Development",
    "Frontend Development Services",
    "Backend Engineering",
    "Node.js Development",
    "Real-time Inventory Systems",
    "CRM Software Development",
    "Digital Transformation Agency",
    "Tech Support for Startups",
    "IT Consulting Perambalur",
    "App Development Tamil Nadu",
    "Web Design Coimbatore",
    "Progressive Web Apps (PWA)",
    "Responsive Web Design",
    "Hybrid Mobile Applications",
    "Scalable Web Applications",
    "Affordable IT Solutions India",
    "Software Startup Solutions",
    "Web Portals Development"
  ],

  // Favicon: app/icon.png and app/apple-icon.png (DheeneX Technology "D" icon); /dheenex-one has its own

  /* 🔹 Open Graph (Facebook, Instagram, LinkedIn) */
  openGraph: {
    title: "DHEENEX TECHNOLOGIES | High-Performance Web & Mobile Solutions",
    description:
      "Transform your business with DHEENEX TECHNOLOGIES's professional web and mobile development services. Specializing in scalable digital products.",
    url: "https://www.DHEENEX TECHNOLOGIES.com",
    siteName: "DHEENEX TECHNOLOGIES",
    images: [
      {
        url: "/dheenex-technology-og.jpg",
        width: 1200,
        height: 630,
        alt: "DHEENEX TECHNOLOGIES - Premium Web & App Development",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  /* 🔹 Twitter Support */
  twitter: {
    card: "summary_large_image",
    title: "DHEENEX TECHNOLOGIES | Expert Software Development Agency",
    description:
      "Building the next generation of web and mobile applications for global businesses.",
    images: ["/dheenex-technology-og.jpg"],
  },
  
  /* 🔹 Robots & Search Indexing */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={lexend.variable}>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 relative">
        {/* Hide the "New launch" bar before first paint when it was closed in this session (see Navbar) */}
        <Script id="announce-state" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem("dx-announce-off")==="1")document.documentElement.dataset.announce="off"}catch(e){}`}
        </Script>
        <MotionProvider>
          {children}
          <BottomNav />
          <WhatsAppChat />
        </MotionProvider>
      </body>
    </html>
  );
}
