import React from "react"
import PropTypes from "prop-types"

import { hot } from 'react-hot-loader/root';

class Topics extends React.Component {
    constructor(props) {
        super(props);

        this.form = React.createRef()

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleGoBack = this.handleGoBack.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData(this.form.current)

        fetch(window.location.href + "/delete", {
            method: 'DELETE',
            headers: {
                'X-CSRF-Token': this.props.authenticity_token,
            },
            body: formData
        }).then(function(response) {
            return response.json();
        });
    }

    handleGoBack() {
        const host = window.location.protocol + "//" + window.location.host;
        const paths = window.location.pathname.split('/');
        let urls = []
        paths.forEach((element) => {
            if (element !== "/") {
                urls.push(element)
            }
        })
        let url = [];
        let i = 0;
        while (i < 4) {
            url.push(urls[i]);
            i += 1
        }
        const fullUrl = host + url.join('/');
        window.history.pushState({}, '', fullUrl);
        window.location.reload();
    }

    render () {
        return (
            <div className="wrapper">
                <div className="content">
                    <a className="button" onClick={this.handleGoBack}>Wstecz</a>
                    {
                        this.props.can_update ?
                            <a className="button" href={this.props.edit_subcategory}>Edytuj podkategoriÄ™</a> :
                            undefined
                    }

                    {
                        this.props.can_create ?
                            <a className="button" href={this.props.new_topic}>Nowy temat</a> :
                            undefined
                    }

                    <div className="topics">
                        {
                            this.props.topics_with_users.map((topic, id) =>
                                <div key={id} className="topic">
                                    <div className="topicUser">
                                        { topic[1].email }
                                        {
                                            this.props.can_destroy ?
                                                <form onSubmit={this.handleSubmit} ref={this.form}>
                                                    <input type="hidden" name="topic[id]" value={topic[0].id} />
                                                    <input type="submit" value="UsuÅ„"/>
                                                </form> :
                                                undefined
                                        }
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
