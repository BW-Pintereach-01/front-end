import React from "react";

class Article extends React.Component {
  render() {
    return (
      <li
        id={this.props.id}
      >
        <div className="article-card">
          <h2>{this.props.article.title}</h2>
          <h3>Author: {this.props.article.author}</h3>
          <h4>{this.props.article.link}</h4>
          <h4>Category: {this.props.article.category}</h4>
        </div>
      </li>
    );
  }
}

export default Article;
