
import { useState } from "react";
import { Button } from '@button/Button';
import BottomSheet from "@components/BottomSheet";


export default function Home(){

  const [externalButtonClicks, setExternalButtonClicks] = useState(0);
  const isLoggedIn = localStorage.getItem('access-token') && localStorage.getItem('client') && localStorage.getItem('uid');

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
          {isLoggedIn ? (
                  <li className="buttons1">
                    {/* Example: Link to user profile */}
                    <Button to='/message-panel' buttonStyle='btn--outlineBlack' buttonSize='btn--medium2'>Profile</Button>
                  </li>
                ) : (
                  <>
                    <li className="buttons1">
                      <Button onClick={triggerSemiFullyOpen} buttonStyle='btn--outlineBlack' buttonSize='btn--medium2'>Sign up</Button>
                    </li>
                    <li className="buttons1">
                      <Button to='/loginPage' buttonStyle='btn--outline'>Log in</Button>
                    </li>
                  </>
                )}
           
            <BottomSheet handle_modal={(value) => console.log(value)} triggerSemiFullyOpen={externalButtonClicks} />
       
          </div>
          
      </div>
     
    </div>
  );
    }
  







