import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

export default function AddBook() {
  return (
    <Container>
      {/* onSubmit={handleSubmit} */}
      <Typography variant="h4">Add a new book</Typography>
      <form>
        {/* container alignItems="center" justify="center" direction="column" */}
        <Grid>
          <Grid item>
            <TextField
              id="ISBN-input"
              name="ISBN"
              label="ISBN"
              type="text"
              // value={formValues.name}
              // onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="title-input"
              name="title"
              label="Title"
              type="text"
              // value={formValues.age}
              // onChange={handleInputChange}
            />
          </Grid>

          <Grid item>
            <FormControl>
              <Select
                name="os"
                //   value={formValues.os}
                //   onChange={handleInputChange}
              >
                <MenuItem key="comedy" value="comedy">
                  Comedy
                </MenuItem>
                <MenuItem key="Horror" value="horror">
                  Horror
                </MenuItem>
                <MenuItem key="romance " value="romance">
                  Romance
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </Container>
  );
}
