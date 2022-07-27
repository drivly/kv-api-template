import { Hono } from 'hono'
import apis from './apis.json'

const app = new Hono()

app.get('/', (c) => c.json({hello: 'world'}))
app.get('/api', (c) => c.env.KV_API.list().then(data => c.json(data)))
app.get('/api/page/:cursor', (c) => c.env.KV_API.list(c.req.param).then(data => c.json(data)))
app.get('/api/:id', (c) => c.env.KV_API.get(c.req.param('id')).then(data => c.json(data)))
app.get('/api/put/:key/:value', (c) => c.env.KV_API.put(c.req.param('key'), c.req.param('value')).then(data => c.json(data)))

export default app
