import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono'

import esBuildServer from './esbuild/server/esbuild.config';
import esBuildClient from './esbuild/client/esbuild.config';
import esBuildStream from './esbuild/stream/esbuild.config';
import esBuildTailwind from './esbuild/tailwind/esbuild.config';
import { clientEntryPoints } from './esbuild/plugins/resolve-client-imports';

//helpers
import { resolveApp } from './esbuild/resolvePaths';

//react-specifics
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
// @ts-ignore
import * as ReactServerDomWebpack from 'react-server-dom-webpack/server.browser'

const app = new Hono();

app.get("/", (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Navigation</title>
        </head>
        <body style='background-color: black;'>
          <header style="width: 100vw; height: 90px">
            <nav style="width: 100%;">
              <ul style="display: flex; justify-content: space-between; align-items: center;">
                <li style="background-color: gray; border-radius: 8px;">
                  <a href='/server' style="text-decoration: none; display: block; padding: 1rem; color: white; font-size: 1rem;">
                    Server
                  </a>
                </li>
                <li style="background-color: gray; border-radius: 8px;">
                  <a href='/client' style="text-decoration: none; display: block; padding: 1rem; color: white; font-size: 1rem;">
                    Client
                  </a>
                </li>
                <li style="background-color: gray; border-radius: 8px;">
                  <a href='/stream' style="text-decoration: none; display: block; padding: 1rem; color: white; font-size: 1rem;">
                    Stream
                  </a>
                </li>
                <li style="background-color: gray; border-radius: 8px;">
                  <a href='/hydrate' style="text-decoration: none; display: block; padding: 1rem; color: white; font-size: 1rem;">
                    Hydrate
                  </a>
                </li>
                <li style="background-color: gray; border-radius: 8px;">
                  <a href='/tailwind' style="text-decoration: none; display: block; padding: 1rem; color: white; font-size: 1rem;">
                    Tailwind
                  </a>
                </li>
              </ul>
            </nav>
          </header>
        </body>
    </html>
  `);
})

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
});

app.get("/hydrate", async (c) => {
  // @ts-ignore
  const HydratePage = await import('../build/hydrate.js');
  const Comp = createElement(HydratePage.default);

  const html = renderToString(Comp);
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>React Hydration</title>
        </head>
        <body style='background-color: black;'>
          <div id='root'>${html}</div>
          <script src="/build/_hydrate.js"></script>
        </body>
    </html>
  `);
})

app.get("/tailwind", async (c) => {
  // @ts-ignore
  const TailwindPage = await import('../build/tailwind.js');
  const Comp = createElement(TailwindPage.default);

  const html = renderToString(Comp);

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>React Server Component</title>
            <link rel='stylesheet' href='/build/style.css'>
        </head>
        <body style='background-color: black;'>
          ${html}
        </body>
    </html>
  `);
});

app.use('/build/*', serveStatic());

serve(app, async ({ port }) => {
  await esBuildStream([resolveApp("stream.tsx")]);
  await esBuildServer([resolveApp("server.tsx"), resolveApp("hydrate.tsx"), resolveApp("tailwind.tsx")]);
  await esBuildClient([resolveApp("_client.tsx"), resolveApp("_stream.tsx"), resolveApp("_hydrate.tsx"), ...clientEntryPoints]);
  await esBuildTailwind([resolveApp("style.css")]);

  console.log(`Server is running on port ${port}`)
});

