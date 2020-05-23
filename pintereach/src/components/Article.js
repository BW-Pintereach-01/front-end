import React from "react";

class Article extends React.Component {
  render() {
    return (
      <li
        id={this.props.id}
        className={this.props.article.completed ? "completed" : null}
        onClick={this.props.markComplete}
      >
        {this.props.article.title}
      </li>
    );
  }
}

export default Article;
