import { build as esbuild } from "esbuild";
import { parse } from 'es-module-lexer';

import { relative } from "path";
import { writeFile } from "fs/promises";

import { resolveBuild } from "../resolvePaths";

export default async function Config(entryPoints: string[], clientComponentMap: Record<string, { id: string; name: string; chunks: []; async: boolean}>) {
    const { outputFiles } = await esbuild({
        /*
            Inline any imported dependencies into the file itself. 
            This process is recursive. This will bundle the React Library. 
            The code will be completely self-contained and no longer depends on node_modules
        */
        format: "esm",
        bundle: true,
        entryPoints,
        outdir: resolveBuild(),
        splitting: true,
        // minify: true,
        write: false,
        // sourcemap: true, //for development
    });

    outputFiles.forEach(async (file) => {
        const [, exports] = parse(file.text);

        /**
        [{
            s: 562,
            e: 569,
            ls: 546,
            le: 558,
            n: 'default',
            ln: 'Like_default'
        }]
         */

        let newContent = file.text;

        if( exports.length > 0 ) {

            for( let exp of exports ) {
                const key = file.path + "_" + exp.n;
                clientComponentMap[key] = {
                    id: `/build/${relative(resolveBuild(), file.path)}`,/* /build/Like.js */
                    name: exp.n, //default
                    chunks: [], //webpack-specific
                    async: true, //import them asynchronously
                }

                //renderToReadableStream will see this instructions and will look at the clientComponentMap that we've passed.
                //E.g, it will see the id and the name. This indicates the path form which the component should be imported.
                newContent += `${exp.ln}.$$typeof = Symbol.for('react.client.reference');\n${exp.ln}.$$id = ${JSON.stringify(key)};`
            }
        }

        await writeFile(file.path, newContent)
    });
}