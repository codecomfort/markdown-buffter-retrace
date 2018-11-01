let prettier: any = undefined;
let markdownparser: any = undefined;

export const formatMarkdown = (md: string) => {
  const options = {
    parser: "markdown",
    plugins: [markdownparser],
  };
  return prettier.format(md, options);
};

// Dinamic import
console.time("load-prettier");
(async () => {
  const [p0, p1] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/parser-markdown"),
  ]);
  prettier = p0.default || p0;
  markdownparser = p1.default || p1;
  console.timeEnd("load-prettier");
})();
