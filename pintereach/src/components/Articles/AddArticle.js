import React, {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import {ArticleContext} from '../../context/ArticleContext'

const AddArticle = () => {
  const [article, setArticle] = useState({
    title: '', author: '', link: '', category: '', user_id: null
  });
  const {userId} = useContext(ArticleContext)
  const {push} = useHistory();
  console.log(userId)
  const handleChange = e => {
    setArticle({ ...article, [e.target.name]: e.target.value, user_id: userId.user_id})
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`https://pintereach-1.herokuapp.com/api/articles`, article)
      .then((res) => {
        setArticle(res.data)})
      .catch((err) => console.log(err.res));
    push('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          name="title"
          placeholder="Title"
          value={article.title}
          onChange={handleChange} 
        />
      </div>
      <div className="form-control">
        <input
          name="author"
          placeholder="Author"
          value={article.author}
          onChange={handleChange} 
        />
      </div>
      <div className="form-control">
        <input
          name="link"
          placeholder="Link"
          value={article.link}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <input
          name="category"
          placeholder="Category"
          value={article.category}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <button>Add Article</button></div>
    </form>
  );
}

export default AddArticle;