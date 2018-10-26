import "@babel/polyfill";
import * as Comlink from "comlinkjs";
import { MarkdownCompiler } from "./markdownWorker";

const editor = document.querySelector(".js-editor");
const preview = document.querySelector(".js-preview");
const worker = new Worker("./markdownWorker.ts");
const MdCompiler = Comlink.proxy(worker) as new () => MarkdownCompiler;

const main = async () => {
  const compiler = await new MdCompiler();

  if (editor && preview) {
    editor.addEventListener("input", async (event) => {
      const target = event.target as HTMLInputElement;
      if (!target) {
        return;
      }

      const raw = target.value;
      const result = await compiler.compile(raw);

      requestAnimationFrame(() => {
        preview.innerHTML = result;
      });
    });
  }
};

main();
