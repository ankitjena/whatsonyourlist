import { User as userCollection } from '../models/user'
import mongoose from 'mongoose'
import { prepare } from '../utils/index'

export const typeDefs = `
    extend type Query {
        user(_id: String): User
        users: [User]
    }
    type User {
      _id: String,
      email: String,
      name: String,
      username: String
    }
  `

export const resolvers = {
  Query: {
    user: async (root, { _id }) => {
      return prepare(
        await userCollection.findOne(mongoose.mongo.ObjectID(_id)),
      )
    },

    users: async () => {
      return (await userCollection.find({})).map(prepare)
    },
  },
}
