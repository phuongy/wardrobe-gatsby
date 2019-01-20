import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WardrobeSearch extends Component {
  static propTypes = {
    searchQuery: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: this.props.searchQuery || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchQuery !== this.props.searchQuery) {
      this.setState({ searchQuery: nextProps.searchQuery || '' });
    }
  }

  searchWardrobe = (event) => {
    const query = event.target.value;
    this.props.searchWardrobe(query.toLowerCase());
    this.setState({ searchQuery: query });
  }

  render() {
    return (
      <form className="c-form">
        <label htmlFor="search">Search wardrobe</label>
        <input
          className="c-input"
          id="search"
          onKeyUp={this.searchWardrobe}
          onChange={this.searchWardrobe}
          type="search"
          value={this.state.searchQuery}
        />
      </form>
    )
  }
}

export default WardrobeSearch;