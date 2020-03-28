import { resolvers as userResolvers } from './user'
import { merge } from 'lodash'

const resolvers = {}

export const schemaResolvers = merge(resolvers, userResolvers)
