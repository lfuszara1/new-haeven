import React from "react"
import PropTypes from "prop-types"

import Select from 'react-select'
import { hot } from 'react-hot-loader/root';

class FormSubcategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category_id: this.props.parent_id,
      user_id: null,
      name: ''
    };

    this.options = []
    this.props.users.map(user => {
      this.options.push({ value: user.id, label: user.email })
    })

    this.form = React.createRef()

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidMount() {
    if (this.props.subcategory.id !== null) {
      this.setState({
        ...this.state,
        name: this.props.subcategory.name,
        user_id: this.props.subcategory.user_id
      })
    }
  }

  handleNameChange(event) {
    this.setState({
      ...this.state,
      name: event.target.value
    });
  }

  handleUserIdChange(option) {
    this.setState({
      ...this.state,
      user_id: option.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this.form.current)

    const that = this;
    fetch(this.props.form_path, {
      method: this.props.subcategory.id === null ? 'POST' : 'PATCH',
      headers: {
        'X-CSRF-Token': this.props.authenticity_token,
      },
      body: formData
    }).then(function(_) {
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
    while (i < 4) {
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
            <form onSubmit={this.handleSubmit} ref={this.form}>
              <input type="hidden" name="subcategory[category_id]" value={this.state.category_id} />
              <Select value={this.options.filter(option => option.value === this.state.user_id)} name="subcategory[user_id]" options={this.options} onChange={this.handleUserIdChange} />
              <label>
                Nazwa:
                <input type="text" name="subcategory[name]" value={this.state.name} onChange={this.handleNameChange}/>
              </label>
              <input type="submit" value="Wyślij"/>
            </form>
          </div>
        </div>
    );
  }
}

export default hot(FormSubcategory);
