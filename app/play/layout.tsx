import "../globals.css";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main id="game">{children}</main>;
}
