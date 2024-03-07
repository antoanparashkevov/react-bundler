import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono'

import esBuildServer from './esbuild/server/esbuild.config';
import esBuildClient from './esbuild/client/esbuild.config';
import { resolveApp } from './esbuild/resolvePaths';

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

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
  // @ts-ignore
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

app.use('/build/*', serveStatic());

serve(app, async ({ port }) => {
  await esBuildServer([resolveApp("server.tsx")]);
  await esBuildClient([resolveApp("_client.tsx")]);

  console.log(`Server is running on port ${port}`)
});

