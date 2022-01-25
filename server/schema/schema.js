import graphql, 
	{	GraphQLID,
		GraphQLObjectType, 
		GraphQLString, 
		GraphQLSchema, 
		GraphQLInt,
		GraphQLList
	}
from "graphql"

import Author from "../models/author.js"
import Book from "../models/book.js"
// // Dummy data (will delete later)
// const books = [
// 	{ name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
// 	{ name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
// 	{ name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
// 	{ name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
// 	{ name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
// 	{ name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
// ];

// const authors = [
// 	{ name: 'Patrick Rothfuss', age: 44, id: '1' },
// 	{ name: 'Brandon Sanderson', age: 42, id: '2' },
// 	{ name: 'Terry Pratchett', age: 66, id: '3' }
// ];

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// return authors.find(author => author.id === parent.authorId)
			}
		}
	})
})

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// return books.filter(book => book.authorId === parent.id)
			}
		}
	})
})

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return books.find(book => book.id === args.id)
			}
		},
		
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return authors.find(author => author.id === args.id)
			}
		},
		
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return books
			}
		},

		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return authors
			}
		}
	}
})

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLString },
				age: { type: GraphQLInt }
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age
				})

				return author.save()
			}
		},

		addBook: {
			type: BookType,
			args: {
				name: { type: GraphQLString },
				genre: { type: GraphQLString },
				authorId: { type: GraphQLID}
			},
			resolve(parent, args) {
				let book = new Book({
					name: args.book,
					genre: args.genre,
					authorId: args.authorId
				})

				return book.save()
			}
		}
	}
})

export default new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})