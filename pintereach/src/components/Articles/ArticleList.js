
import React from "react";
import {Link} from "react-router-dom";
import ArticleCard from "./ArticleCard";
function ArticleList( articles ) {
  return (
    <div className="article-list">
      <Link key={articles.id} to={`/articles/`}>
        <ArticleCard articles={articles} />
      </Link>
    </div>
  );
}
export default ArticleList;
