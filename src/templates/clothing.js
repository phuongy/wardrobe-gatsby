import React from 'react'
import { Link, graphql } from 'gatsby'

class ClothingTemplate extends React.Component {
  renderList = (name, list) => (
    <ul>
      {list.map((item, index) => (<li key={`${name}-${index}`}>{item}</li>))}
    </ul>
  )
  render() {
    const post = this.props.data.markdownRemark;
    const content = post.html;
    const { name, brand, category, subcategory, colour, condition, cost, description, material, purchased, season, sleeve, timesWorn, year } = post.frontmatter;

    return (
      <div>
        <h1>{name}</h1>
        <p>brand: {brand}</p>
        <p>category: {this.renderList('category', category)}</p>
        <p>subcategory: {this.renderList('subcategory', subcategory)}</p>
        <p>colour: {this.renderList('colour', colour)}</p>
        <p>condition: {condition}</p>
        <p>cost: {cost}</p>
        <p>description: {description}</p>
        <p>material: {this.renderList('material', material)}</p>
        <p>purchased: {purchased}</p>
        <p>season: {season}</p>
        <p>sleeve: {sleeve}</p>
        <p>timesWorn: {timesWorn}</p>
        <p>year: {year}</p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )
  }
}

export default ClothingTemplate

export const pageQuery = graphql`
  query {
          markdownRemark {
        id
        html
      frontmatter {
          name
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
      }
      html
    }
  }
`