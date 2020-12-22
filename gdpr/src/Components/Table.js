import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(114),
  },
  table: {
    minWidth: 650,
  },
  cursor: {
    cursor: "pointer",
  },
}));

function GDPRTable() {
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchingTableData = async () => {
      const getGdprInfo = await axios.get("/api/all");
      setData(getGdprInfo.data);
    };
    fetchingTableData();
  }, []);

  const handleDelete = async (id) => {
    const deleteRow = await axios.delete(`/api/delete/${id}`);
    setData(deleteRow.data);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="GDPR table">
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell align="center">Company Name</TableCell>
              <TableCell align="center">Fine Amount</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.country}>
                <TableCell component="th" scope="row">
                  {row.country}
                </TableCell>
                <TableCell align="center">{row.company}</TableCell>
                <TableCell
                  align="center"
                  className={classes.cursor}
                  id={row.id}
                  onClick={() => history.push(`/fine-details/${row.id}`)}
                >
                  {`${row.currency}${row.amount}`}
                </TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell scope="row">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        size="large"
        color="primary"
        className={classes.margin}
        onClick={() => history.push("/add-fine")}
      >
        Add Fine
      </Button>
    </>
  );
}

export default GDPRTable;
