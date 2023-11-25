

//import ReactDOM from 'react-dom';

import ContentLoader from "react-content-loader";

export const MyLoader = () => (
  
 <ContentLoader
    width="100%" // Adjust the width as needed
    height="100%" // Adjust the height as needed
    backgroundColor={'lightgray'}
    foregroundColor={'#999'}
  >
   
    {/* Messages */}
    <rect x="0" y="0" rx="3" ry="3" width="100%" height="10%" />
    <rect x="0" y="30" rx="3" ry="3" width="100%" height="10%" />
    <rect x="0" y="60" rx="3" ry="3" width="100%" height="10%" />
    <rect x="0" y="90" rx="3" ry="3" width="100%" height="10%" />
    <rect x="0" y="120" rx="3" ry="3" width="100%" height="10%" />


    {/* Input area */}
  </ContentLoader>
);


