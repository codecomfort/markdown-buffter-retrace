import "@babel/polyfill";
import * as Comlink from "comlinkjs";
import Dexie from "dexie";
import processor from "./markdownProcessor";

const db = new Dexie("mydb");
type TItem = {
  html: string;
  id: string;
  raw: string;
  updatedAt: number;
};
const itemsSchema = "id, raw, html, updatedAt";
db.version(1).stores({
  items: itemsSchema,
});
const itemsTable = db.table<TItem>("items");
const CURRENT = "$current";

// worker.js
export class MarkdownCompiler {
  public compile = (raw: string) => {
    const result = processor.processSync(raw).toString();
    // Save background
    setTimeout(async () => {
      console.time("worker:save");
      itemsTable.put({
        html: result,
        id: CURRENT,
        raw,
        updatedAt: Date.now(),
      });
      console.timeEnd("worker:save");
    });
    return result;
  };

  public getLastState = async (): Promise<TItem | undefined> => {
    try {
      const current = await itemsTable.get(CURRENT);
      return current;
    } catch (e) {
      const raw = "# Hello!\n";
      const initialItem = {
        html: processor.processSync(raw).toString(),
        id: CURRENT,
        raw,
        updatedAt: Date.now(),
      };
      await itemsTable.put(initialItem);
      return initialItem;
    }
  };
}

Comlink.expose(MarkdownCompiler, self);
