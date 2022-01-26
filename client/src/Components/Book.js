
import { useQuery, gql } from "@apollo/client";

import { getBooksQuery } from "../gql/queries"

const RenderBooks = ({data}) => {
	if (data.loading) return <p>Loading...</p>

	return data.books.map((book, index) => {
		return <li key={book.id}>{book.name}</li>
	})
}
export const Book = () => {

	const { loading, error, data } = useQuery(getBooksQuery)

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<>
			<ul id="book-list">
				<RenderBooks data={data}/>
			</ul>
		</>
	);
}