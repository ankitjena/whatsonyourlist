import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import apiRouter from './routes/api'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { prepare } from './utils/index'

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

var db = mongoose.connection

const Users = db.collection('users')

const typeDefs = [
  `
  type Query {
    user(_id: String): User
    users: [User]
  }

  type User {
    _id: String,
    email: String,
    name: String,
    username: String
  }
`,
]

const resolvers = {
  Query: {
    user: async (root, { _id }) => {
      return prepare(
        await Users.findOne(mongoose.mongo.ObjectID(_id)),
      )
    },

    users: async () => {
      return (await Users.find({}).toArray()).map(prepare)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app, path: '/graphql' })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', apiRouter)

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
)
