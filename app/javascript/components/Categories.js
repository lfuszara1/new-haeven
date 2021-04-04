import React from "react"
import PropTypes from "prop-types"

class Categories extends React.Component {
  render () {
    return (
      <React.Fragment>
        {
          this.props.categories.map((category, id) => (
              <a key={id} href={window.location.href + "/" + category.id + "/subcategory"}>{category.name}</a>
          ))
        }
      </React.Fragment>
    );
  }
}

export default Categories
