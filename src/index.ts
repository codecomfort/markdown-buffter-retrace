console.log("index.ts");
import processor from "./markdownProcessor";

const editor = document.querySelector(".js-editor");
const preview = document.querySelector(".js-preview");
console.log(editor);

if (editor && preview) {
  editor.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement;
    if (!target) {
      return;
    }

    const raw = target.value;
    const result = processor.processSync(raw).toString();
    preview.innerHTML = result;
  });
}
