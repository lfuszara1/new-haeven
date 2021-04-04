import React from "react"
import PropTypes from "prop-types"

import Select from 'react-select'

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
  }

  componentDidMount() {
    if (this.props.subcategory.id !== null) {
      this.setState({
        ...this.state,
        name: this.props.subcategory.name
      })
    }
  }

  handleNameChange(event) {
    this.setState({
      ...this.state,
      name: event.target.value
    });
  }

  handleUserIdChange(event) {
    this.setState({
      ...this.state,
      user_id: event.target.value
    });
  }

  handleSubmit(event) {
    const formData = new FormData(this.form.current)

    fetch(this.props.form_path, {
      method: this.props.subcategory.id === null ? 'POST' : 'PATCH',
      headers: {
        'X-CSRF-Token': this.props.authenticity_token,
      },
      body: formData
    }).then(function(response) {
      return response.json();
    });

    event.preventDefault();
  }

  render() {
    return (
        <React.Fragment>
          <form onSubmit={this.handleSubmit} ref={this.form}>
            <input type="hidden" name="subcategory[category_id]" value={this.state.category_id} />
            <Select value={this.options.filter(option => option.value === this.props.subcategory.id)} name="subcategory[user_id]" options={this.options} />
            <label>
              Nazwa:
              <input type="text" name="subcategory[name]" value={this.state.name} onChange={this.handleNameChange}/>
            </label>
            <input type="submit" value="Wyślij"/>
          </form>
        </React.Fragment>
    );
  }
}

export default FormSubcategory
