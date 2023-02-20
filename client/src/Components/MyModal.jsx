import React from "react";

const MyModal = ({ children, visible, setVisible }) => {
  const rootClasses = ["myModal"];

  if (visible) {
    rootClasses.push("active");
  }

  return (
    <div
      className={rootClasses.join(" ")}
      onClick={() => {
        setVisible(false);
        document.body.style.overflow = "auto";
      }}
    >
      <div className="myModalContent" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;
