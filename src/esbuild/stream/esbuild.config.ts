import { build as esbuild } from "esbuild";
import { resolveBuild } from "../resolvePaths";
import resolveClientImports from "../plugins/resolve-client-imports";

export default async function Config(entryPoints: string[]): Promise<Set<string>> {
    const clientEntryPoints = new Set<string>();

    await esbuild({
        bundle: true,
        format: "esm",
        entryPoints,
        outdir: resolveBuild(),
        packages: "external",// avoid bundling npm packages
        plugins: [
            resolveClientImports(clientEntryPoints)
        ]
    });

    return clientEntryPoints;
}