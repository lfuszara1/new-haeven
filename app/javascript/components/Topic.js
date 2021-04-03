import React from "react"
import PropTypes from "prop-types"
class Topic extends React.Component {
  render () {
    return (
      <React.Fragment>
        { this.props.topic.name }
        { this.props.topic.content }
        {
          this.props.comments.map((comment, id) => (
              comment.content
          ))
        }
      </React.Fragment>
    );
  }
}

export default Topic
