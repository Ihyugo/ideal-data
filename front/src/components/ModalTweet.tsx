import React from "react";

const modalContent = {
  background: "white",
  padding: "10px",
  borderRadius: "3px",
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as React.CSSProperties;

function ModalTweet(props: any) {
  return (
    <>
      {props.showModal.modal && (
        <>
          <div id="overlay" style={overlay}>
            <div id="modalContent" style={modalContent}>
              {props.showModal.row.text}
              <button onClick={() => props.closeModal()}>Close</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ModalTweet;
