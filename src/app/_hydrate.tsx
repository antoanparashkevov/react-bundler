import HydratePage from "./hydrate";
import { hydrateRoot } from "react-dom/client";

const domNode = document.getElementById("root")!;

hydrateRoot(domNode, <HydratePage />);