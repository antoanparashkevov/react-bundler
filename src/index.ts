import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

app.use('/build/*', serveStatic());

serve(app, async ({ port }) => {
  console.log(`Server is running on port ${port}`)
});

/** import.meta.url: file:///Users/tonkata1505/projects/react-bundler/src/index.ts */
/** new URL("app/", import.meta.url): file:///Users/tonkata1505/projects/react-bundler/src/app/ */
/** new URL("stream/", appBaseDir): file:///Users/tonkata1505/projects/react-bundler/src/app/stream */
/** new URL("stream/", appBaseDir).pathname: /Users/tonkata1505/projects/react-bundler/src/app/stream */

function resolveApp(path: string = "") {
  const appBaseDir = new URL("app/", import.meta.url);

  return new URL(path, appBaseDir).pathname;
}

function resolveBuild(path: string = "") {
  const appBaseBuild = new URL("build/", import.meta.url);

  return new URL(path, appBaseBuild).pathname;
}