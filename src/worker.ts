import "@babel/polyfill";
import * as Comlink from "comlinkjs";
import processor from "./lib/markdownProcessor";
import { formatMarkdown } from "./lib/formatMarkdown";
import { Item } from "./types";
import * as storage from "./lib/storage";

const initialText = `# Markdown Editor

- Desktop PWA Support
- Autosave
- Off Thread Markdown Compile

## Markdown

**emphasis** ~~strike~~ _italic_

> Quote

\`\`\`js
// code highlight
class Foo {
  constructor() {
    console.log("xxx");
  }
}
\`\`\`

## Math by KaTeX
$ y = x^3 + 2ax^2 + b $
`;

// worker.js
export class MarkdownCompiler {
  public compile = (raw: string) => {
    storage.saveCurrent(raw);
    const result = processor.processSync(raw).toString();
    return result;
  };

  public format = async (raw: string): Promise<string> => {
    return formatMarkdown(raw);
  };

  public getLastState = async (): Promise<Item> => {
    const current = await storage.loadCurrent();
    if (!current) {
      storage.saveCurrent(initialText);
      return await storage.loadCurrent();
    }

    return current;
  };
}

Comlink.expose(MarkdownCompiler, self);
