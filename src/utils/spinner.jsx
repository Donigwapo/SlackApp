/* eslint-disable react/prop-types */
// utils/spinner.js

import { ClipLoader } from 'react-spinners';

const Spinner = ({ loading }) => {
  return (
    <div className="spinner-container">
      {loading && <ClipLoader color="#36d7b7" />}
    </div>
  );
};

export default Spinner;
