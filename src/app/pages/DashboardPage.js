import React, { useEffect } from "react";
import Card from '../../components/memo/index';
import Table from '../../components/table/index';


export function DashboardPage() {
  useEffect(() => {
  });
  return <>
    <div className={'container'}>
      <div className={'row'} >
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className={'row'}>
        <Table columns={[
          'soso', 'boto', 'toto'
        ]} title={'toto'} />
        <Table columns={[
          'soso', 'boto', 'toto'
        ]} title={'toto'} />
      </div>
      <div className={'row'}>
        <Table columns={[
          'soso', 'boto', 'toto'
        ]} title={'toto'} />
        <Table columns={[
          'soso', 'boto', 'toto'
        ]} title={'toto'} />
      </div>
    </div>
  </>;
}


