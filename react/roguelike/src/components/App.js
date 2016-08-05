import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Grid from './Grid';
import Info from './Info';
import * as gameActions from '../actions/gameActions';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.onKey = this.onKey.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKey, true);
  }

  onKey(e) {
    switch(e.code) {
      case 'KeyW' :
        this.props.actions.move({y: -1, x: 0});
        break;
      case 'KeyS' :
        this.props.actions.move({y: 1, x: 0});
        break;
      case 'KeyA' :
        this.props.actions.move({y: 0, x: -1});
        break;
      case 'KeyD' :
        this.props.actions.move({y: 0, x: 1});
        break;
    }
    e.preventDefault();
  }

  render() {
    const {game} = this.props;
    return (
      <div>
        <Info
          xp={game.xp}
          hp={game.hp}
          lvl={game.lvl}
          weapon={game.weapon}/>
        {game.hp <= 0
          ? <h1>YOU LOST</h1>
        : (game.win
          ? <h1>YOU WIN</h1>
          : <Grid
          board={game.board}
          point={game.point}/>)}
      </div>
    );
  }
}

App.propTypes = {
  game: PropTypes.object.isRequired
};

export default connect(
  (state) => ({
    game: state.game
  }),
  (dispath) => ({
    actions: bindActionCreators(gameActions, dispath)
  })
)(App);
