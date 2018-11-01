import "@babel/polyfill";
import * as Comlink from "comlinkjs";
import Dexie from "dexie";
import processor from "./markdownProcessor";
import { formatMarkdown } from "./lib/formatMarkdown";
import { Item } from "./types";

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

const db = new Dexie("mydb");
const itemsSchema = "id, raw, html, updatedAt";
db.version(1).stores({
  items: itemsSchema,
});
const itemsTable = db.table<Item>("items");
const CURRENT = "$current";

// worker.js
export class MarkdownCompiler {
  public compile = (raw: string) => {
    const result = processor.processSync(raw).toString();
    // Save background
    setTimeout(async () => {
      console.time("worker:save");
      await itemsTable.put({
        html: result,
        id: CURRENT,
        raw,
        updatedAt: Date.now(),
      });
      console.timeEnd("worker:save");
    });
    return result;
  };

  public format = async (raw: string): Promise<string> => {
    return formatMarkdown(raw);
  };

  public getLastState = async (): Promise<Item> => {
    const current = await itemsTable.get(CURRENT);
    if (!current) {
      return await this.initItems();
    }

    return current;
  };

  private initItems = async (): Promise<Item> => {
    const raw = initialText;
    const initialItem = {
      html: processor.processSync(raw).toString(),
      id: CURRENT,
      raw,
      updatedAt: Date.now(),
    };
    await itemsTable.put(initialItem);
    return initialItem;
  };
}

Comlink.expose(MarkdownCompiler, self);
