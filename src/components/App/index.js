import React from 'react';
import PropTypes from 'prop-types';

function App({ name }) {
  return (
    <h1>Hello, {name}!</h1>
  );
};

App.propTypes = {
  name: PropTypes.string,
};

export default App;
