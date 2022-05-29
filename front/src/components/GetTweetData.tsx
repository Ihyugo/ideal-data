import React, { useState, useEffect } from "react";
import axios from "axios";

// import { Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import ModalTweet from "./ModalTweet";

const columns = [
  { id: "t_id", label: "Tweet id", minWidth: 30 },
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
    maxHeight: "90vh",
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

  const calc = (datas: any) => {
    const tData = datas.map((data: any) => shapeData(data));
    return tData;
  };

  const clickModal = (row: any) => {
    setShowModal({ modal: true, row });
  };

  const closeModal = () => {
    setShowModal({ modal: false, row: null });
  };

  const getTweet = () => {
    const condition = ["あったらいいな サービス アプリ", 100];
    // const pathName = "http://127.0.0.1:5000/post_data";
    const pathName = "http://search-ideal-data.herokuapp.com/post_data";

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
        {/* <Button onClick={() => clickModal(tweetData[0])}>
          Open Child Modal
        </Button> */}

        {showModal.modal && (
          <>
            <ModalTweet showModal={showModal} closeModal={closeModal} />
          </>
        )}

        {tweetData !== [] && (
          <>
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table>
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
                    {tweetData.map((row, index) => {
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
            </Paper>
          </>
        )}
      </div>
    </>
  );
}
