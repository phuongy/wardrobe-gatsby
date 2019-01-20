import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class WardrobeItem extends Component {

  static propTypes = {
    category: PropTypes.string,
    colour: PropTypes.array,
    comments: PropTypes.string,
    condition: PropTypes.string,
    cost: PropTypes.number,
    description: PropTypes.string,
    isRemoved: PropTypes.bool,
    material: PropTypes.array,
    name: PropTypes.string,
    subcategory: PropTypes.array,
    timesWorn: PropTypes.number,
    year: PropTypes.number,
  }

  render() {

    const categoryIcon = (value) => {
      switch (value) {
        case 'dress':
        case 'skirt':
          return <span role="img" aria-label="teal flared dress">👗</span>;
        case 'outerwear':
          return <span role="img" aria-label="brown overcoat">🧥</span>;
        case 'top':
          return <span role="img" aria-label="pink blouse">👚</span>;
        case 'pants':
        case 'jeans':
          return <span role="img" aria-label="blue pair of jeans">👖</span>;
        default:
      }
    }

    const inlineList = (value) => {
      return value.join(' • ');
    }

    const itemCost = (value) => {
      if (value !== '')
        return '$' + parseFloat(value).toFixed(2);
      return 'unknown';
    }

    const costPerWear = (value, timesWorn) => {
      if ((value !== '') && (timesWorn !== ''))
        return '$' + (value / timesWorn).toFixed(2);
      return 'unknown';
    }

    const {
      category,
      colour,
      comments,
      condition,
      cost,
      description,
      isRemoved,
      material,
      name,
      subcategory,
      timesWorn,
      year
    } = this.props;

    return (
      <div className={classNames({
        'c-list-item': true,
        'c-list-item--removed': isRemoved,
      })}>
        <h3 className="item-name">{categoryIcon(category)} {name}</h3>
        <p className="item-category">
          <strong>{category}</strong>
          {subcategory != null &&
            <span className="inline-list">{inlineList(subcategory)}</span>
          }
        </p>
        <span className="item-year">{year}</span>
        <p>
          <strong>Colour</strong>
          <span className="inline-list">{inlineList(colour)}</span>
        </p>
        <p>
          <strong>Material</strong>
          <span className="inline-list">{inlineList(material)}</span>
        </p>
        <hr />
        <p>{description}</p>
        <p>{comments}</p>
        <p>
          <span role="img" aria-label="sack of money">💰</span> <strong>Purchased for:</strong> {itemCost(cost)}<br />
          <span role="img" aria-label="handful of paper money">💵</span> <strong>Average cost per wear:</strong> {costPerWear(cost, timesWorn)}<br />
          <span role="img" aria-label="sparkles">✨</span> <strong>Condition:</strong> {condition}
        </p>
      </div>
    )
  }
}

export default WardrobeItem;