import { createRoot } from "react-dom/client";
// @ts-ignore
import { createFromFetch } from "react-server-dom-webpack/client";

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

createFromFetch(fetch("/api/stream"))
    .then((comp: any) => root.render(comp));