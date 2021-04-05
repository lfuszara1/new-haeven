import React from "react"
import PropTypes from "prop-types"

class Categories extends React.Component {
  render () {
    console.log(this.props.new_category)
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

export default Categories
