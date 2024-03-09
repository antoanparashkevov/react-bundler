import { PluginBuild } from "esbuild";
import fs from 'fs';
import { resolveApp } from "../resolvePaths";

const resolveClientImports = (clientEntryPoints: Set<string>): { setup: (build: PluginBuild) => void; name: string } => {

    return {
        name: "resolve-client-imports",
        setup(build: PluginBuild) {
            // Filter all files that match the catchJsxFilesRegex.
            //This function will be executed on every file that matches the filter criteria.
            build.onResolve({ filter: catchJsxFilesRegex}, async ({ path: relativePath }) => {
                let path = resolveApp(relativePath); // /Users/tonkata1505/projects/react-bundler/src/app/stream.tsx
                const content = await fs.promises.readFile(path, "utf8");

                if( content.startsWith("'use client'")) {
                    clientEntryPoints.add(path);

                    return {
                        external: true,//don't bundle this file in the server
                        path: relativePath.replace(catchJsxFilesRegex, ".js")// instead of bundling, we want to import it
                    }
                }
            })
        }
    }
}

const catchJsxFilesRegex = /\.tsx$/

export default resolveClientImports;