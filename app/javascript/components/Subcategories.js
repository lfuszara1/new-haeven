import React from "react"
import PropTypes from "prop-types"
class Subcategories extends React.Component {
  render () {
    return (
      <React.Fragment>
        {
          this.props.subcategories.map((subcategory, id) => (
              <a key={id} href={window.location.href + "/" + subcategory.id + "/topic"}>->>>>>>>>>>Link</a>
          ))
        }
      </React.Fragment>
    );
  }
}

export default Subcategories
