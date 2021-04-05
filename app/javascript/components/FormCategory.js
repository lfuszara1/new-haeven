import React from "react"
import PropTypes from "prop-types"

import history from "./history";
import { hot } from 'react-hot-loader/root';

class FormCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };

        this.form = React.createRef()

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.category.id !== null) {
            this.setState({
                ...this.state,
                name: this.props.category.name
            })
        }
    }

    handleNameChange(event) {
        this.setState({
            ...this.state,
            name: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(this.form.current)

        fetch(this.props.form_path, {
            method: this.props.category.id === null ? 'POST' : 'PATCH',
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
        if (this.props.category.id === null) {
            return (
                <React.Fragment>
                    <form onSubmit={this.handleSubmit} ref={this.form}>
                        <label>
                            Nazwa:
                            <input type="text" name="category[name]" value={this.state.name} onChange={this.handleNameChange}/>
                        </label>
                        <input type="submit" value="Wyślij"/>
                    </form>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <form onSubmit={this.handleSubmit} ref={this.form}>
                        <label>
                            Nazwa:
                            <input type="text" name="category[name]" value={this.state.name} onChange={this.handleNameChange}/>
                        </label>
                        <input type="submit" value="Wyślij"/>
                    </form>
                </React.Fragment>
            );
        }
    }
}

export default hot(FormCategory);
