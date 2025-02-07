export default function Background({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-violet-600 to-indigo-600">
      <div className="container mx-auto px-4 py-10">{children}</div>
    </div>
  );
}
