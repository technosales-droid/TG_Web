export function PageShell({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <main>
      <h1>{title}</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      {children}
    </main>
  );
}
