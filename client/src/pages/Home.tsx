import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const books = 
  [
    {
      ISBN: "737627595-9",
      title: "Tyler Perry's Madea's Big Happy Family",
      description: "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
      authors: "Hodkiewicz, Jast and Ankunding",
      borrowerId: "21b5a1eb-a433-4bd1-8b2f-a82e50a20388",
      adminId: "88f53ec7-ae53-44aa-8b46-c26d46aaaf27",
    },
    {
      ISBN: "004039745-9",
      title: "Drevo",
      description:
        "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
      authors: "Kreiger-Schuppe",
      borrowerId: "bf311a52-af97-49b0-aadf-32ece8c95974",
      adminId: "11688e58-ce05-49b6-8e73-8469d2bf76be",
    },
    {
      ISBN: "350293368-5",
      title: "The Open Road",
      description:
        "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
      authors: "Durgan, Yundt and Weber",
      borrowerId: "6f29bc06-3007-497f-b5ec-1b159461764d",
      adminId: "28259c58-e4c7-4375-b162-fbdb50d9208b",
    },
    {
      ISBN: "539381440-2",
      title: "Gentle Breeze in the Village, A (Tennen kokekkô) ",
      description:
        "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
      authors: "Zieme Group",
      borrowerId: "54674983-5efe-49f6-95b5-ac6ff01d2010",
      adminId: "2dbb1d50-2f3e-43de-89fe-3f12beaa7139",
    },
    {
      ISBN: "067417186-1",
      title: "Night of the Living Dead 3D",
      description:
        "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      authors: "Pagac, Raynor and Toy",
      borrowerId: "5ea727d0-6c2f-4a14-a262-f554c9a285cc",
      adminId: "72639a68-5ea3-472a-9e4f-100b9562b573",
    },
    {
      ISBN: "074744292-4",
      title: "In America",
      description:
        "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
      authors: "Hettinger Inc",
      borrowerId: "9adf04f7-274e-4b77-9e74-8a4c9c3bd873",
      adminId: "94740443-574d-4903-9ea5-b2796f33a90f",
    },
    {
      ISBN: "550340803-9",
      title: "Oliver Twist",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
      authors: "Reichert-Grady",
      borrowerId: "0094a3db-63a6-4025-a767-ea8e8f00b30f",
      adminId: "3c6c026b-cc06-4e1d-9ad9-8254dca447af",
    },
    {
      ISBN: "314791072-5",
      title: "Magician, The (Ansiktet)",
      description:
        "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
      authors: "Rodriguez-Romaguera",
      borrowerId: "720542cc-c127-4b3f-9033-40a777c6258f",
      adminId: "15f93ae2-cfd6-42ca-9af2-f7df7456fd32",
    },
  ];


const Home = () => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ISBN</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Authors</TableCell>
              <TableCell>Borrower ID</TableCell>
              <TableCell>Admin ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book: any) => (
              <TableRow key={book.ISBN}>
                <TableCell align="right">{book.ISBN}</TableCell>
                <TableCell align="right">{book.title}</TableCell>
                <TableCell align="right">{book.description}</TableCell>
                <TableCell align="right">{book.authors}</TableCell>
                <TableCell align="right">{book.borrowerId}</TableCell>
                <TableCell align="right">{book.adminId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;
