import React from "react"
import PropTypes from "prop-types"

import Select from 'react-select'

class Subcategories extends React.Component {
  render () {
    return (
      <React.Fragment>
        <a href={this.props.edit_category}>Edytuj kategorię</a>
        <a href={this.props.new_subcategory}>Nowa podkategoria</a>
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
