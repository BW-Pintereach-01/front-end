import React, {useState, useEffect} from "react";
import {Route, Link} from "react-router-dom";
import ArticleList from "./Articles/ArticleList";
import Article from "./Articles/Article";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import UpdateArticle from "./Articles/UpdateArticle";
import AddArticle from "./Articles/AddArticle";
import Login from "./Login";
import Register from "./Register";
import {ArticleContext} from '../context/ArticleContext'

const App = () => {
  const [articleList, setArticleList] = useState([]);

  const getArticleList = () => {
    axiosWithAuth()
      .get("https://pintereach-1.herokuapp.com/api/articles")
      .then(res => {
        console.log(`getArticleList: ${res}`)
        setArticleList(res.data)})
      .catch(err => console.log(err.res));
  };

  useEffect(() => {getArticleList();}, []);

  return (
    <>
    <ArticleContext.Provider value={{articleList, setArticleList}}>
      <Link to="/"><button>Home</button></Link>
      <Link to="/add-article"><button>Add Article</button></Link>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
      <Link to="/articles"><button>Articles</button></Link>

      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />

      <Route path="/articles">
        <ArticleList articles={articleList} />
      </Route>

      <Route path="/articles/:id">
        <Article articleList={articleList} setArticleList={setArticleList} />
      </Route>

      <Route path="/update-articles/:id">
        <UpdateArticle articleList={articleList} setArticleList={setArticleList} />
      </Route>

      <Route path="/add-article">
      <AddArticle articleList={articleList} setArticleList={setArticleList} />
      </Route>
    </ArticleContext.Provider>
    </>
  );
};

export default App;
