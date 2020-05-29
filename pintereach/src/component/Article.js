import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Article = ({ title, author, link, category, users_id, id, setArticles, articles, setArticleToEdit }) => {
  const deleteArticle = id => {
    axiosWithAuth()
      .delete(`https://pintereach-1.herokuapp.com/api/articles/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    setArticles(articles.filter(friend => friend.id !== id))
  }

  return (
    <div className="container">
      <div className="form">
      <div className="form-control">
        <h1>{title}</h1>
        </div>
        <h2>by {author}</h2>
        <p>Link: {link}</p>
        <h3>Category: {category}</h3>
        <p>users_id: {users_id}</p>
      </div>
      <div>
        <button onClick={() => setArticleToEdit({ id, title, author, link, category, users_id })}>Edit</button>
        <button onClick={() => deleteArticle(id)}>Delete</button>
      </div>
    </div>
  );
}

export default Article;