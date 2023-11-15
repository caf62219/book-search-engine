// Purpose: to export the GET_ME query and the searchGoogleBooks function
import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
        }
    }
    `;
export const searchGoogleBooks = (query) => {
        return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    };