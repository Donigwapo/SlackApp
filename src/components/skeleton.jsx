

//import ReactDOM from 'react-dom';

import ContentLoader from "react-content-loader";

export const MyLoader = () => (
  
 <ContentLoader
    width={1400} // Adjust the width as needed
    height={1000} // Adjust the height as needed
    backgroundColor={'lightgray'}
    foregroundColor={'#999'}
  >
    <rect x="0" y="0" rx="3" ry="3" width="100" height="5" />

    {/* Messages */}
    <rect x="120" y="0" rx="3" ry="3" width="500" height="10" />
    <rect x="120" y="30" rx="3" ry="3" width="500" height="10" />
    <rect x="120" y="60" rx="3" ry="3" width="500" height="10" />
    <rect x="120" y="90" rx="3" ry="3" width="500" height="10" />
    <rect x="120" y="120" rx="3" ry="3" width="500" height="10" />
    <rect x="120" y="150" rx="3" ry="3" width="500" height="10" />
    <rect x="120" y="180" rx="3" ry="3" width="500" height="10" />
    <rect x="120" y="210" rx="3" ry="3" width="500" height="10" />

    {/* Avatar */}
    <circle cx="50" cy="40" r="20" />
    <rect x="0" y="70" rx="3" ry="3" width="110" height="5" />
    <circle cx="50" cy="100" r="20" />
    <rect x="0" y="125" rx="3" ry="3" width="110" height="600" />


    {/* Input area */}
  </ContentLoader>
);


