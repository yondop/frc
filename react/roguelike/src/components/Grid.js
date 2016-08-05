import React, {PropTypes} from 'react';

const classes = [ 'floor', 'wall', 'enemy', 'boss', 'weapon', 'heal' ];
const Grid = ({board, point}) => {
  let grid = [];
  for (let yo = -10; yo < 10; yo++) {
    grid.push([]);
    for (let xo = -10; xo < 10; xo++) {
      grid[yo + 10].push([]);
      let x = point.x + xo;
      let y = point.y + yo;
      if (xo == 0 && yo == 0) {
       grid[10][10] = 'player';
     } else
      if (y >= 0 && y < board.length) {
        let ys = board[y];
        if (x >= 0 && x < ys.length) {
          grid[10 + yo][10 + xo] = classes[board[y][x].type];
        }
      }
    }
  }

  return (
    <table
      className={`grid`}>
      <tbody>
        {grid.map((row, y) =>
          <tr key={y}>
            {row.map((cell, x) =>
              <td
                key={x}
                className={cell}
                ></td>)}
          </tr>)}
      </tbody>
    </table>
  );
};

Grid.propTypes = {
  board: PropTypes.array.isRequired,
  point: PropTypes.object.isRequired
};

export default Grid;
