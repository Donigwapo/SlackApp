// BottomSheet.js

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./BottomSheet.css";
import { Button } from './Button';
import { InputFields } from './InputFields';

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

  const handleMouseDown = () => {
    // Toggle between different positions on each click
  
    if (position === "closed") {
      handleSnap("semi-fully-open");
    } else if (position === "semi-fully-open") {
      handleSnap("closed");
    }
  };

  const handleInputClick = (e) => {
    // Check if the clicked element is an input field
    if (e.target && e.target.displayName === 'InputFields') {
      e.preventDefault();
      e.stopPropagation();

    }
  };

  useEffect(() => {
    // Check if the external button triggered the "semi-fully-open" state
    if (triggerSemiFullyOpen > 0) {
      handleSnap("semi-fully-open");
    }
  }, [triggerSemiFullyOpen]);

  useEffect(() => {
    function handleMouse() {
      // No need for the handleMouseUp logic since you're using click events now
    }

    document.addEventListener("mouseup", handleMouse);

    return () => {
      document.removeEventListener("mouseup", handleMouse);
    };
  }, []);

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    // Add other styles as needed
  };

  return (
    <div
      className={`bottom-sheet ${position} uparrow`}
      onClick={handleMouseDown} // Change to onClick
    >
      <div>Signup to Connectwave
        <form onSubmit={""} style={formStyle}>
          <label>Email:</label>
          <InputFields type="email" name="email" onChange={handleInputClick} required inputStyle="input--default" />

          <label>Password:</label>
          <InputFields type="password" name="password" onChange={handleInputClick} required inputStyle="input--default" />

          <label>Confirm Password:</label>
          <InputFields
            type="password"
            name="password_confirmation"
            value={""}
            onChange={handleInputClick}
            required
            className="css-input"
            inputStyle="input--default"
          />

          <Button buttonStyle='btn--primary' buttonSize="btn--large" type="submit" onClick={() => handleSnap("closed")}>Register</Button>
        </form>
      </div>
    </div>
  );
};

export default BottomSheet;