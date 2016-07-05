import React from 'react';

class RecipeForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    if (this.props.recipe) {
      this.state = {recipe: this.props.recipe};
    }

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDel = this.onDel.bind(this);
  }

  onChange(event) {
    let field = event.target.name;
    let recipe = this.state.recipe;
    recipe[field] = event.target.value;
    this.setState({recipe: recipe});
  }

  onSave(event) {
    if (this.state.recipe.title.length < 3) return;
    this.props.saveRecipe(this.state.recipe);
    this.props.closeForm();
  }

  onDel() {
    this.props.deleteRecipe(this.state.recipe);
    this.props.closeForm();
  }


  render() {
    return(
      <div className="recipe-form">
        <div className="form-group">
          <label htmlFor="title">Recipe name</label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Enter your recipe name"
            value={this.state.recipe.title}
            onChange={this.onChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="parts">Recipe parts</label>
          <textarea
            name="parts"
            className="form-control"
            placeholder="Enter your parts"
            value={this.state.recipe.parts}
            onChange={this.onChange}/>
        </div>
        <div className="btn-group">
          <div onClick={this.onSave} className="btn btn-primary">Save recipe</div>
          <div onClick={this.onDel} className="btn btn-danger">Del recipe</div>
          <div onClick={this.props.closeForm} className="btn btn-default">Cancel</div>
        </div>
      </div>
    );
  }
}

export default RecipeForm;
