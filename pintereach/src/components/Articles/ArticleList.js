import React from "react";
import {Link} from "react-router-dom";
import ArticleCard from "./ArticleCard";

function ArticleList( article ) {
  return (
    <div className="article-list">
      <Link key={article.id} to={`/articles/${article.id}`}>
        <ArticleCard article={article} />
      </Link>
    </div>
  );
}

export default ArticleList;
