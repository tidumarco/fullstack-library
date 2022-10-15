import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { createBookThunk } from "redux/services/book.service";
import { NewBook } from "types";
import { useEffect } from "react";
import { fetchAuthorsThunk } from "redux/services/author.service";

// ISBN: string;
//   title: string;
//   description: string;
//   publisher: string;
//   publishedDate: Date;
//   borrowerId: string;
//   borrowDate: Date;
//   authors: (string | Author)[];
//   returnDate: Date;
//   adminId: string;
//   category: string;
//   available: boolean;
//   createdAt: Date;
//   updatedAt: Date;

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
  authors: z.string(author).refine((val) => Array(val)).optional(),
  category: z.string(),
  returnDate: z.date().optional(),
  adminId: z.string().optional(),
});

const NewBookForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAuthorsThunk());
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
    console.log(data);
  });
  const errorsValues = Object.entries(errors);

  const { authors } = useSelector((state: RootState) => state);

  return (
    <form onSubmit={onSubmit}>
      {errorsValues.length && (
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
      )}
      <Grid>
        <Grid item>
          <label>ISBN</label>
          <input {...register("ISBN")} placeholder="(ex: 1234567-8)" />
        </Grid>
        <Grid item>
          <label>Title</label>
          <input {...register("title")} />
        </Grid>
        <Grid item>
          <label>Description</label>
          <input {...register("description")} />
        </Grid>
        <Grid item>
          <label>Available</label>
          <select {...register("available")}>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </Grid>
        <Grid item>
          <label>Publisher</label>
          <input {...register("publisher")} />
        </Grid>
        <Grid item>
          <label>Published Date</label>
          <input type="date" {...register("publishedDate")} />
        </Grid>
        <Grid item>
          <label>Authors</label>
          <select {...register("authors")}>
            {authors.allAuthors.map((author) => {
              return (
                <option key={author._id}>
                  {author.firstName} {author.lastName}
                </option>
              );
            })}
          </select>
        </Grid>
        <Grid item>
          <label>Category</label>
          <input {...register("category")} placeholder="(ex: drama)" />
        </Grid>
        <input type="submit" />
      </Grid>
    </form>
  );
};

export default NewBookForm;
