import React, {useEffect, useState} from "react";
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import {useParams} from "react-router-dom";
import ArticleCard from "./ArticleCard";
import {Link} from "react-router-dom";

function Article({ articleList, setArticleList }) {
  const [article, setArticle] = useState(null);
  const params = useParams();

  const fetchArticle = (id) => {
    axiosWithAuth()
      .get(`https://pintereach-1.herokuapp.com/api/articles/${id}`)
      .then((res) => {
        console.log(`fetchArticle: ${res}`)
        setArticle(res.data)})
      .catch((err) => console.log(err.res));
  };

  useEffect(() => {fetchArticle(params.id);}, [params.id]);

  if (!article) {return <div>Loading article information...</div>;}

  const deleteArticle = () => {
    axiosWithAuth()
      .delete(`https://pintereach-1.herokuapp.com/api/articles/${params.id}`)
      .then(res => console.log(`deleteArticle: ${res}`))
      .catch(err => console.log(err))
    setArticleList(articleList.filter(article => Number(article.id) !== Number(params.id)));
  }

  return (
    <div className="save-wrapper">
      <ArticleCard article={article} />
      <Link to={`/update-article/${article.id}`}>
        <button>Update</button>
      </Link>
      <Link to={`/`} onClick={deleteArticle}>
        <button>Delete</button>
      </Link>
    </div>
  );
}

export default Article;
