import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import { Button } from "@mui/material";
import OpenImage from "./open-icon.png";
import ColumnData from "./ColumnData";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: "20px",
};

function openWindow(id: string, name: string) {
  window.open("https://twitter.com/" + name + "/status/" + id, "undefined");
}

function ModalTweet(props: any) {
  const [hidden, setHidden] = useState(false);
  const sMRow = props.showModal.row;

  return (
    <>
      <Modal
        open={props.showModal.modal}
        onClose={() => props.closeModal()}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 1000 }}>
          <img
            src={"https://abs.twimg.com/images/themes/theme1/bg.png"}
            style={{ width: "100%", height: 130 }}
          />
          {sMRow.user_profile_image_url && (
            <>
              <img
                className="account-icon"
                src={sMRow.user_profile_image_url}
                style={{ borderRadius: "50%" }}
              />
            </>
          )}
          <br />
          {sMRow.user_name && (
            <>
              <div style={{ fontSize: 20, fontWeight: "bold" }}>
                {sMRow.user_name}
              </div>
            </>
          )}
          {sMRow.user_screen_name && <>@{sMRow.user_screen_name}</>}
          <div
            className="link-tag"
            onClick={() => openWindow(sMRow.t_id, sMRow.user_screen_name)}
          >
            open Tweet data
            <img className="link-image" src={OpenImage} />
          </div>
          <br />

          <ColumnData title="本文" data={sMRow.text} />

          <br />

          {hidden ? (
            <div onClick={() => setHidden(false)}>hidden</div>
          ) : (
            <div onClick={() => setHidden(true)}>open</div>
          )}

          {hidden && (
            <div style={{ overflow: "auto", height: "30vh" }}>
              <table style={{ height: "70vh" }}>
                <thead>
                  <tr>
                    <th>Tweet Data</th>
                    <th>value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(sMRow).map((key) => {
                    return (
                      <>
                        <tr key={key}>
                          <th>{key}</th>
                          <th>{sMRow[key]}</th>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default ModalTweet;
