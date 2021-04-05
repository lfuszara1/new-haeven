import React from "react"
import PropTypes from "prop-types"

import { hot } from 'react-hot-loader/root';

class Topics extends React.Component {
    render () {
        return (
            <div className="wrapper">
                <div className="content">
                    <a className="button" href={this.props.edit_subcategory}>Edytuj podkategorię</a>
                    <a className="button" href={this.props.new_topic}>Nowy temat</a>
                    <div className="topics">
                        {
                            this.props.topics_with_users.map((topic, id) =>
                                <div key={id} className="topic">
                                    <div className="topicUser">
                                        { topic[1].email }
                                    </div>
                                    <div className="topicContent">
                                        <div>
                                            <a href={window.location.href + "/" + topic[0].id}>{topic[0].name}</a>
                                        </div>
                                        <div>
                                            { (topic[0].content.length > 255) ? (topic[0].content.substring(0, 255) + "...") : topic[0].content }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(Topics);
