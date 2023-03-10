import React from "react";

const MyInput = React.forwardRef((props, ref) => {
  return <input ref={ref} className="myInput" {...props} />;
});

export default MyInput;
