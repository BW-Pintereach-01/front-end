import React, {useState, useEffect} from "react";
import {Route, Link} from "react-router-dom";
import ArticleList from "./Articles/ArticleList";
import Article from "./Articles/Article";
import axios from 'axios';
import UpdateArticle from "./Articles/UpdateArticle";
import AddArticle from "./Articles/AddArticle";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from './PrivateRoute'

const Dashboard = () => {
  const [articleList, setArticleList] = useState([]);

  const getArticleList = () => {
    axios
      .get("http://localhost:5000/api/articles")
      .then(res => setArticleList(res.data))
      .catch(err => console.log(err.response));
  };

  useEffect(() => {getArticleList();}, []);

  return (
    <>
      <Link to="/"><button>Home</button></Link>
      <Link to="/articles"><button>Articles</button></Link>
      <Link to="/add-article"><button>Add Article</button></Link>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>

      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />

      <PrivateRoute path="/articles" component={ArticleList} />
        {/* <ArticleList articles={articleList} /> */}

      <PrivateRoute path="/articles/:id" component={Article} />
        {/* <Article articleList={articleList} setArticleList={setArticleList} /> */}

      <PrivateRoute path="/update-article/:id" component={UpdateArticle} />
        {/* <UpdateArticle articleList={articleList} setArticleList={setArticleList} /> */}

      <PrivateRoute path="/add-article" component={AddArticle} />
        {/* <AddArticle articleList={articleList} setArticleList={setArticleList} /> */}
    </>
  );
};

export default Dashboard;
