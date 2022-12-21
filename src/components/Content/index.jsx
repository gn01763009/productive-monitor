import React from 'react';
import DataTable from 'react-data-table-component';

const percentageHandler = (arg1, arg2=1) => {
  const num = arg1 / arg2;
  return Math.round(num * 100) / 100
}

const tableCustomStyles = {
  headCells: {
    style: {
      background: "#184059",
      color: "white",
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
};

const columns = [
  {
    name: 'Group',
    selector: row => row.GRP_ID,
    cell: row => (
      <div>
        <div>{row.GRP_ID}</div>
        <div>{"DV9340"}</div>
      </div>
    ),
  },
  {
    name: 'Trend',
    selector: row => row.time,
    cell: row => (
      <p>
        {null}
      </p>
    ),
  },
  {
    name: 'CMT',
    selector: row => row.CMT_MY,
    cell: row => (
      <div>
        <div>{percentageHandler(row.CMT_MY)}</div>
        <div>{percentageHandler(row.PRD_QT,row.EXP_QT)}</div>
      </div>
    ),
  },
  {
    name: 'FOB/QTY',
    selector: row => row.FOB_MY,
    cell: row => (
      <div>
        <div>{percentageHandler(row.FOB_MY)}</div>
        <div>{169}</div>
      </div>
    ),
  },
];


const Content = ({originData, dates}) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={originData}
        customStyles={tableCustomStyles}
      />
    </div>
  )
}

export default Content
