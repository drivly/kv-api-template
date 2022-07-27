import { Hono } from 'hono'
import apis from './apis.json' assert {type: 'json'}

const app = new Hono()

app.get('/', (c) => c.json({hello: 'world'}))
app.get('/api', (c) => c.json(apis))
app.get('/api/:id', (c) => c.json(apis))
app.get('/api/set/:key', (c) => c.json(apis))

export default app
