import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const Board = ({members, sort, onChangeSort}) => {
  return(
    <table className="table">
      <thead>
        <tr>
          <TableHeader
            field="rank"
            label="#"
            sort={sort}
            onChangeSort={onChangeSort} />
          <TableHeader
            field="name"
            label="name"
            sort={sort}
            onChangeSort={onChangeSort} />
          <TableHeader
            field="recent"
            label="Points in past 30 days"
            sort={sort}
            onChangeSort={onChangeSort} />
          <TableHeader
            field="alltime"
            label="Points in all time"
            sort={sort}
            onChangeSort={onChangeSort} />
        </tr>
      </thead>
      <tbody>
        {members.map(member => <TableRow key={member.name} member={member} />)}
      </tbody>
    </table>
  );
};

export default Board;
