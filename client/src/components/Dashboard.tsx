import { Container } from "@mui/material";
import AddAuthor from "./AddAuthor";
import AddBook from "./AddBook";
import EditBook from "./EditBook";

export default function Dashboard() {
	return(
		<Container>
			<AddAuthor />
			<AddBook />
			<EditBook />
		</Container>
	)
}