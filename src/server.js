import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import * as sapper from '@sapper/server'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		cookieParser(),
    (req, res, next) => {
      const token = req.cookies['user']
      const user = token ? JSON.parse(token) : {}

      return sapper.middleware({
        session: () => {
          return {
            user
          }
        }
      })(req, res, next)
    }
	)
	.listen(PORT, err => {
		if (err) console.log('error', err)
	})
