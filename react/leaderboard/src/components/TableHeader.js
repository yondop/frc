import React from 'react';

const TableHeader = ({field, label, sort, onChangeSort}) => {
  return(
    <th
      className="header"
      onClick={onChangeSort}
      data-field={field}>
      {label}
      {sort.field === field && (sort.type === 1 ? <span>&#9660;</span> : <span>&#9650;</span>)}
    </th>
  );
};

export default TableHeader;
