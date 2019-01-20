import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class WardrobeSearch extends Component {
    static propTypes = {
        // searchByName: PropTypes.func,
        // searchQuery: PropTypes.func,
    }

    // const query = event.target.value;

    searchWardrobe(query) {
        this.props.searchWardrobe(query.target.value);
    }

    componentDidMount() {
        this.setState({
            // term: this.target.value
            // query: this.props.searchByName
        })
    }

    render() {
        const {
            searchByName,
            searchQuery,
        } = this.props;
        return (
            <form className="c-form">
                <label htmlFor="search">Search wardrobe</label>
                <input
                    className="c-input"
                    id="search"
                    onKeyUp={this.searchWardrobe.bind(this)}
                    type="search"
                />
            </form>
        )
    }
}

export default WardrobeSearch;