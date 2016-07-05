import React from 'react';
import Board from './Board';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      type: 'recent',
      members: [],
      sort: {
        field: 'rank',
        type: 1
      }
    };

    this.changeSort = this.changeSort.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.changeSource = this.changeSource.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.state.type);
  }

  fetchData(type) {
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/' + type)
    .then((response) => response.json())
    .then((json) => {
      let members = json.map((el, i) => {
        return {
          rank: (i + 1),
          name: el.username,
          alltime: el.alltime,
          recent: el.recent,
          img: el.img
        };
      });

      this.setState({members: members});
    })
    .catch((error) => {
      throw(error);
    });
  }

  changeSort(event) {
    let field = event.target.dataset.field;
    let type = this.state.sort.type;

    if (field === this.state.sort.field) type *= -1;

    this.setState({
      sort: {
        field: field,
        type: type
      }
    });
  }

  changeSource() {
    let type = 'recent';
    if (this.state.type === 'recent') {
      type = 'alltime';
    }

    this.setState({type: type});
    this.fetchData(type);
  }

  render() {
    return(
      <div className="container-fluid">
        <div className="top">
          <h2>Leaderboard</h2>
          <div
            className="btn btn-primary"
            onClick={this.changeSource}>
            {this.state.type === 'recent' ? 'Get All Time' : 'Get Recent'}
          </div>
        </div>
        <Board
          members={this.state.members.sort((a, b) => {
            let field = this.state.sort.field;
            let type = this.state.sort.type;

            if (a[field] > b[field]) return type;
            if (a[field] < b[field]) return -type;
            return 0;
          })}
          sort={this.state.sort}
          onChangeSort={this.changeSort}
          />
      </div>
    );
  }
}

export default App;
