import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function FineDetails() {
  const classes = useStyles();
  const { id } = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchingTableData = async () => {
      const getGdprInfo = await axios.get(`/api/all/${id}`);
      setData(getGdprInfo.data);
    };
    fetchingTableData();
  }, [id]);

  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {data.company}
        </Typography>
        <Typography variant="h5" component="h2">
          {data.amount}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {data.country}
        </Typography>
        <Typography variant="body2" component="p">
          {data.fineDetails}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push("/")}>
          Back
        </Button>
      </CardActions>
    </Card>
  );
}

export default FineDetails;
