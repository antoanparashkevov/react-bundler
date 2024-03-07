import { build as esbuild } from "esbuild";
import { resolveBuild } from "../resolvePaths";

export default async function Config(entryPoints: string[]) {
    await esbuild({
        /*
            Inline any imported dependencies into the file itself. 
            This process is recursive. This will bundle the React Library. 
            The code will be completely self-contained and no longer depends on node_modules
        */
        bundle: true,
        entryPoints,
        outdir: resolveBuild(),
    })
}