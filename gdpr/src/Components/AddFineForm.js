import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, TextField, MenuItem, Button } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: "100ch",
  },
  button: {
    margin: theme.spacing(1),
    width: "40ch",
  },
}));
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
];
const AddFineForm = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    country: "",
    company: "",
    description: "",
    amount: "",
    currency: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const history = useHistory();

  const handleSubmit = async () => {
    const submitForm = await axios.post("/api/add-fines", { ...values });
    submitForm.status === 200 && history.push("/");
  };

  return (
    <form>
      {Object.keys(values).map((item) =>
        item !== "currency" ? (
          <TextField
            key={item}
            className={classes.margin}
            required
            id="filled-required"
            label={item}
            value={values[item]}
            onChange={handleChange(item)}
            variant="outlined"
          />
        ) : (
          <TextField
            key={item}
            className={classes.margin}
            select
            label="currency"
            value={values.currency}
            onChange={handleChange("currency")}
            variant="outlined"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )
      )}
      <Button
        variant="contained"
        size="small"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </form>
  );
};

export default AddFineForm;
