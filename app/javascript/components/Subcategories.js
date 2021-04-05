import React from "react"
import PropTypes from "prop-types"

import Select from 'react-select'

class Subcategories extends React.Component {
    render () {
        return (
            <div className="wrapper">
                <div className="content">
                    <a className="button" href={this.props.edit_category}>Edytuj kategorię</a>
                    <a className="button" href={this.props.new_subcategory}>Nowa podkategoria</a>
                    <div className="subcategories">
                        {
                            this.props.subcategories.map((subcategory, id) => (
                                <a className="subcategory" key={id} href={window.location.href + "/" + subcategory.id + "/topic"}>{subcategory.name}</a>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Subcategories
