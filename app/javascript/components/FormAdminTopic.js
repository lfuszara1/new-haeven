import React from "react"
import PropTypes from "prop-types"

import { hot } from 'react-hot-loader/root';

class FormAdminTopic extends React.Component {
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
    this.handleApprovedChange = this.handleApprovedChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
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

  handleApprovedChange(event) {
    this.setState({
      ...this.state,
      approved: event.target.checked
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this.form.current)

    const that = this;
    fetch(this.props.form_path, {
      method: this.props.topic.id === null ? 'POST' : 'PATCH',
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
    while (i < 6) {
      url.push(urls[i]);
      i += 1
    }
    const fullUrl = host + url.join('/');
    window.history.pushState({}, '', fullUrl);
    window.location.reload();
  }

  render() {
    return (
        <div className="wrapper">
          <div className="content">
            <a className="button" onClick={this.handleGoBack}>Wstecz</a>
            <form onSubmit={this.handleSubmit} ref={this.form} className="mainForm">
              <input type="hidden" name="topic[subcategory_id]" value={this.state.subcategory_id} />
              <input type="hidden" name="topic[user_id]" value={this.state.user_id} />

              <label htmlFor="name">Nazwa:</label>
              <input type="text" id="name" name="topic[name]" value={this.state.name} onChange={this.handleNameChange}/>

              <label htmlFor="content">Treść:</label>
              <textarea id="content" type="text" name="topic[content]" value={this.state.content} onChange={this.handleContentChange}/>

              <label htmlFor="approved">Zatwierdzony:</label>
              <input id="approved" type="checkbox" name="topic[approved]" value={this.state.approved} onChange={this.handleApprovedChange}/>

              <input type="submit" value="Wyślij"/>
            </form>
          </div>
        </div>
    );
  }
}

export default hot(FormAdminTopic);
