import React from "react";

class ArticleForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }

  inputTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  submitForm = event => {
    event.preventDefault();
    this.props.addArticle(this.state.title);
    this.setState({
      title: ""
    });
  };

  render() {
    return (
      <form className="form" onSubmit={this.submitForm}>
        <div className="form-control">
          <input
          type="text"
          placeholder="Title"
          onChange={this.inputTitleChange}
          value={this.state.title}
          />
        </div>
        <button>Add Article</button>
        <button type="button" onClick={this.props.clearCompleted}>Delete Read</button>
      </form>
    );
  }
}

export default ArticleForm;
