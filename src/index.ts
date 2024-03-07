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
})
