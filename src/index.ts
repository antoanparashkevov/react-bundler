import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono'

import esBuildServer from './esbuild/server/esbuild.config';
import esBuildClient from './esbuild/client/esbuild.config';
import esBuildStream from './esbuild/stream/esbuild.config';

//helpers
import { resolveApp } from './esbuild/resolvePaths';

//react-specifics
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
// @ts-ignore
import * as ReactServerDomWebpack from 'react-server-dom-webpack/server.browser'

const app = new Hono()

app.get('/server', async (c) => {
  // @ts-ignore
  const ServerPage = await import('../build/server.js');
  const Comp = createElement(ServerPage.default);
  
  const html = renderToString(Comp);

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>React Server Component</title>
        </head>
        <body style='background-color: black;'>
          ${html}
        </body>
    </html>
  `);
});

app.get('/client', async (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>React Server Component</title>
        </head>
        <body style='background-color: black;'>
          <div id='root'></div>
          <script src="/build/_client.js"></script>
        </body>
    </html>
  `);
});

app.get("/api/stream", async (c) => {
  // @ts-ignore
  const StreamPage = await import('../build/stream.js');
  const Comp = createElement(StreamPage.default);

  const stream = ReactServerDomWebpack.renderToReadableStream(Comp);

  return new Response(stream);
});

app.get("/stream", async (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>React Server Component</title>
        </head>
        <body style='background-color: black;'>
          <div id='root'></div>
          <script src="/build/_stream.js"></script>
        </body>
    </html>
  `);
})

app.use('/build/*', serveStatic());

serve(app, async ({ port }) => {
  await esBuildServer([resolveApp("server.tsx")]);
  await esBuildClient([resolveApp("_client.tsx"), resolveApp("_stream.tsx")]);
  await esBuildStream([resolveApp("stream.tsx")]);

  console.log(`Server is running on port ${port}`)
});

