import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";

import { Author } from "types";
import { createAuthorThunk } from "redux/services/author.service";

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
    alert("Author Created!");
	window.close()
  });
  const errorsValues = Object.entries(errors);
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
        <TextField label="First Name" {...register("firstName")} />

        <TextField label="Last Name" {...register("lastName")} />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default NewAuthorForm;
