import { User as userCollection } from '../models/user'
import mongoose from 'mongoose'
import { prepare } from '../utils/index'

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
