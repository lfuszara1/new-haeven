import React from "react"
import PropTypes from "prop-types"

import { hot } from 'react-hot-loader/root';

class Categories extends React.Component {
  render () {
    return (
      <div className="wrapper">
        <div className="content">
          <a className="button" href={this.props.new_category}>Nowa kategoria</a>
          <div className="categories">
            {
              this.props.categories.map((category, id) => (
                  <a className="category" key={id} href={window.location.href + "/" + category.id + "/subcategory"}>{category.name}</a>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default hot(Categories);
