import React from "react";
import ArticleList from "./ArticleList";
import ArticleForm from "./ArticleForm";;

const articles = [
  {
    title: "Hello World",
    id: 1528817077286,
    completed: false
  }
];

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      article: articles
    };
  }

  addArticle = title => {
    this.setState({article: [...this.state.article, {
      title: title,
      id: Date.now(),
      completed: false
    }]});
  };

  markComplete = event => {
    const newArticle = [...this.state.article];
    newArticle.splice(event.target.id, 1, {
      ...this.state.article[event.target.id],
      completed: !this.state.article[event.target.id].completed
    });
    this.setState({article: newArticle});
  };

  clearCompleted = event => {
    this.setState({article: [...this.state.article.filter(article => article.completed === false)]});
  };

  render() {
    return (
      <div className="App">
        <h2>Article List</h2>
        <ArticleList article={this.state.article} markComplete={this.markComplete} />
        <ArticleForm addArticle={this.addArticle} clearCompleted={this.clearCompleted} />
      </div>
    );
  }
}

export default Dashboard;