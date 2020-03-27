import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import {
  ApolloServer,
  makeExecutableSchema,
} from 'apollo-server-express'
import apiRouter from './routes/api'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import { schemaResolvers } from './resolvers'
import { typeDefs } from './schema'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

mongoose.connect(
  'mongodb://127.0.0.1:27017/whatsonyourlist',
  (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected to database')
    }
  },
)

const graphqlSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: schemaResolvers,
})

const server = new ApolloServer({ schema: graphqlSchema })
server.applyMiddleware({ app, path: '/graphql' })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', apiRouter)

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
)
