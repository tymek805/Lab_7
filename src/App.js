import { createServer } from 'node:http'
import { createYoga } from 'graphql-yoga'
import { schema } from './schema.js'

const yoga = createYoga({ schema })
const server = createServer(yoga)

// Start the server and you're done!
server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000')
})