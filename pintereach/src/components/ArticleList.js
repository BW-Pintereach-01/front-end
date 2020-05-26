import React from "react";
import Article from "./Article";

class ArticleList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.article.map((article, id) => (
          <Article
            key={article.id}
            id={id}
            article={article}
          />
        ))}
      </ul>
    );
  }
}

export default ArticleList;
