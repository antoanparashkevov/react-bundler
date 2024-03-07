import { build as esbuild } from "esbuild";
import esBuildStylePlugin from 'esbuild-style-plugin';

import { resolveBuild } from "../resolvePaths";

import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

export default async function Config(entryPoints: string[]) {
    await esbuild({
        bundle: true,
        entryPoints,
        outdir: resolveBuild(),
        plugins: [
            esBuildStylePlugin({
                postcss: {
                    plugins: [
                        tailwind(),
                        autoprefixer()
                    ]
                }
            }),
        ]
    })
}