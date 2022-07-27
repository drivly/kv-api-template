import { Router } from 'router'
import APIs from './apis.json' assert {type: 'json'}

const router = Router()

router.get('/', (req, env, ctx) => {
  // now have access to the env (where CF bindings like durables, KV, etc now are)
})

export default {
  fetch: router.handle // yep, it's this easy.
}
