/** import.meta.url: file:///Users/tonkata1505/projects/react-bundler/src/index.ts */
/** new URL("app/", import.meta.url): file:///Users/tonkata1505/projects/react-bundler/src/app/ */
/** new URL("stream/", appBaseDir): file:///Users/tonkata1505/projects/react-bundler/src/app/stream */
/** new URL("stream/", appBaseDir).pathname: /Users/tonkata1505/projects/react-bundler/src/app/stream */

export function resolveApp(path: string = "") {
	const appBaseDir = new URL("../app/", import.meta.url);

	return new URL(path, appBaseDir).pathname;
}

export function resolveBuild(path: string = "") {
	const appBaseBuild = new URL("../build/", import.meta.url);

	return new URL(path, appBaseBuild).pathname;
}
