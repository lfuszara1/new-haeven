import React from "react"
import PropTypes from "prop-types"
class Topics extends React.Component {
    render () {
        return (
            <React.Fragment>
                <div>
                    <a href={this.props.edit_subcategory}>Edytuj podkategorię</a>
                    <a href={this.props.new_topic}>Nowy temat</a>
                    {
                        this.props.topics.map((topic, id) =>
                            <div key={id}>
                                <div>
                                    <a href={window.location.href + "/" + topic.id}>{topic.name}</a>
                                </div>
                                <div>
                                    { (topic.content.length > 255) ? (topic.content.substring(0, 255) + "...") : topic.content }
                                </div>
                            </div>
                        )
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default Topics
