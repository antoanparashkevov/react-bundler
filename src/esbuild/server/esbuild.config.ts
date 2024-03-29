import { build as esbuild } from 'esbuild';
import { resolveBuild } from '../resolvePaths';

export default async function Config(entryPoints: string[]) {
    await esbuild({
        entryPoints,
        outdir: resolveBuild(),
        packages: "external",// avoid bundling npm packages
    });
}