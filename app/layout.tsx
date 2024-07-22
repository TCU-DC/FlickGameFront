import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WAGIRI!!",
  description:
    "WAGIRI!!」は、日本をテーマにしたオンラインタイピングWEBアプリです。スマホのフリック入力に対応しており、スピードを要する侍の緊張を表現。さらに、ランキング機能を搭載しているので、他のユーザーと競い合いながらスコアを伸ばす楽しさも味わえます。さあ、「WAGIRI!!」でタイピングの達人を目指しましょう！",
  openGraph: {
    title: "WAGIRI!!",
    description:
      "WAGIRI!!は、日本をテーマにしたオンラインタイピングWEBアプリです。スマホのフリック入力に対応しており、スピードを要する侍の緊張を表現。さらに、ランキング機能を搭載しているので、他のユーザーと競い合いながらスコアを伸ばす楽しさも味わえます。さあ、「WAGIRI!!」でタイピングの達人を目指しましょう！",
    url: "https://flickgame.pages.dev",
    type: "website",
    images: [
      {
        url: "/ogp.png",
        width: 600,
        height: 600,
        alt: "WAGIRI!!",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle",
    title: "WAGIRI!!",
    description:
      "WAGIRI!!は、日本をテーマにしたオンラインタイピングWEBアプリです。スマホのフリック入力に対応しており、スピードを要する侍の緊張を表現。さらに、ランキング機能を搭載しているので、他のユーザーと競い合いながらスコアを伸ばす楽しさも味わえます。さあ、「WAGIRI!!」でタイピングの達人を目指しましょう！",
    images: "/ogp.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
