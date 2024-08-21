import { Table } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import styled from 'styled-components';


export interface TableDataType {
  _id: string;
}

interface Props<T> {
  columns: ColumnsType<T>;
  tableTitle: string;
  tableActions?: ReactNode;
  tableDetails?: ReactNode;
  mainTable?: boolean;
  tableKey?: number;
  getSelectedRecords?: (records: T[] | null) => void;
  selectable?: boolean;
  getActiveRecord?: (record: T | null) => void;
  selectProps?: {
    url: string;
  };
  footer?: () => ReactNode;
  tableSize?: 'large' | 'small';
data: T[];
}

export interface TableParams {
  pagination?: TablePaginationConfig;
  filters: Record<string, any>;
}

function DataTable<T extends TableDataType>({
  columns,
  tableTitle,
  selectProps,
  tableKey = 1,
  getSelectedRecords,
  selectable = false,
  getActiveRecord,
  tableActions,
  footer,
  tableSize = 'large',
  data
}: Props<T>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);




  //Handle record selection
  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: T[]
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
    getSelectedRecords?.(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (

    
      <div className="table__container">
      
        <Table<T>
          size={tableSize}
          loading={false}
          dataSource={data}
          columns={columns}
          rowKey={(record) => `${record._id}`}
          onRow={(record) => {
            return {
              onClick: () => {
                getActiveRecord?.(record);
              },
            };
          }}
          rowSelection={selectable ? rowSelection : undefined}
          pagination={false}
          rowClassName={(_record, index) =>
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
          footer={data && data.length > 0 ? (footer as any) : undefined}
        />
      </div>
  
  );
}



export default DataTable;