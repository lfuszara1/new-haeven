import React from "react"
import PropTypes from "prop-types"
class Topics extends React.Component {
  render () {
    return (
      <React.Fragment>
        {
          this.props.topics.map((topic, id) => (
              <a key={id} href={window.location.href + "/" + topic.id}>>>>>>->>Link</a>
          ))
        }
      </React.Fragment>
    );
  }
}

export default Topics
