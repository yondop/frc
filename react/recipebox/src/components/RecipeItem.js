import React from 'react';

class RecipeItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.updateRecipe = this.updateRecipe.bind(this);
  }

  updateRecipe() {
    this.props.updateRecipe(this.props.recipe);
  }

  render() {
    return(
      <div className="recipe" onClick={this.updateRecipe}>
        <h3 className="title">
          {this.props.recipe.title}
        </h3>
        <div className="parts">
          {this.props.recipe.parts.length > 0 && this.props.recipe.parts
            .split(',')
            .map(part => <span key={part.trim()} className="part">
              {part.trim()}
            </span>)}
        </div>
      </div>
    );
  }
}

export default RecipeItem;
