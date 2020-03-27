export const typeDefs = `
    type Query {
        user(_id: String): User
        users:[User]
    }
    type User {
        _id: String,
        email: String,
        name: String,
        username: String
    }
`
