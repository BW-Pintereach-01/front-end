import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const ArticleForm = ({ setArticles, articleToEdit, setArticleToEdit }) => {
  const [ newArticle, setNewArticle ] = useState({ title: '', author: '', link: '', category: '', users_id: ''});

  useEffect(() => {
    if(articleToEdit) setNewArticle(articleToEdit);
  }, [articleToEdit])

  const submitArticle = e => {
    e.preventDefault();

    (articleToEdit) 
      ? axiosWithAuth()
        .put(`https://pintereach-1.herokuapp.com/api/articles/${newArticle.id}`, newArticle)
        .then(res => setArticles(res.data))
        .catch(err => console.log(err))
      : axiosWithAuth()
        .post('https://pintereach-1.herokuapp.com/api/articles/', newArticle)
        .then(res => setArticles(res.data))
        .catch(err => console.log(err))
    
    setNewArticle({ title: '', author: '', link: '', category: '', users_id: '' });
    setArticleToEdit(null)
  }

  const handleChange = e => {
    setNewArticle({
      ...newArticle,
      [e.target.name]: (e.target.name === 'users_id') ? Number(e.target.value) : e.target.value,
    })
  }

  return (
    <div className="container">
    <form className="form" onSubmit={submitArticle}>
      <div className="form-control">
        <label>Title</label>
        <input
          name="title"
          placeholder="title"
          value={newArticle.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-control">
        <label>Author</label>
        <input
          name="author"
          placeholder="author"
          value={newArticle.author}
          onChange={handleChange}
        />
      </div>

      <div className="form-control">
        <label>Link</label>
        <input
          name="link"
          placeholder="link"
          value={newArticle.link}
          onChange={handleChange}
        />
      </div>

      <div className="form-control">
        <label>Category</label>
        <input
          name="category"
          placeholder="category"
          value={newArticle.category}
          onChange={handleChange}
        />
      </div>

      <div className="form-control">
        <label>users_id</label>
        <input 
          name="users_id"
          placeholder="users_id"
          value={newArticle.users_id}
          onChange={handleChange}
        />
      </div>
      <button>{(articleToEdit) ? 'Edit' : 'Submit'}</button>
    </form>
    </div>
  );
}

export default ArticleForm;