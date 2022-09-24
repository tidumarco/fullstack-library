import { TextField } from "@mui/material";
import { SearchProps } from "types";

export default function SearcBar({ handleChange }: SearchProps) {
  return <TextField color="secondary" label="Search" onChange={handleChange} />;
}
