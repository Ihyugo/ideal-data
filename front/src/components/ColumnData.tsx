import React from "react";

function ColumnData(props: any) {
  return (
    <>
      <div>{props.title}</div>
      <div>{props.data}</div>
    </>
  );
}

export default ColumnData;
