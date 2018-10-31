import remark from "remark";
import hljs from "remark-highlight.js";
import html from "remark-html";
import katex from "remark-html-katex";
import math from "remark-math";

export default remark()
  .use(math)
  .use(katex)
  .use(hljs)
  .use(html);
