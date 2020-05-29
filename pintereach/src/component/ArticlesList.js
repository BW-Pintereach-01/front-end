import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Article from './Article';
import ArticleForm from './ArticleForm';

const ArticlesList = () => {
  const [ articles, setArticles ] = useState([]);
  const [articleToEdit, setArticleToEdit] = useState(null);

  useEffect(() => {
    axiosWithAuth()
      .get('https://pintereach-1.herokuapp.com/api/articles')
      .then(res => setArticles(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <ArticleForm 
        setArticles={setArticles} 
        articleToEdit={articleToEdit} 
        setArticleToEdit={setArticleToEdit} 
      />
      <div className="article-list">
        {articles.map(article => {
          return (
            <Article
              key={article.id}
              {...article}
              articles={articles}
              setArticles={setArticles}
              setArticleToEdit={setArticleToEdit}
            />
          )
        })}
      </div>
    </>
  );
}

export default ArticlesList;