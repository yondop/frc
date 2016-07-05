import React from 'react';
import RecipeItem from './RecipeItem';
import RecipeForm from './RecipeForm';


class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    let recipies = JSON.parse(localStorage.getItem('recipes')) || [];

    this.state = {
      recipes: recipies,
      editing: false,
      selected: null
    };

    this.addRecipe = this.addRecipe.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.openForm = this.openForm.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  addRecipe() {
    this.openForm({title: '', parts: ''});
  }

  openForm(recipe) {
    this.setState({editing: true, selected: recipe});
  }

  closeForm() {
    this.setState({editing: false, selected: null});
  }

  saveRecipe(recipe) {
    let recipes = this.state.recipes;
    if (recipe.id) {
      let finded = recipes.find(r => r.id == recipe.id);
      finded.title = recipe.title;
      finded.parts = recipe.parts;
    } else {
      recipe.id = recipe.title.toLowerCase().replace(' ', '');
      recipes.push(recipe);
    }

    this.setState({recipes: recipes});
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }

  deleteRecipe(recipe) {
    let recipes = this.state.recipes;
    if (!recipe.id) return;

    let finded = recipes.find(r => r.id == recipe.id);
    let num = recipes.indexOf(finded);
    recipes.splice(num, 1);

    this.setState({recipes: recipes});
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }

  render() {
    return(
      <div>
        <div className="header">
          <h1>Recieps</h1>
          {this.state.editing || <div onClick={this.addRecipe} className="btn btn-primary">+</div>}
        </div>
        {this.state.editing ? <RecipeForm
          recipe={this.state.selected}
          closeForm={this.closeForm}
          saveRecipe={this.saveRecipe}
          deleteRecipe={this.deleteRecipe}/>
        :<div className="recipes">
            {this.state.recipes.map(recipe =>
              <RecipeItem key={recipe.id} updateRecipe={this.openForm} recipe={recipe} />)}
          </div>
        }
      </div>
    );
  }
}

export default App;
