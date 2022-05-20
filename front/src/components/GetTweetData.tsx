import React, { useState, useEffect } from "react";
// import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import ModalTweet from "./ModalTweet";

const columns = [
  { id: "t_id", label: "id", minWidth: 30 },
  { id: "user_name", label: "user name", minWidth: 100 },
  { id: "text", label: "text", minWidth: 400 },
  { id: "favorite_count", label: "favorite_count", minWidth: 30 },
  { id: "retweet_count", label: "retweet_count", minWidth: 30 },
  { id: "user_id", label: "user id", minWidth: 30 },
  { id: "user_screen_name", label: "user screen name", minWidth: 30 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 1000,
  },
});

function shapeData(data: any) {
  return {
    t_id: data[0],
    text: data[1],
    favorite_count: data[2],
    retweet_count: data[3],
    user_id: data[4],
    user_screen_name: data[5],
    user_name: data[6],
    user_description: data[7],
    user_friends_count: data[8],
    user_followers_count: data[9],
    user_following: data[10],
    user_profile_image_url: data[11],
    user_profile_background_image_url: data[12],
    user_url: data[13],
  };
}

export default function GetTweetData() {
  const defalutRow = {
    modal: false,
    row: null,
  };
  const [showModal, setShowModal] = useState(defalutRow);
  // const [showModal, setShowModal] = useState(false);
  const classes = useStyles();
  const [tweetData, setTweetData] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const calc = (datas: any) => {
    const tData = datas.map((data: any) => shapeData(data));
    return tData;
  };

  const clickModal = (row: any) => {
    setShowModal({ modal: true, row });
    // setShowModal(true);
  };

  const closeModal = () => {
    setShowModal({ modal: false, row: null });
  };

  const getTweet = () => {
    const condition = ["あったらいいな サービス アプリ", 100];
    const pathName = "http://127.0.0.1:5000/post_data";
    // const pathName = "http://search-ideal-data.herokuapp.com/post_data";

    axios({
      method: "POST",
      url: pathName,
      data: condition,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setTweetData(calc(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTweet();
  }, []);

  return (
    <>
      <div className="App">
        <ModalTweet showModal={showModal} closeModal={closeModal} />
        <Button variant="contained" onClick={() => getTweet()}>
          Search Tweet
        </Button>

        {tweetData !== [] && (
          <>
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tweetData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  onClick={() => clickModal(row)}
                                >
                                  {/* {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value} */}
                                  {value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={tweetData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </>
        )}
      </div>
    </>
  );
}
