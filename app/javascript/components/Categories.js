import React from "react"
import PropTypes from "prop-types"

import { hot } from 'react-hot-loader/root';

class Categories extends React.Component {
    constructor(props) {
        super(props);

        this.form = React.createRef()

        this.handleSubmit = this.handleSubmit.bind(this);
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

    render () {
        return (
            <div className="wrapper">
                <div className="content">
                    <a className="button" href={this.props.new_category}>Nowa kategoria</a>
                    <div className="categories">
                        {
                            this.props.categories.map((category, id) => (
                                <div className="category" key={id}>
                                    <a href={window.location.href + "/" + category.id + "/subcategory"}>{category.name}</a>
                                    <div className="categoryForm">
                                        {
                                            this.props.can_destroy ?
                                                <form onSubmit={this.handleSubmit} ref={this.form}>
                                                    <input type="hidden" name="category[id]" value={category.id} />
                                                    <input type="submit" value="Usuń"/>
                                                </form> :
                                                undefined
                                        }

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

export default hot(Categories);
