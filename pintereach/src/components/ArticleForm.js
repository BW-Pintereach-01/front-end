import React from "react";

class ArticleForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      link: "",
      author: "",
      category: ""
    };
  }

  inputTitleChange = event => {
    this.setState({title: event.target.value});
  };

  inputLinkChange = event => {
    this.setState({link: event.target.value});
  };

  inputAuthorChange = event => {
    this.setState({author: event.target.value});
  };

  inputCategoryChange = event => {
    this.setState({category: event.target.value});
  };
  
  submitForm = event => {
    event.preventDefault();
    this.props.addArticle(
      this.state.title,
      this.state.link,
      this.state.author,
      this.state.category
    );
    this.setState({
      title: "",
      link: "",
      author: "",
      category: ""
    });
  };

  render() {
    return (
      <form className="form" onSubmit={this.submitForm}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
            <input
            type="text"
            placeholder="Title"
            onChange={this.inputTitleChange}
            value={this.state.title}
            />
        </div>
        <div className="form-control">
          <label htmlFor="link">Link</label>
            <input
            type="text"
            placeholder="Link"
            onChange={this.inputLinkChange}
            value={this.state.link}
            />
        </div>
        <div className="form-control">
          <label htmlFor="author">Author</label>
            <input
            type="text"
            placeholder="Author"
            onChange={this.inputAuthorChange}
            value={this.state.author}
            />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
            <input
            type="text"
            placeholder="Category"
            onChange={this.inputCategoryChange}
            value={this.state.category}
            />
        </div>
        <button>Add Article</button>
      </form>
    );
  }
}

export default ArticleForm;
