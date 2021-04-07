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
    this.handleGoBack = this.handleGoBack.bind(this);
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

    const that = this;
    fetch(this.props.form_path, {
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': this.props.authenticity_token,
      },
      body: formData
    }).then(function(response) {
      that.handleGoBack()
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
    while (i < 7) {
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
            <form onSubmit={this.handleSubmit} ref={this.form} className="mainForm">
              <input type="hidden" name="comment[topic_id]" value={this.state.topic_id} />
              <input type="hidden" name="comment[user_id]" value={this.state.user_id} />

              <label htmlFor="content">Treść:</label>
              <textarea id="content" type="text" name="comment[content]" value={this.state.content} onChange={this.handleContentChange}/>

              <input type="submit" value="Wyślij"/>
            </form>
          </div>
        </div>
    );
  }
}

export default hot(FormComment);
