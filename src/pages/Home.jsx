
import { useState } from "react";
import { Button } from '@button/Button';
import BottomSheet from "@components/BottomSheet";


export default function Home(){

  const [externalButtonClicks, setExternalButtonClicks] = useState(0);

  // Function to trigger semi-fully-open state
  const triggerSemiFullyOpen = () => {
    setExternalButtonClicks(externalButtonClicks + 1);
  };


  return (
    <div className="hero" >
      <div className="description">
        <span>Revolutionize collaboration with ConnectWave intuitive platform</span>
        <p>ConnectWave brings teams together, enabling seamless communication and effective collaboration.</p>
          <div className="heroButtonsContainer">
            <li className="learnMore">
            <Button buttonStyle='btn--outline'>Learn more</Button>
            </li>
            <li className="signUp">
            <Button buttonStyle='btn--primary' onClick={triggerSemiFullyOpen}>Sign up</Button>
            <BottomSheet handle_modal={(value) => console.log(value)} triggerSemiFullyOpen={externalButtonClicks} />
            </li>
          </div>
          
      </div>
     
    </div>
  );
    }
  







