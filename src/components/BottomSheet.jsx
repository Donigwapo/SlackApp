/* eslint-disable no-unused-vars */
// BottomSheet.js
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import RegistrationForm from "./RegistrationForm";

const BottomSheet = ({ handle_modal, triggerSemiFullyOpen }) => {
  const [position, setPosition] = useState("closed");


  const handleSnap = (newPosition) => {
    if (newPosition !== "closed") {
      handle_modal(true);
    } else {
      handle_modal(false);
    }
    setPosition(newPosition);
  };

  const divClick = () => {

 if (position === "semi-fully-open") {
      handleSnap("closed");   
    }
  
  };


  useEffect(() => {
    // Check if the external button triggered the "semi-fully-open" state
    if (triggerSemiFullyOpen > 0) {
      handleSnap("semi-fully-open");
    }
  }, [triggerSemiFullyOpen]);



  return (
    <div
      className={`bottom-sheet ${position}`}
      onClick={divClick} // Change to onClick
    >
      <div>Signup to Connectwave
       <RegistrationForm />
      </div>
    </div>
  );
};

export default BottomSheet;