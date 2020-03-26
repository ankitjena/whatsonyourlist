import { makeExecutableSchema } from 'apollo-server-express'
import {
  typeDefs as userTypeDefs,
  resolvers as userResolvers,
} from './user'
import { merge } from 'lodash'

const Query = `
    type Query {
      _empty: String
    }
  `

const resolvers = {}

export const graphqlSchema = makeExecutableSchema({
  typeDefs: [Query, userTypeDefs],
  resolvers: merge(resolvers, userResolvers),
})
