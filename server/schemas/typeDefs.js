
const typeDefs = `
    type Book{
        bookId: ID!
        authors: [String]   
        title: String!
        description: String!
        image: String
        link: String
        
    }
    type User{
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }
    type Auth{
        token: ID!
        user: User
    }
    input bookInput{
        bookId: ID!
        authors: [String]   
        title: String!
        description: String!
        image: String       
        link: String
        
    }
    type Query{
        me: User
        
    }
    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(newBook:bookInput!): User
        removeBook(bookId: ID!): User
    }
    `;

module.exports = typeDefs;