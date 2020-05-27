## PrivateRoute

The `PrivateRoute` component uses render props to check if a user has a token for authentication. If the token is on localStorage user will be routed to the requested page. If the token is not on localStorage the user is redirected to the login page.

```javascript
const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={() => {
        if (token) {
          // render component
          return <Component />;
        } else {
          // redirect to login
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
```

## Login/Register

The `Login` and `Register` components each contain empty credential objects set to state. Credential object contains a key with the string 'credentials' and value is set to another object with a blank username and a blank password. Credential state is entered through value attribute on input tags.

```javascript
class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };
```

`handleChange` function takes event from input fields to receive username and password. `handleChange` function will be passed into HTML `onchange` Event Attribute (`onChange` for JSX).

```javascript
handleChange = e => {
  this.setState({
    credentials: {
      ...this.state.credentials,
      [e.target.name]: e.target.value
    }
  });
};
```

`login` and `register` make a POST request to the `/login` and `/register` route with credentials stored in state. Server returns JSON web token for matching credentials. When receiving the token from the server it is set to `localStorage`. React Router then pushes to the `/protected` route. Login state is passed into HTML `onsubmit` Event Attribute (`onSubmit` for JSX) on the <form> tag. Type is set to `submit` on the <button> tag.

```javascript
login = e => {
  e.preventDefault();
  axiosWithAuth()
    .post("/api/auth/login", this.state.credentials)
    .then(res => {
      console.log(res)
      localStorage.setItem("token", res.data.token);
      this.props.history.push("/protected");
    })
    .catch(err => console.log(err));
};
```

```javascript
render() {
    return (
      <div className="container">
      <form id="form" className="form" onSubmit={this.login}>
        <h2>Login</h2>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    );
  }
  ```
 
 
 ### Article
 
 `Article` component takes in `articleList` and `setArticleList` props.
 useState hook takes in `article` state and `setArticle` hook.
 
 ```javascript
function Article({ articleList, setArticleList }) {
  const [article, setArticle] = useState(null);
```

`fetchArticle` hook performs a `GET` request to the `/api/articles/` endpoint with the id of the article.

```javascript
const fetchArticle = (id) => {
  axios
    .get(`/api/articles/${id}`)
    .then((res) => setArticle(res.data))
    .catch((err) => console.log(err.response));
};
```

If articles are still being loaded from the server display loading message.

```javascript
if (!article) {return <div>Loading article information...</div>;}
```

`useParams` from React Router is used to grab the id of the article in the URL and set the response data (`res.data`) to `article` state with `setAricle`.

```
const params = useParams();
useEffect(() => {fetchArticle(params.id);}, [params.id]);
```

`deleteArticle` makes a request to the `/api/articles` endpoint with the id for the article to be deleted. `setArticleList` filter's through `articleList` searching for all articles aside from the one being delete. Remaining articles are set to `articleList`.

```javascript
  const deleteArticle = () => {
    axios
      .delete(`/api/articles/${params.id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    setArticleList(articleList.filter(article => Number(article.id) !== Number(params.id)));
  }
```
`ArticleCard` component takes in article props and renders the component. Update button routes to whatever article is clicked on. Delete button fires the `deleteArticle` request to the server with the article's id.

```
  return (
    <div className="save-wrapper">
      <ArticleCard article={article} />
      <Link to={`/update-article/${article.id}`}><button>Update</button></Link>
      <Link to={`/`} onClick={deleteArticle}><button>Delete</button></Link>
    </div>
  );
}
```

### ArticleCard

`ArticleCard` component takes in article information from `Article` component and renders it with HTML header tags and classes for CSS styling.

```javascript
const ArticleCard = props => {
  const { title, author, link, category } = props.article;
  return (
    <div className="article-card">
      <div className="article-title">
        <h1>{title}</h1>
      </div>
      <div className="article-author">
        <h2>by {author}</h2>
      </div>
      <div className="article-category">
        <h3>Category: {category}</h3>
      </div>
      <div className="article-link">
        <h4>{link}</h4>
      </div>
    </div>
  );
};
```

### AddArticle

`AddArticle` component takes in `initialState` object which contains blank key/value pairs for article title, article author, article link, and article category. `setArticleList` takes in the 
 
 ```javascript
const initialState = {
  title: '', author: '', link: '', category: ''
}

const AddArticle = ({articleList, setArticleList}) => {
  const [article, setArticle] = useState(initialState);
  const {push} = useHistory();

  const handleChange = e => {
    setArticle({ ...article, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`/api/articles`, article)
      .then((response) => setArticleList(response.data))
      .catch((error) => console.log(error.response));
    push('/');
  }
```

Each <input> takes in either title, author, link, or category and sets state through the value attribute. The `handleChange` function is passed through the React `onChange`event attribute and set to state with the `setArticle` hook. <form> takes `handleSubmit` through the React `onSubmit` event attribute.

```javascript
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
```
