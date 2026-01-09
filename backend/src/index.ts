import { Hono } from 'hono'
import routes from './routes'

const app = new Hono()

app.route('/api', routes)

app.fire()  // Or app.listen(3000) for Node environment