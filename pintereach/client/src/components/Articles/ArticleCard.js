import React from 'react';

const ArticleCard = props => {
  const { title, author, link, category } = props.article;
  return (
    <div className="article-card">
      <div className="article-title">
        <h1>{title}</h1>
      </div>
      <div className="article-author">
        <h2>by {author}</h2>
      </div>
      <div className="article-category">
        <h3>Category: {category}</h3>
      </div>
      <div className="article-link">
        {link}
      </div>
    </div>
  );
};

export default ArticleCard;
