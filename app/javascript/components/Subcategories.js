import React from "react"
import PropTypes from "prop-types"

import { hot } from 'react-hot-loader/root';

class Subcategories extends React.Component {
    constructor(props) {
        super(props);

        this.form = React.createRef()

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleGoBack = this.handleGoBack.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData(this.form.current)

        fetch(window.location.href + "/delete", {
            method: 'DELETE',
            headers: {
                'X-CSRF-Token': this.props.authenticity_token,
            },
            body: formData
        }).then(function(response) {
            return response.json();
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

    render () {
        return (
            <div className="wrapper">
                <div className="content">
                    <a className="button" onClick={this.handleGoBack}>Wstecz</a>
                    {
                        this.props.can_update ?
                            <a className="button" href={this.props.edit_category}>Edytuj kategorię</a> :
                            undefined
                    }

                    {
                        this.props.can_create ?
                            <a className="button" href={this.props.new_subcategory}>Nowa podkategoria</a> :
                            undefined
                    }

                    <div className="subcategories">
                        {
                            this.props.subcategories_with_users.map((subcategory, id) => (
                                <div key={id} className="subcategory">
                                    <div className="subcategoryWrapper">
                                        <p>Właściciel: {subcategory[1].email} | </p> <a className="subcategoryLink" key={id} href={window.location.href + "/" + subcategory[0].id + "/topic"}>{subcategory[0].name}</a>
                                        <div className="subcategoryForm">
                                            {
                                                this.props.can_destroy ?
                                                    <form onSubmit={this.handleSubmit} ref={this.form}>
                                                        <input type="hidden" name="subcategory[id]" value={subcategory[0].id} />
                                                        <input type="submit" value="Usuń"/>
                                                    </form> :
                                                    undefined
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(Subcategories);
