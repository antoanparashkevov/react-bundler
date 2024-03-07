import { build as esbuild } from 'esbuild';
import { resolveApp, resolveBuild } from '../resolvePaths';

export default async function Config(entryPoints: string[]) {
    await esbuild({
        entryPoints,
        outdir: resolveBuild(),
    });
}