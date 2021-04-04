import React from "react"
import PropTypes from "prop-types"

import Select from 'react-select'

class Subcategories extends React.Component {
  render () {
    return (
      <React.Fragment>
        {
          this.props.subcategories.map((subcategory, id) => (
              <a key={id} href={window.location.href + "/" + subcategory.id + "/topic"}>{subcategory.name}</a>
          ))
        }
      </React.Fragment>
    );
  }
}

export default Subcategories
