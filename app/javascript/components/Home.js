import React from "react"
import PropTypes from "prop-types"

import { hot } from 'react-hot-loader/root';

class Home extends React.Component {
  render () {
    return (
        <div className="wrapper">
          <div className="content">
            <a className="button" href="/category">Witaj na Forum!</a>
          </div>
        </div>
    );
  }
}

export default hot(Home);
