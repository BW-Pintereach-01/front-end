import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import axios from 'axios';

 const initialState = {title: '', author: '', link: '', category: ''}

const UpdateArticle = ({articleList, setArticleList}) => {
  const [article, setArticle] = useState(initialState);
  const params = useParams();
  const {push} = useHistory();

  const getArticle = (id) => {
    axios
      .get(`/api/articles/${id}`)
      .then((res) => {
        console.log(`getArticle: ${res}`)
        setArticle(res.data)})
      .catch((error) => console.log(error.res));
  };

  useEffect(() => {getArticle(params.id);}, [params.id])

  const handleChange = e => {
    setArticle({ ...article, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`/api/articles/${params.id}`, article)
      .then((res) => console.log(`setArticle: ${res}`))
      .catch((error) => console.log(error.res));

    const newArticleList = articleList.map(e => {
      if(Number(e.id) === Number(params.id)) return article;
      return e;
    });
    setArticleList(newArticleList);
    push('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label>Title</label>
        <input
          name="title"
          value={article.title}
          onChange={handleChange}
          placeholder="Title"
        />
      </div>
      <div className="form-control">
        <label>Author</label>
        <input
          name="author"
          value={article.author}
          onChange={handleChange}
          placeholder="Author"
        />
      </div>
      <div className="form-control">
        <label>Category</label>
        <input
          name="category"
          value={article.category}
          onChange={handleChange}
          placeholder="Category"
        />
      </div>
      <div className="form-control">
        <label>Link</label>
        <input
          name="link"
          value={article.link}
          onChange={handleChange}
          placeholder="Link"
        />
      </div>
      <button>Update Article</button>
    </form>
  );
}

export default UpdateArticle;