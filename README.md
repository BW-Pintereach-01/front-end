# front-end

App component contains four routes for the landing page, login page, register page, and dashboard. The home page renders the LandingPage component.

```javascript
<Route exact path='/' component={LandingPage} />
<Route exact path="/login" component={LoginPage} />
<Route path='/register' component={RegisterPage} />
<Route path='/dashboard' component={Dashboard} />
```

Inside the LandingPage component are links to the login page, register page, and dashboard.

```javascript
<Link to='/login'><button>Login</button></Link>
<Link to='/register'><button>Register</button></Link>
<Link to='/dashboard'><button>Dashboard</button></Link>
```

Inside the Dashboard component are all the components and functions for rendering articles, adding articles, toggling articles as read, and deleting articles that have been toggled read.

```javascript
<ArticleList article={this.state.article} markComplete={this.markComplete} />
<ArticleForm addArticle={this.addArticle} clearCompleted={this.clearCompleted} />
```