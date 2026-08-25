interface LegalPageProps {
  title: string;
  children: React.ReactNode;
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">{title}</h1>
      <div className="text-foreground/80 [&_h2]:text-foreground [&_h3]:text-foreground space-y-8 [&_a]:wrap-break-word [&_a]:text-blue-600 [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:leading-relaxed [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:space-y-1">
        {children}
      </div>
    </main>
  );
}
