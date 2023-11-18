/* eslint-disable react/prop-types */
//import "./Button.css";
import {Link} from 'react-router-dom';

const STYLES =['btn--primary', 'btn--outline', 'btn--outlineBlack']

const SIZES = ['btn--medium', 'btn--large', 'btn--medium2'];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    to
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
     ? buttonStyle
     : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) 
    ? buttonSize 
    : SIZES [0]

    const handleClick = (e) => {
        if (onClick) {
          onClick(e);
        }
        // Continue with form submission if onClick doesn't preventDefault
        if (!e.defaultPrevented) {
          const form = e.target.closest('form');
          if (form) {
            form.submit();
          }
        }
      };

return(

    <Link to={to} className="btn-mobile">
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={handleClick}
        type={type}
        >
            {children}
        </button>
    </Link>
)
};