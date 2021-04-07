import React from "react"
import PropTypes from "prop-types"

import { hot } from 'react-hot-loader/root';

class Topic extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.active_user) {
            this.state = {
                topic_id: this.props.topic.id,
                user_id: this.props.active_user.id,
                content: ''
            };
        } else {
            this.state = {
                topic_id: this.props.topic.id,
                content: ''
            };
        }

        this.form = React.createRef()
        this.form_delete = React.createRef()

        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    handleDeleteSubmit(event) {
        event.preventDefault();

        let formData = new FormData(this.form_delete.current)

        fetch(window.location.href + "/comment/delete", {
            method: 'DELETE',
            headers: {
                'X-CSRF-Token': this.props.authenticity_token,
            },
            body: formData
        }).then(function(response) {
            window.location.reload();
        });
    }

    handleContentChange(event) {
        this.setState({
            ...this.state,
            content: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(this.form.current)

        fetch(this.props.form_path, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': this.props.authenticity_token,
            },
            body: formData
        }).then(function(response) {
            window.location.reload();
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
        while (i < 6) {
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
                    <a className="button" href={this.props.edit_topic}>Edytuj temat</a>
                    <div className="topicShow">
                        <div className="topic firstComment">
                            <div className="topicUser">
                                { this.props.user.email }
                            </div>
                            <div className="topicContent">
                                <h3>{ this.props.topic.name }</h3>
                                <p>{ this.props.topic.content }</p>
                            </div>
                        </div>
                        <div className="topics">
                            {
                                this.props.comments_with_users.map((comment, id) => (
                                    <div key={id} className="topic">
                                        <div className="topicUser">
                                            <p>{ comment[1].email }</p>
                                            <a href={window.location.href + "/comment/" + comment[0].id + "/edit"}>Edytuj</a>
                                            {
                                                this.props.can_destroy ?
                                                    <form onSubmit={this.handleDeleteSubmit} ref={this.form_delete}>
                                                        <input type="hidden" name="comment[id]" value={comment[0].id} />
                                                        <input type="submit" value="Usuń"/>
                                                    </form> :
                                                    undefined
                                            }
                                        </div>
                                        <div className="topicContent" key={id}>
                                            { comment[0].content }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            this.props.can_create ?
                                <form onSubmit={this.handleSubmit} ref={this.form} className="mainForm">
                                    <input type="hidden" name="comment[topic_id]" value={this.state.topic_id} />
                                    <input type="hidden" name="comment[user_id]" value={this.state.user_id} />

                                    <label htmlFor="content">Treść:</label>
                                    <textarea id="content" type="text" name="comment[content]" value={this.state.content} onChange={this.handleContentChange}/>

                                    <input type="submit" value="Wyślij"/>
                                </form> :
                                undefined
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(Topic);
