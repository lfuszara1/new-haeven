import React from "react"
import PropTypes from "prop-types"

import { hot } from 'react-hot-loader/root';

class FormComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topic_id: this.props.parent_id,
      user_id: this.props.user.id,
      content: this.props.comment.content
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
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': this.props.authenticity_token,
      },
      body: formData
    }).then(function(response) {
      return response.json();
    });

    window.history.back();
  }

  render () {
    return (
        <React.Fragment>
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

export default hot(FormComment);
