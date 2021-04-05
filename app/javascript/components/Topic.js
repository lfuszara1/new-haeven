import React from "react"
import PropTypes from "prop-types"
class Topic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topic_id: this.props.topic.id,
            user_id: this.props.user.id,
            content: ''
        };

        this.form = React.createRef()

        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            return response.json();
        });
    }

    render () {
        return (
            <div className="wrapper">
                <div className="content">
                    <a className="button" href={this.props.edit_topic}>Edytuj temat</a>
                    <a className="button" href={this.props.new_comment}>Nowy Komentarz</a>
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
                                    <div className="topic">
                                        <div className="topicUser">
                                            <p>{ comment[1].email }</p>
                                            <a href={window.location.href + "/comment/" + comment[0].id + "/edit"}>Edytuj</a>
                                        </div>
                                        <div className="topicContent" key={id}>
                                            { comment[0].content }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <form onSubmit={this.handleSubmit} ref={this.form}>
                            <input type="hidden" name="comment[topic_id]" value={this.state.topic_id} />
                            <input type="hidden" name="comment[user_id]" value={this.state.user_id} />
                            <label>
                                Treść:
                                <textarea type="text" name="comment[content]" value={this.state.content} onChange={this.handleContentChange}/>
                            </label>
                            <input type="submit" value="Wyślij"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Topic
