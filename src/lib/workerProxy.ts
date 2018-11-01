import * as Comlink from "comlinkjs";
import { MarkdownCompiler } from "../worker";

const worker = new Worker("../worker.ts");
export const Proxy = Comlink.proxy(worker) as new () => MarkdownCompiler;