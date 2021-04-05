import React from "react"
import PropTypes from "prop-types"

import history from "./history";
import { hot } from 'react-hot-loader/root';

class FormTopic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subcategory_id: this.props.parent_id,
      user_id: this.props.user.id,
      name: '',
      content: ''
    };

    this.form = React.createRef()

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.topic.id !== null) {
      this.setState({
        ...this.state,
        name: this.props.topic.name,
        content: this.props.topic.content
      })
    }
  }

  handleNameChange(event) {
    this.setState({
      ...this.state,
      name: event.target.value
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
      method: this.props.topic.id === null ? 'POST' : 'PATCH',
      headers: {
        'X-CSRF-Token': this.props.authenticity_token,
      },
      body: formData
    }).then(function(response) {
      return response.json();
    });

    history.back();
  }

  render() {
    return (
        <React.Fragment>
          <form onSubmit={this.handleSubmit} ref={this.form}>
            <input type="hidden" name="topic[subcategory_id]" value={this.state.subcategory_id} />
            <input type="hidden" name="topic[user_id]" value={this.state.user_id} />
            <label>
              Nazwa:
              <input type="text" name="topic[name]" value={this.state.name} onChange={this.handleNameChange}/>
            </label>
            <label>
              Treść:
              <textarea type="text" name="topic[content]" value={this.state.content} onChange={this.handleContentChange}/>
            </label>
            <input type="submit" value="Wyślij"/>
          </form>
        </React.Fragment>
    );
  }
}

export default hot(FormTopic);
