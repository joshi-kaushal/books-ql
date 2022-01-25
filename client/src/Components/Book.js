
import { useQuery, gql } from "@apollo/client";

const getBooksQuery = gql`
 {
  books{
    name
	id
    genre
  }
}
`
const RenderBooks = ({data}) => {
	if (data.loading) return <p>Loading...</p>

	return data.books.map((book, index) => {
		return <li keys={book.id}>{book.name}</li>
	})
}
export const Book = () => {

	const { loading, error, data } = useQuery(getBooksQuery)

	if (data) {
		console.log("data: ", data);
	}

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