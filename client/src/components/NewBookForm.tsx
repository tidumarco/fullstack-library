import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Grid, NativeSelect, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { createBookThunk } from "redux/services/book.service";
import { Author, NewBook } from "types";
import { useEffect } from "react";
import { fetchAuthorsThunk } from "redux/services/author.service";
import { getToken } from "redux/slices/authSlice";

const author = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const schema = z.object({
  ISBN: z.string(),
  title: z.string(),
  description: z.string(),
  available: z.string().refine((val) => Boolean(val)),
  publisher: z.string(),
  publishedDate: z.string(),
  borrowerId: z.string().optional(),
  borrowDate: z.date().optional(),
  authors: z.string(author),
  category: z.string(),
  returnDate: z.date().optional(),
  adminId: z.string().optional(),
});

const NewBookForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAuthorsThunk());
    dispatch(getToken());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewBook>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(createBookThunk(data));

    alert("Book created!");
    window.close();
  });
  const errorsValues = Object.entries(errors);

  const { authors } = useSelector((state: RootState) => state);

  return (
    <form onSubmit={onSubmit}>
      {errorsValues.length > 0 ? (
        errorsValues.length && (
          <fieldset>
            <legend>Uh oh! there are errors!</legend>
            <ul>
              {errorsValues.map(
                ([name, error]) =>
                  error && (
                    <li key={name}>
                      {name}: {error.message}
                    </li>
                  )
              )}
            </ul>
          </fieldset>
        )
      ) : (
        <div></div>
      )}
      <Grid
        sx={{ border: "2px solid black", width: 1 / 2, margin: 2, padding: 2 }}
        container
        direction="column"
      >
        <TextField
          label="ISBN"
          {...register("ISBN")}
          placeholder="(ex: 1234567-8)"
        />

        <TextField label="Title" {...register("title")} />

        <TextField label="Description" {...register("description")} />

        <NativeSelect {...register("available")}>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </NativeSelect>

        <TextField label="Publisher" {...register("publisher")} />

        <TextField type="date" {...register("publishedDate")} />

        <NativeSelect {...register("authors")}>
          {authors.allAuthors.map((author: Author) => {
            return (
              <option value={author._id} key={author._id}>
                {author.firstName} {author.lastName}
              </option>
            );
          })}
        </NativeSelect>

        <TextField
          label="Category"
          {...register("category")}
          placeholder="(ex: drama)"
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default NewBookForm;
