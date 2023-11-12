const {Book, User} = require('../models');

const resolvers = {
    Query: {    
        books: async () => {
            return await Book.find({});
        },
        booksOne: async (parent, {bookId}) => {
            const params = bookId ? {bookId} : {};
            return await Book.find(params);
        },
        users: async () => {
            return await User.find({});
        },
        usersOne: async (parent, {username}) => {
            const params = username ? {username} : {};
            return await User.find(params);
        },
    },
    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!user){
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return {token, user};
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        saveBook: async (parent, args) => {
            const user = await User.findOneAndUpdate(
                {_id: args.username},
                {$addToSet: {savedBooks: args}},
                {new: true, runValidators: true}
            );
            return user;
        },
        removeBook: async (parent, args) => {
            const user = await User.findOneAndUpdate(
                {_id: args.username},
                {$pull: {savedBooks: {bookId: args.bookId}}},
                {new: true}
            );
            return user;
        },
    }
};  

module.exports = resolvers;
