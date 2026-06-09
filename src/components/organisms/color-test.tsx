export function ColorTest() {
  const colors = [
    {
      name: "Pure White",
      className: "bg-pure-white",
      hex: "#F9F9F8",
      border: true,
    },
    {
      name: "Deep Black",
      className: "bg-deep-black",
      hex: "#1D1D1B",
      border: false,
    },
    {
      name: "Pasta Gelb",
      className: "bg-pasta-gelb",
      hex: "#F2E8A4",
      border: false,
    },
    {
      name: "Butterweiss",
      className: "bg-butterweiss",
      hex: "#F5F0E0",
      border: true,
    },
    {
      name: "Eisblau",
      className: "bg-eisblau",
      hex: "#B7C6D9",
      border: false,
    },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Farbpalette Testbereich
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Hier sind alle hinterlegten Markenfarben als Tailwind-Klassen (z.B.{" "}
            <code>bg-pasta-gelb</code>).
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-5">
          {colors.map((color) => (
            <div
              key={color.name}
              className="flex flex-col overflow-hidden rounded-xl border shadow-sm"
            >
              <div
                className={`h-32 w-full ${color.className} ${
                  color.border ? "border-b" : ""
                }`}
              />
              <div className="bg-background p-4">
                <h3 className="text-foreground text-sm font-semibold">
                  {color.name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-muted-foreground text-xs uppercase">
                    {color.hex}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {color.className.replace("bg-", "")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
