import "@babel/polyfill";
import "katex/dist/katex.min.css";
import "highlight.js/styles/default.css";
import { Proxy } from "./lib/workerProxy";

const querySelector = <T>(selectors: string): T => {
  const element = document.querySelector(selectors);
  if (!element) {
    throw new Error(`No ${selectors} found`);
  }

  // Type Assertion · TypeScript Deep Dive
  // https://basarat.gitbooks.io/typescript/docs/types/type-assertion.html
  const typed = (element as any) as T;
  if (!typed) {
    // セレクター違いはもちろん、適切に型キャストされない場合も例外を飛ばす
    // →キャストはランタイムチェックであり、TS は静的チェックしか行えない
    // なので、例えば button のつもりで div 要素を取得していても気づくのが遅れるため
    throw new Error(`Invalid type`);
  }
  return typed;
};
const editor = querySelector<HTMLInputElement>(".js-editor");
const preview = querySelector<HTMLElement>(".js-preview");
const previewContainer = querySelector<HTMLElement>(".js-preview-container");
const toggle = querySelector<HTMLElement>(".js-preview-toggle");
const wordcount = querySelector<HTMLElement>(".js-wordcount");

const main = async () => {
  const compiler = await new Proxy();
  let isComposing = false;

  const updatePreview = async (rawValue: string) => {
    if (rawValue) {
      const countable = rawValue.replace(/\r?\n/g, "");
      if (countable) {
        // wordcount.textContent = Array.from(rawValue).length.toString();
        wordcount.textContent = countable.length.toString();
      }
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

  if (editor && preview && previewContainer && toggle && wordcount) {
    // ToggleButton
    const SHOW_PREVIEW_KEY = "show-preview";
    const val = window.localStorage.getItem(SHOW_PREVIEW_KEY);
    // How can I convert a string to boolean in JavaScript? - Stack Overflow
    // https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
    let showPreview = val ? val.toLocaleLowerCase() === "true" : true;

    const updatePreviewContainer = (show?: boolean) => {
      previewContainer.style.display = show ? "block" : "none";
      localStorage.setItem(SHOW_PREVIEW_KEY, String(show));
    };

    // 初回処理
    updatePreviewContainer(showPreview);
    // トグルボタン
    toggle.addEventListener("click", () => {
      showPreview = !showPreview;
      updatePreviewContainer(showPreview);
    });
    window.addEventListener("keydown", async (event) => {
      // keybind to toggle preview
      if (event.ctrlKey && event.key.toLocaleLowerCase() === "1") {
        // supress switching tab on chrome
        event.preventDefault();

        showPreview = !showPreview;
        updatePreviewContainer(showPreview);
      }
      // keybind to format
      if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLocaleLowerCase() === "f"
      ) {
        event.preventDefault();

        const formatted = await compiler.format(editor.value);
        editor.value = formatted;
        updatePreview(formatted);
      }
    });
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

      // Skip IME
      if (isComposing) {
        return;
      }

      updatePreview(target.value);
    });
  }

  // 前回終了時の状態をリストア
  const lastState = await compiler.getLastState();
  editor.value = lastState.raw;
  preview.innerHTML = lastState.html;
  editor.focus();
};

main();
