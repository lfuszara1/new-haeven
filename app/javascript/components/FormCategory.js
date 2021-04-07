import React from "react"
import PropTypes from "prop-types"

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
        this.handleGoBack = this.handleGoBack.bind(this);
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

        const that = this;
        fetch(this.props.form_path, {
            method: this.props.category.id === null ? 'POST' : 'PATCH',
            headers: {
                'X-CSRF-Token': this.props.authenticity_token,
            },
            body: formData
        }).then(function(response) {
            that.handleGoBack();
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
        while (i < 2) {
            url.push(urls[i]);
            i += 1
        }
        const fullUrl = host + url.join('/');
        window.history.pushState({}, '', fullUrl);
        window.location.reload();
    }

    render() {
        if (this.props.category.id === null) {
            return (
                <div className="wrapper">
                    <div className="content">
                        <a className="button" onClick={this.handleGoBack}>Wstecz</a>
                        <form onSubmit={this.handleSubmit} ref={this.form}>
                            <label>
                                Nazwa:
                                <input type="text" name="category[name]" value={this.state.name} onChange={this.handleNameChange}/>
                            </label>
                            <input type="submit" value="Wyślij"/>
                        </form>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="wrapper">
                    <div className="content">
                        <form onSubmit={this.handleSubmit} ref={this.form}>
                            <label>
                                Nazwa:
                                <input type="text" name="category[name]" value={this.state.name} onChange={this.handleNameChange}/>
                            </label>
                            <input type="submit" value="Wyślij"/>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default hot(FormCategory);
