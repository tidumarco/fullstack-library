import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Grid, Input, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";

import { Author } from "types";
import { createAuthorThunk } from "redux/services/author.service";
import { Label } from "@mui/icons-material";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const NewAuthorForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Author>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(createAuthorThunk(data));
    console.log(data);
  });
  const errorsValues = Object.entries(errors);

  const { authors } = useSelector((state: RootState) => state);
  console.log(authors);
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
          <label>First Name</label>
          <Input {...register("firstName")} />
        </Grid>
        <Grid item>
          <label>Last Name</label>
          <input {...register("lastName")} />
        </Grid>

        <input type="submit" />
      </Grid>
    </form>
  );
};

export default NewAuthorForm;
