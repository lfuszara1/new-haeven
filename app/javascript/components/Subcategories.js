import React from "react"
import PropTypes from "prop-types"

import { hot } from 'react-hot-loader/root';

class Subcategories extends React.Component {
    render () {
        return (
            <div className="wrapper">
                <div className="content">
                    <a className="button" href={this.props.edit_category}>Edytuj kategorię</a>
                    <a className="button" href={this.props.new_subcategory}>Nowa podkategoria</a>
                    <div className="subcategories">
                        {
                            this.props.subcategories_with_users.map((subcategory, id) => (
                                <div className="subcategory">Właściciel: {subcategory[1].email} | <a className="subcategoryLink" key={id} href={window.location.href + "/" + subcategory[0].id + "/topic"}>{subcategory[0].name}</a></div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(Subcategories);
