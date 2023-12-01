import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Button } from '@button/Button';
//import './Navbar.css';



//----------------------------DOnni Rhey---------------------------------------------------------------------------
export const HomeNavBar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
   const isLoggedIn = localStorage.getItem('access-token') && localStorage.getItem('client') && localStorage.getItem('uid');

  const showButton = () => {
 
    if (window.innerWidth >= 768 && window.innerWidth <= 1100) {
      setButton(false);
    }else{
      setButton(true);
    }
  };


  useEffect(() => {
    showButton(); 
    return () => {
      window.removeEventListener('resize', showButton);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className='siteLogo'>
          
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/productOverview" className="nav-links" onClick={closeMobileMenu}>
     
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/features" className="nav-links" onClick={closeMobileMenu}>
            
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pricing" className="nav-links" onClick={closeMobileMenu}>
             
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/resources" className="nav-links" onClick={closeMobileMenu}>
            
              </Link>
            </li>
          </ul>
          {button && (
            <>
              <div className='buttons1Container'>
                {isLoggedIn ? (
                  <li className="buttons1">
                    {/* Example: Link to user profile */}
                    <Button to='/message-panel' buttonStyle='btn--outlineBlack' buttonSize='btn--medium2'>Profile</Button>
                  </li>
                ) : (
                  <>
                    <li className="buttons1">
                      <Button buttonStyle='btn--outlineBlack' buttonSize='btn--medium2'>Sign up</Button>
                    </li>
                    <li className="buttons1">
                      <Button to='/loginPage' buttonStyle='btn--outline'>Log in</Button>
                    </li>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
