import * as types from '../constants/actionTypes';


const initialState = {
  point: {
    x: 1,
    y: 1
  },
  lvl: 1,
  hp: 100,
  xp: 0,
  weapon: 10,
  board: [],
  win: false
};

const TYPES = {
  FLOOR: 0,
  WALL: 1,
  ENEMY: 2,
  BOSS: 3,
  WEAPON: 4,
  HEAL: 5
};

const ENEMY_PROB = 0.03;
const WEAPON_PROB = 0.01;
const HEAL_PROB = 0.01;

const staticEntity = (type) => {
  return {
    type
  };
};

const enemy = (type) => {
  let hp = 50;
  let damage = 10;

  if (type == TYPES.BOSS) {
    hp *= 3;
    damage *= 3;
  }

  return {
    type,
    hp,
    damage
  };
};

const good = (type, value = 20) => {
  return {
    type,
    value
  };
};

const loadGrid = (data) => {
  let point = {};
  let board = data.map((row, y) =>
    row
      .map((cell, x) => {
        if (cell == 1) {
          return staticEntity(TYPES.WALL);
        }

        if (cell == 6) {
          point.x = x;
          point.y = y;
          return staticEntity(TYPES.FLOOR);
        }

        if (cell == 3) {
          return enemy(TYPES.BOSS);
        }

        if (Math.random() < ENEMY_PROB) {
          return enemy(TYPES.ENEMY);
        }

        if (Math.random() < WEAPON_PROB) {
          let weaponDamage = 15;
          if (Math.random() < 0.5) weaponDamage += 5;
          if (Math.random() < 0.3) weaponDamage += 10;
          if (Math.random() < 0.1) weaponDamage += 30;
          return good(TYPES.WEAPON, weaponDamage);
        }

        if (Math.random() < HEAL_PROB) {
          return good(TYPES.HEAL);
        }

        return staticEntity(TYPES.FLOOR);
      }));
  return {
    point,
    board
  };
};

function set(i, value, xs) {
  return [
    ...xs.slice(0, i),
    value,
    ...xs.slice(i + 1)
  ];
}

function toggle({x, y}, grid, value) {
  let current = grid[y][x];
  return set(y, set(x, value, grid[y]), grid);
}

function move(state, v) {
  let x = state.point.x + v.x;
  let y = state.point.y + v.y;
  let point = {y, x};
  let moved = state.board[y][x];

  if (moved.type == TYPES.FLOOR) {
    return Object.assign({}, state, { point });
  }

  if (moved.type == TYPES.HEAL) {
    let hp = Math.min(100, state.hp + moved.value);
    let board = toggle(point, state.board, staticEntity(TYPES.FLOOR));
    return Object.assign({}, state, { hp, point, board });
  }

  if (moved.type == TYPES.WEAPON) {
    let weapon = Math.max(moved.value, state.weapon);
    let board = toggle(point, state.board, staticEntity(TYPES.FLOOR));
    return Object.assign({}, state, { weapon, point, board });
  }

  if (moved.type == TYPES.ENEMY || moved.type == TYPES.BOSS) {
    let dmg = (state.weapon + state.lvl * 5);
    if (moved.hp < dmg) {
      let xp = state.xp + 10;
      let lvl = state.lvl;
      if (xp > 100) {
        xp -= 100;
        lvl += 1;
      }
      if (moved.type == TYPES.BOSS) {
        return Object.assign({}, state, { win: true });
      }
      let board = toggle(point, state.board, staticEntity(TYPES.FLOOR));
      return Object.assign({}, state, { xp, lvl, point, board });
    } else {
      let enemy = {
        type: moved.type,
        damage: moved.damage,
        hp: (moved.hp - dmg)
      };
      let hp = state.hp - moved.damage;
      let board = toggle(point, state.board, enemy);
      return Object.assign({}, state, { hp, board });
    }
  }

  return state;
}


export default function gridReducer(state = initialState, action) {
  switch (action.type) {
    case types.GAME_LOAD:
      return Object.assign({}, state,
        loadGrid(action.data)
      );
    case types.MOVE:
      return move(state, action.vector);
    default:
      return state;
  }
}
