import "@babel/polyfill";
import * as Comlink from "comlinkjs";
import { MarkdownCompiler } from "./markdownWorker";

const editor = document.querySelector(".js-editor");
const preview = document.querySelector(".js-preview");
const worker = new Worker("./markdownWorker.ts");
const MdCompiler = Comlink.proxy(worker) as new () => MarkdownCompiler;

const main = async () => {
  const compiler = await new MdCompiler();
  let isComposing = false;

  const updatePreview = async (rawValue: string) => {
    if (isComposing) {
      return;
    }

    console.time("compile:worker");
    const result = await compiler.compile(rawValue);
    console.timeEnd("compile:worker");

    requestAnimationFrame(() => {
      console.time("innerHTML");
      preview!.innerHTML = result;
      console.timeEnd("innerHTML");
    });
  };

  if (editor && preview) {
    editor.addEventListener("compositionstart", async (event) => {
      isComposing = true;
    });
    editor.addEventListener("compositionend", async (event) => {
      const target = event.target as HTMLInputElement;
      if (!target) {
        return;
      }

      isComposing = false;
      updatePreview(target.value);
    });
    editor.addEventListener("input", async (event) => {
      const target = event.target as HTMLInputElement;
      if (!target) {
        return;
      }

      if (isComposing) {
        return;
      }

      updatePreview(target.value);
    });
  }

  // 前回終了時の状態をリストア
  const lastState = await compiler.getLastState();
  if (lastState) {
    (editor as HTMLInputElement).value = lastState.raw;
    (preview as HTMLTextAreaElement).innerHTML = lastState.html;
  }
};

main();
