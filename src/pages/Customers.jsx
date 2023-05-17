import React, { useEffect, useState } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

const Customers = () => {
  const toolbarOptions = ['Search'];
  const editing = { allowDeleting: true, allowEditing: true };

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://nodejs-mongodb-app.herokuapp.com/getAllClients", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "clientsData");
        setData(data.data);
      });
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Clientes" />
      <GridComponent
        dataSource={data}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent>
    </div>
  );
};

export default Customers;
