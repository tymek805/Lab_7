import { createSchema } from 'graphql-yoga'
import {getAllTodos, getAllUsers, getTodoById, getTodosByUserId, getUserById} from "./data";

export const schema = createSchema({
    typeDefs: /* GraphQL */ `
        type Query {
            todos: [ToDoItem!]
            todo(id: ID!): ToDoItem
            users: [User!]
            user(id: ID!): User
        },
        
        type ToDoItem {
            id: ID!
            title: String!
            completed: Boolean!
            user: User!
        },
        
        type User {
            id: ID!,
            name: String!,
            email: String!,
            login: String!,
            todos: [ToDoItem!]!
        },
    `,
    resolvers: {
        Query: {
            users: async () => getAllUsers(),
            user: async (_, { id }) => await getUserById(id),
            todos: async () => await getAllTodos(),
            todo: async (_, { id }) => await getTodoById(id),
        },
        User: {
            todos: async (parent) => {
                return await getTodosByUserId(parent.id)
            },
        },
        ToDoItem: {
            user: async (parent) => {
                return await getUserById(parent.user)
            },
        },
    }
})