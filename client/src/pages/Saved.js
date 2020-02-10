import React, { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

function Saved() {
	const [books, setBooks] = useState([]);

	const getSavedBooks = async () => {
		try {
			const response = await API.getSavedBooks();
			setBooks(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleBookDelete = async id => {
		const response = await API.deleteBook(id);
		getSavedBooks(response);
	};

	useEffect(() => {
		getSavedBooks();
	}, []);

	return (
		<Container>
			<Row>
				<Col size="md-12">
					<Jumbotron>
						<h1 className="text-center">
							<strong>(React) Google Books Search</strong>
						</h1>
						<h2 className="text-center">
							Search for and Save Books of Interest.
						</h2>
					</Jumbotron>
				</Col>
			</Row>
			<Row>
				<Col size="md-12">
					<Card title="Saved Books" icon="download">
						{books.length ? (
							<List>
								{books.map(book => (
									<Book
										key={book._id}
										title={book.title}
										subtitle={book.subtitle}
										link={book.link}
										authors={book.authors.join(", ")}
										description={book.description}
										image={book.image}
										Button={() => (
											<button
												onClick={() => handleBookDelete(book._id)}
												className="btn btn-danger ml-2"
											>
												Delete
											</button>
										)}
									/>
								))}
							</List>
						) : (
							<h2 className="text-center">No Saved Books</h2>
						)}
					</Card>
				</Col>
			</Row>
			<Footer />
		</Container>
	);
}

export default Saved;
