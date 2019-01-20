import React, { Component } from 'react';
import classnames from 'classnames';
import WardrobeItem from './WardrobeItem';
import WardrobeSearch from './WardrobeSearch';

export const categories = [
    { id: 'top', label: 'Top', icon: () => <span role="img" aria-label="pink blouse">👚</span> },
    { id: 'pants', label: 'Pants', icon: () => <span role="img" aria-label="blue pair of jeans">👖</span> },
    { id: 'dresses', label: 'Dresses', icon: () => <span role="img" aria-label="teal flared dress">👗</span> },
    { id: 'skirts', label: 'Skirts', icon: () => <span role="img" aria-label="teal flared dress">👗</span> },
    { id: 'jeans', label: 'Jeans', icon: () => <span role="img" aria-label="blue pair of jeans">👖</span> },
    { id: 'outerwear', label: 'Outerwear', icon: () => <span role="img" aria-label="brown overcoat">🧥</span> },
];

class WardrobeCatalogue extends Component {

    constructor() {
        super();

        this.state = {
            count: 0,
            sort: 'timesWorn',
            category: undefined,
            wardrobe: [],
            results: [],
            searchQuery: undefined,
        }
    }

    componentDidMount() {
        const { items } = this.props;

        this.setState({
            count: items.length,
            wardrobe: items,
            results: items,
        });
    }

    filterItems = () => {
        const { searchQuery, category, sort, wardrobe } = this.state;
        const results = wardrobe
            .filter((wardrobeItem) => wardrobeItem.name.toLowerCase().includes(searchQuery || ''))
            .filter(item => (category === undefined || category === item.category))
            .sort((a, b) => a[sort] > b[sort] ? -1 : 1)

        this.setState({ results });
    }

    searchWardrobe = (searchQuery) => {
        this.setState({ searchQuery }, () => {
            this.filterItems();
        });
    }

    filterCategory = (category) => () => {
        this.setState({ category }, () => {
            this.filterItems();
        });
    }

    sortBy = (sort) => () => {
        this.setState({ sort });
    }

    resetAllFilters = () => {
        this.setState({
            category: undefined,
            sort: undefined,
            searchQuery: undefined
        });
    }

    getWardrobeCost = () => {
        const { wardrobe } = this.state;
        const totalCost = wardrobe.reduce((acc, item) => acc + item.cost, 0.0);
        return totalCost.toFixed(2)
    }

    render() {
        const { searchQuery, results, category, sort } = this.state
        const totalWardrobeCost = this.getWardrobeCost();

        return (
            <div>
                <div className="c-header">
                    <button onClick={this.resetAllFilters}>reset all</button>
                    {categories.map(cat => (
                        <button
                            className={classnames({
                                active: category === cat.id
                            })}
                            key={cat.id}
                            onClick={this.filterCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                    <p>Order by</p>
                    <button
                        className={classnames({
                            active: sort === 'cost'
                        })}
                        onClick={this.sortBy('cost')}
                    >
                        cost
                    </button>
                    <button
                        className={classnames({
                            active: sort === 'timesWorn'
                        })}
                        onClick={this.sortBy('timesWorn')}
                    >
                        times worn
                    </button>
                    <p>${totalWardrobeCost}</p>
                </div>
                <WardrobeSearch searchQuery={searchQuery} searchWardrobe={this.searchWardrobe} />
                <div className="c-list">
                    {results.map(item => (
                        <WardrobeItem
                            category={item.category}
                            colour={item.colour}
                            comments={item.comments}
                            condition={item.condition}
                            cost={item.cost}
                            description={item.description}
                            isRemoved={item.removed}
                            key={item.slug}
                            material={item.material}
                            name={item.name}
                            subcategory={item.subcategory}
                            timesWorn={item.timesWorn}
                            year={item.year}
                        />
                    ))
                    }
                </div>
            </div>
        );
    }
}

export { WardrobeCatalogue };