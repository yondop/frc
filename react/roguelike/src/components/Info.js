import React, {PropTypes} from 'react';

const Info = ({xp, hp, lvl, weapon}) => {
  return (
    <div
      className="toolbar">
      <div>
        lvl: {lvl}
      </div>
      <div>
        hp: {hp}
      </div>
      <div>
        xp: {xp}
      </div>
      <div>
        weapon: {weapon}
      </div>
    </div>
  );
};

Info.propTypes = {
  board: PropTypes.array.isRequired,
  point: PropTypes.object.isRequired
};

export default Info;
