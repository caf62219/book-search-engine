//whats required in this file
const {Book, User} = require('../models');
const { signToken, AuthenticationError} = require('../utils/auth');


const resolvers = {
    //query to get all information on a single user based on user id
    Query: {    
         me: async (parent, args, context) => {
            if (context.user) {
                data = await User.findOne({_id: context.user._id});
                return data;
            }
            throw  AuthenticationError;
        },
         
       
       
    },
    Mutation: {
        //mutation to login a user
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!user){
                throw  AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw){
                throw  AuthenticationError;
            }
            const token = signToken(user);
            return {token, user};
        },
        //mutation to add a user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        //mutation to save a book
        saveBook: async (parent, {newBook}, context) => {
           if(context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                {_id: context.user._id},
                {$push: {savedBooks: newBook}},
                {new: true}
            );
            return updatedUser;
           }
              throw  AuthenticationError;
        },
        //mutation to remove a book
        removeBook: async (parent, {bookId}, context) => {
           if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                {_id: context.user._id},
                {$pull: {savedBooks: {bookId}}},
                {new: true}
            );
            return updatedUser;
           }
                throw  AuthenticationError;
        },
    }
};  

module.exports = resolvers;
