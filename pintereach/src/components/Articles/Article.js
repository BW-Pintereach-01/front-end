import React, {useEffect, useState} from "react";
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom"

function Article({ articleList, setArticleList }) {
  const [article, setArticle] = useState(null);
  const params = useParams();

  const fetchArticle = () => {
    axiosWithAuth()
      .get(`https://pintereach-1.herokuapp.com/api/articles/`)
      .then((res) => {
        setArticle(res.data)})
      .catch((err) => console.log(err.res));
  };

  useEffect(() => {fetchArticle(params.id);}, [params.id]);

  if (!article) {return <div>Loading article information...</div>;}

  const deleteArticle = () => {
    axiosWithAuth()
      .delete(`https://pintereach-1.herokuapp.com/api/articles/`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    setArticleList(articleList.filter(article => Number(article.id) !== Number(params.id)));
  }

  return (
    <div className="save-wrapper">
      <Link to={`/update-article/${article.id}`}>
        <button>Update</button>
      </Link>
      <button>Update</button>
      <button>Delete</button>
      <Link to={`/`} onClick={deleteArticle}>
        <button>Delete</button>
      </Link>
    </div>
  );
}

export default Article;
