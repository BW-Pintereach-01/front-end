import React from "react";
import ArticleList from "./ArticleList";
import ArticleForm from "./ArticleForm";;

const articles = [
  {
    title: "A short history of ReactJS",
    link: "https://ajcwebdev.netlify.app/ajcwebdev/a-short-history-of-react/",
    author: "AJC",
    category: "Web",
    id: 1528817077286
  },
  {
    title: "A short history of NodeJS",
    link: "https://ajcwebdev.netlify.app/ajcwebdev/a-short-history-of-node/",
    author: "AJC",
    category: "Web",
    id: 1528817077286
  }
];

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      article: articles
    };
  }

  addArticle = (title, link, author, category) => {
    this.setState({article: [...this.state.article, {
      title: title,
      link: link,
      author: author,
      category: category,
      id: Date.now()
    }]});
  };

  render() {
    return (
      <div className="App">
        <h2>Article List</h2>
        <ArticleList article={this.state.article} />
        <ArticleForm addArticle={this.addArticle} />
      </div>
    );
  }
}

export default Dashboard;