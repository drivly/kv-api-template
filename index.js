import { Router } from 'itty-router'
import { error, json, withContent, withParams } from 'itty-router-extras'
import apis from './apis.json'

const router = Router()

const recentInteractions = {}

const enrichRequest = req => {
  req.id = req.headers.get('CF-Request-ID') + '-' + req.cf.colo
  req.ip = req.headers.get('CF-Connecting-IP')
  recentInteractions[req.ip] = recentInteractions[req.ip] ? recentInteractions[req.ip] + 1 : 1
  req.recentInteractions = recentInteractions[req.ip]
  req.timestamp = new Date().toISOString()
  if(req.recentInteractions > 100) {
    return error(429, { error: 'Over Rate Limit - Try again soon' })
  }
}

router.all('*', enrichRequest)
router.get('/', (req, env) => env.KV_API.list(req.query).then(data => json({ data, req })))
router.get('/login', (req, env) => env.KV_API.list(req.query).then(data => json({ data, req })))
router.get('/logout', (req, env) => env.KV_API.list(req.query).then(data => json({ data, req })))
router.get('/api', (req, env) => env.KV_API.list(req.query).then(data => json({ data, req })))
router.get('/api/:key', withParams, (req, env) => env.KV_API.get(req.key).then(data => json({ data, req })))
router.get('/api/set/:key/:value', withParams, (req, env) => env.KV_API.set(req.key, req.value).then(data => json({ data, req })))
router.get('/api/delete/:key', withParams, (req, env) => env.KV_API.delete(req.key).then(data => json({ data, req })))

export default {
  fetch: router.handle
}

// app.get('/', (c) => c.json({hello: 'world'}))
// app.get('/api', (c) => c.env.KV_API.list().then(data => c.json(data)))
// app.get('/api/page/:cursor', (c) => c.env.KV_API.list(c.req.param).then(data => c.json(data)))
// app.get('/api/:id', (c) => c.env.KV_API.get(c.req.param('id')).then(data => c.json(data)))
// app.get('/api/put/:key/:value', (c) => c.env.KV_API.put(c.req.param('key'), c.req.param('value')).then(data => c.json(data)))


