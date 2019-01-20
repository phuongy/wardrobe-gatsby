import React, { Component } from 'react';
import WardrobeItem from './WardrobeItem';
import WardrobeSearch from './WardrobeSearch';

class WardrobeCatalogue extends Component {

    constructor() {
        super();

        this.state = {
            count: 0,
            sort: 'timesWorn',
            wardrobe: [],
            searchQuery: '',
        }
    }

    componentDidMount() {
        const { items } = this.props;

        this.setState({
            count: items.length,
            wardrobe: items,
            filteredData: items
        });
    }

    searchWardrobe(query) {
        console.log(query);
        let wardrobe = this.state.wardrobe.filter((wardrobeItem) => {
            return wardrobeItem.name.includes(query);
        });
        this.setState({
            wardrobe: wardrobe
        })

        console.log(wardrobe);
    }

    render() {

        const searchByName = (query) => {
            this.setState({
                searchQuery: query
            });
        }

        const filterCategory = (category) => {
            this.setState({
                category
            });
        }

        const sortBy = (term) => {
            this.setState({
                sort: term
            });
        }

        const totalWardrobeCost = (accumulator, currentWardrobeItem) => accumulator + currentWardrobeItem.cost;

        const resetAllFilters = () => {
            filterCategory();
            sortBy();
        }

        return (
            <div>
                <div className="c-header">
                    <button onClick={resetAllFilters}>
                        reset all
                    </button>
                    <button onClick={() => filterCategory('top')}>
                        tops
                    </button>
                    <button onClick={() => filterCategory('pants')}>
                        pants
                    </button>
                    <button onClick={() => filterCategory('dress')}>
                        dresses
                    </button>
                    <button onClick={() => filterCategory('skirt')}>
                        skirts
                    </button>
                    <button onClick={() => filterCategory('jeans')}>
                        jeans
                    </button>
                    <button onClick={() => filterCategory('outerwear')}>
                        outerwear
                    </button>
                    <p>Order by</p>
                    <button onClick={() => sortBy('cost')}>
                        cost
                    </button>
                    <button onClick={() => sortBy('timesWorn')}>
                        times worn
                    </button>

                    <p>${this.state.wardrobe.reduce(totalWardrobeCost, 0).toFixed(2)}</p>
                </div>
                <WardrobeSearch searchWardrobe={this.searchWardrobe.bind(this)} />
                <div className="c-list">
                    {this.state.wardrobe
                        .filter(item => (this.state.category === undefined || this.state.category === item.category))
                        .sort((a, b) => a[this.state.sort] > b[this.state.sort] ? -1 : 1)
                        .map(
                            (item, i) => {
                                return (
                                    <WardrobeItem
                                        category={item.category}
                                        colour={item.colour}
                                        comments={item.comments}
                                        condition={item.condition}
                                        cost={item.cost}
                                        description={item.description}
                                        isRemoved={item.removed}
                                        key={i}
                                        material={item.material}
                                        name={item.name}
                                        subcategory={item.subcategory}
                                        timesWorn={item.timesWorn}
                                        year={item.year}
                                    />
                                );
                            }
                        )
                    }
                </div>
            </div>
        );
    }
}

export { WardrobeCatalogue };