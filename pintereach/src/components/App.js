import React, {useState, useEffect} from "react";
import {Route, Link} from "react-router-dom";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Login from "./Login";
import Register from "./Register";

const App = () => {
const [article, setArticle] = useState()

axiosWithAuth()
.get("https://pintereach-1.herokuapp.com/api/articles")
.then(res => {
  // console.log(res.data.articles)
  // setArticle(res.data.articles)
})
.catch(err => console.log(err.res));
  // const [articleList, setArticleList] = useState([ArticleContext]);
  // const [credentials, setCredential] = useState([ArticleContext]);
  // const [userId, setUserId] = useState({user_id: null})

  // const getArticleList = () => {
  //   axiosWithAuth()
  //     .get("https://pintereach-1.herokuapp.com/api/articles")
  //     .then(res => {
  //       setArticleList(res.data.articles)})
  //     .catch(err => console.log(err.res));
  // };

  // useEffect(() => {getArticleList();}, []);
  return (
    <>
    {/* <ArticleContext.Provider value={{articleList, setArticleList, credentials, setCredential, userId, setUserId}}> */}
      {/* <Link to="/"><button>Home</button></Link>
      <Link to="/add-article"><button>Add Article</button></Link>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
      <Link to="/articles"><button>Articles</button></Link>

      <Route path="/login">
        <Login credentials={credentials} setCredential={setCredential}/>
      </Route>
      <Route exact path="/register" component={Register} />

      <Route path="/articles">
        <Article articles={articleList} setArticleList={setArticleList} />
      </Route>

      <Route path="/update-articles/:id">
        <UpdateArticle articleList={articleList} setArticleList={setArticleList} />
      </Route>

      <Route path="/add-article">
        <AddArticle articleList={articleList} setArticleList={setArticleList} userId={userId} setUserId={setUserId} />
      </Route> */}
    {/* </ArticleContext.Provider> */}
    </>
  );
;
    }
export default App;
