import React from 'react';

const TableRow = ({member}) => {
  return(
    <tr>
      <td>{member.rank}</td>
      <td>
        <img width="30" height="30" src={member.img}/>
        {member.name}
      </td>
      <td>{member.recent}</td>
      <td>{member.alltime}</td>
    </tr>
  );
};

export default TableRow;
