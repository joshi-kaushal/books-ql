import graphql, 
	{	GraphQLID,
		GraphQLObjectType, 
		GraphQLString, 
		GraphQLSchema, 
		GraphQLInt,
		GraphQLList
	} from "graphql"

// Dummy data (will delete later)
const books = [
	{ name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
	{ name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
	{ name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
	{ name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
	{ name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
	{ name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

const authors = [
	{ name: 'Patrick Rothfuss', age: 44, id: '1' },
	{ name: 'Brandon Sanderson', age: 42, id: '2' },
	{ name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return authors.find(author => author.id === parent.authorId)
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
				return books.filter(book => book.authorId === parent.id)
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
				return books.find(book => book.id === args.id)
			}
		},
		
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return authors.find(author => author.id === args.id)
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

export default new GraphQLSchema({
	query: RootQuery
})