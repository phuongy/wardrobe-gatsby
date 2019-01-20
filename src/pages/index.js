import React from 'react'
import { StaticQuery } from 'gatsby'
import { WardrobeCatalogue } from '../components/WardrobeCatalogue';
import './index.css';

// all the fields you want to pull in for the search
const query = graphql`
query { 
    allMarkdownRemark {
        edges {
            node {
                frontmatter {
                    name
                    slug
                    brand
                    category
                    subcategory
                    colour
                    sleeve
                    description
                    year
                    purchased
                    season
                    material
                    condition
                    cost
                    timesWorn
                    comments
                }
            }
        }
    }
}`;

// making the incoming data nicer to use
const transformItems = (data) => {
    const { edges } = data.allMarkdownRemark;
    const items = edges.map(edge => ({
        ...edge.node.frontmatter,
    }))

    return items;
}

const IndexPage = (props) => (
    <StaticQuery
        query={query}
        render={data => (
            <div>
                <WardrobeCatalogue items={transformItems(data)} />
            </div>
        )}
    />
);

export default IndexPage