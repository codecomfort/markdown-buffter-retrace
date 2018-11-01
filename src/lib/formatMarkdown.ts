import prettier from "prettier/standalone";
import markdownparser from "prettier/parser-markdown";

export const formatMarkdown = (md: string) => {
  const options = {
    parser: "markdown",
    plugins: [markdownparser],
  };
  return prettier.format(md, options);
};