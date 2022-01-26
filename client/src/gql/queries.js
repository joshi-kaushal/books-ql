import { gql } from "@apollo/client";

export const getBooksQuery = gql`
 {
  books{
    name
	id
    genre
  }
}
`

export const getAuthorsQuery = gql`
 {
  authors{
    name
	id
  }
}
`