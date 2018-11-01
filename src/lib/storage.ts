
import Dexie from "dexie";
import { Item } from "../types";
import processor from "./markdownProcessor";

const db = new Dexie("mydb");
const itemsSchema = "id, raw, html, updatedAt";
db.version(1).stores({
  items: itemsSchema,
});
const itemsTable = db.table<Item>("items");
const CURRENT = "$current";

export const loadCurrent = (): Promise<Item> => {
  return itemsTable.get(CURRENT);
}

export const saveCurrent = async (raw: string): Promise<void> => {
  const item = {
    html: processor.processSync(raw).toString(),
    id: CURRENT,
    raw,
    updatedAt: Date.now(),
  };
  await itemsTable.put(item);
}
