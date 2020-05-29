# Authorization

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

`handleChange` function takes event from input fields to receive username and password. `handleChange` function will be passed into `onChange` event attribute.

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

`login` and `register` make a POST request to the `/login` and `/register` route with credentials stored in state. Server returns JSON web token for matching credentials. When receiving the token from the server it is set to `localStorage`. React Router then pushes to the `/protected` route. Login state is passed into `onSubmit` event attribute on `<form>` tag. Type is set to `submit` on `<button>` tag.

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
 
`axiosWithAuth` is a utility method that sets an authentication token to the browsers localStorage. This allows users to continuously browser protected content without having to authenticate with every requests.
 
 ```javascript
export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      Authorization: token
    },
  });
};
```
 
createContext is passed to ArticleContext and set
 
 ```javascript
import { createContext } from 'react';
export const ArticleContext = createContext();
```
 
 
 # CRUD Articles
 
 ### Article
 
 `Article` component takes in `articleList` and `setArticleList` props.
 useState hook takes in `article` state and `setArticle` hook.
 
 ```javascript
function Article({ articleList, setArticleList }) {
  const [article, setArticle] = useState(null);
```

#### GET - READ

`fetchArticle` hook performs a `GET` request to the `/api/articles/` endpoint with the id of the article.

```javascript
  const fetchArticle = (id) => {
    axiosWithAuth()
      .get(`https://pintereach-1.herokuapp.com/api/articles/${id}`)
      .then((res) => {
        console.log(`fetchArticle: ${res}`)
        setArticle(res.data)})
      .catch((err) => console.log(err.res));
  };
```

If articles are still being loaded from the server display loading message.

```javascript
if (!article) {return <div>Loading article information...</div>;}
```

`useParams` from React Router is used to grab the id of the article in the URL and set the response data (`res.data`) to `article` state with `setAricle`.

```javascript
const params = useParams();
useEffect(() => {fetchArticle(params.id);}, [params.id]);
```

#### DELETE

`deleteArticle` makes a request to the `/api/articles` endpoint with the id for the article to be deleted. `setArticleList` filter's through `articleList` searching for all articles aside from the one being deleted. Remaining articles are set to `articleList`.

```javascript
  const deleteArticle = () => {
    axiosWithAuth()
      .delete(`https://pintereach-1.herokuapp.com/api/articles/${params.id}`)
      .then(res => console.log(`deleteArticle: ${res}`))
      .catch(err => console.log(err))
    setArticleList(articleList.filter(article => Number(article.id) !== Number(params.id)));
  }
```

Article props are fed into `ArticleCard` component and rendered. Update button routes to whatever article is clicked on. Delete button fires the `deleteArticle` request to the server with the article's id.

```javascript
  return (
    <div className="save-wrapper">
      <ArticleCard article={article} />
      <Link to={`/update-article/${article.id}`}>
        <button>Update</button>
      </Link>
      <Link to={`/`} onClick={deleteArticle}>
        <button>Delete</button>
      </Link>
    </div>
  );
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
        {link}
      </div>
    </div>
);
};
```

### AddArticle

`AddArticle` component takes in `state` object which contains blank key/value pairs for article title, article author, article link, and article category. `setArticles` takes in the response data from the POST request.
 
 ```javascript
const initialState = {
  title: '', author: '', link: '', category: ''
}

const AddArticle = ({articleList, setArticleList}) => {
  const [article, setArticle] = useState(state);
  const {push} = useHistory();

  const handleChange = e => {
    setArticles({ ...article, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`https://pintereach-1.herokuapp.com/api/articles`, article)
      .then((res) => {
        console.log(res)
        setArticle(res.data)})
      .catch((err) => console.log(err.res));
    push('/');
  }
```

Each `<input>` takes in either title, author, link, or category and sets state through the value attribute. The `handleChange` function is passed through the React `onChange`event attribute and set to state with the `setArticle` hook. `<form>` takes `handleSubmit` through the React `onSubmit` event attribute.

```javascript
return (
  <form onSubmit={handleSubmit}>
    <input
      name="title" value={article.title} placeholder="Title"
      onChange={handleChange} 
    />
    <input
      name="author" value={article.author} placeholder="Author"
      onChange={handleChange} 
    />
    <input
      name="link" value={article.link} placeholder="Link"
      onChange={handleChange}
    />
    <input
      name="category" value={article.category} placeholder="Category"
      onChange={handleChange}
    />
    <button>Add Article</button>
  </form>
);
```

`newArticleList` maps over articleList and checks for the matching id of article.

```javascript
  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`https://pintereach-1.herokuapp.com/api/articles/${params.id}`, article)
      .then((res) => console.log(`setArticle: ${res}`))
      .catch((error) => console.log(error.res));

    const newArticleList = articleList.map(e => {
      if(Number(e.id) === Number(params.id)) return article;
      return e;
    });
    setArticleList(newArticleList);
    push('/');
  }
```

Form takes in article title, author, category, and link through value attribute on input tags. `handleSubmit` is passed into `onSubmit`.

```javascript
return (
  <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        name="title" value={article.title} placeholder="Title"
        onChange={handleChange}
      />
      <label>Author</label>
      <input
        name="author" value={article.author} placeholder="Author"
        onChange={handleChange}
      />
      <label>Category</label>
      <input
        name="category" value={article.category} placeholder="Category"
        onChange={handleChange}
      />
      <label>Link</label>
      <input
        name="link" value={article.link} placeholder="Link"
        onChange={handleChange}
      />
    <button>Update Article</button>
  </form>
)
```
