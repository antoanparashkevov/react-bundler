import ClientPage from './client.js';
import { createRoot } from "react-dom/client";

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

root.render(<ClientPage />);