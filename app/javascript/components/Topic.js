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
            <React.Fragment>
                <a href={this.props.edit_topic}>Edytuj temat</a>
                <a href={this.props.new_comment}>Nowy Komentarz</a>
                { this.props.topic.name }
                { this.props.topic.content }
                {
                    this.props.comments.map((comment, id) => (
                        <div>
                            { comment.content }
                            <a key={id} href={window.location.href + "/edit"}>Edytuj</a>
                        </div>
                    ))
                }
                <form onSubmit={this.handleSubmit} ref={this.form}>
                    <input type="hidden" name="comment[topic_id]" value={this.state.topic_id} />
                    <input type="hidden" name="comment[user_id]" value={this.state.user_id} />
                    <label>
                        Treść:
                        <textarea type="text" name="comment[content]" value={this.state.content} onChange={this.handleContentChange}/>
                    </label>
                    <input type="submit" value="Wyślij"/>
                </form>
            </React.Fragment>
        );
    }
}

export default Topic
