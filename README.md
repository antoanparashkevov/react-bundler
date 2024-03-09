# React Server/Client Components, Hydration, Streaming, Tailwind ⚛️

> A simple React Server Components implementation that includes Client Components, the hydration process, streaming, tailwind bundling 🙌

## ⭐️ Goals

- 🌊 Show how React Server Components are streamed to the browser with a simple Node server.
- ⚙️ Demo a build process to bundle server components and handle client components with the `"use client"` directive.
- 📝 How TailwindCSS works under the hood.

## Getting started

First, install dependencies with "peer dependency" errors disabled:

```bash
npm i --legacy-peer-deps
```

_This is due to experimental version conflicts. React Server Components are still quite new!_

Then, start the Node development server:

```bash
npm run dev
```

This should trigger a build and start your server at http://localhost:3000.

## Project structure

This project is broken up into the `app/` and `esbuild/` directories. The most important entrypoints are listed below:

```sh
# 🥞 your full-stack application
app/ 
  server.jsx # react server component entrypoint.
  tailwind.jsx # react server component entrypoint.
  client.jsx # react client component entrypoint.
  hydrate.jsx # react client component entrypoint.
  Like.jsx # react client component entrypoint.
  stream.jsx # implement streaming mechanism using <Suspense>.
  _client.jsx # client script that requests and renders your `client.jsx`.
  _hydrate.jsx # client script that requests and hydrates your `hydrate.jsx`.
  _stream.jsx # client script that requests and streams your `client.jsx`.
esbuild/
  client/ - # esbuild entrypoint for bundling client components.
  server/ - # esbuild entrypoint for bundling server components.
  stream/ - # esbuild entrypoint for streaming.
  tailwind/ - # esbuild entrypoint using the esBuildStylePlugin with the combination of postcss.
  plugins/ - # custom esbuild plugins.
  resolvePaths.ts - # helper functions that resolve paths (src/app, /build).

# 💿 your backend that builds and renders the `app/`
index.ts
```

## 🙋‍♀️ What is _not_ included?

- **File-based routing conventions.** This repo includes a _single_ index route, with support for processing query params. If you need multiple routes, you can try [NextJS' new `app/` directory.](https://beta.nextjs.org/docs/routing/defining-routes)
- **Advance bundling for CSS-in-JS.** [A Tailwind script](https://tailwindcss.com/docs/installation/play-cdn) is included for playing with styles.
- **Advice on production deploys.** This is a _learning tool_ to show how React Server Components are used, _not_ the bedrock for your next side project! See [React's updated "Start a New React Project" guide](https://react.dev/learn/start-a-new-react-project) for advice on building production-ready apps.
