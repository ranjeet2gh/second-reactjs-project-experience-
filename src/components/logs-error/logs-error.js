import React, { useState } from 'react';
import { Table, Button, Input, Pagination, Checkbox, Select } from 'antd';
import { SearchOutlined, EllipsisOutlined, ReloadOutlined } from '@ant-design/icons';
import './logs-error.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
//import { Height } from '@mui/icons-material';

const sampleData = Array.from({ length: 200 }, (_, index) => ({
  key: index,
  callId: Math.floor(1000 + Math.random() * 9000).toString(),
  callDateTime: '22/10/2023 09:30AM',
  errorMessage: index % 2 === 0 ? '404 error' : '500 internal server error',

}));


let totalRows = (sampleData).length;

const Logs = () => {
  const [data, setData] = useState(sampleData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: 'Call ID',
      dataIndex: 'callId',
      sorter: (a, b) => a.callId.localeCompare(b.callId),
      width: '21%',
      Height: "40px"
    },
    {
      title: 'Timestamp',
      dataIndex: 'callDateTime',
      sorter: (a, b) => new Date(a.callDateTime) - new Date(b.callDateTime),
      width: '21%',
    },


    {
      title: 'Error Message',
      dataIndex: 'errorMessage',
      sorter: (a, b) => a.errorMessage.localeCompare(b.errorMessage),
      width: '43%',
    },



    {
      title: 'Action',
      dataIndex: 'action',
      render: () => <Button icon={<EllipsisOutlined style={{ transform: 'rotate(90deg)' }} />} />,
      width: '15%',
    },
  ];


  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const onSearch = (value) => {
    const filteredData = sampleData.filter((item) =>
      item.callId.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
    setCurrentPage(1);
  };

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const onRefresh = () => {
    setData(sampleData);
    setCurrentPage(1);
  };

  return (
    <div style={{ padding: '20px', marginTop: '34px', position: 'relative' }}>
      <div style={{ marginBottom: '10px' }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "8px" }}>
          <span className='error-logs'>Error Logs</span>
          <div className='search-filter' style={{ display: "flex", alignItems: "center" }}>
            <Button
              style={{ marginRight: '10px', color: "#073A34", fontWeight: "800" }}
              icon={<FontAwesomeIcon icon={faFilter} style={{ color: '#073A34', fontWeight: '600' }} />}
            >
              Filter
            </Button>

            <Input
              className='searchh'
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e.target.value)}
              style={{ maxWidth: 200 }}
              allowClear
            />
          </div>
        </div>
      </div>

      <div className="table-container" style={{
        overflowX: 'auto', // Allow horizontal scrolling
        position: 'relative',
      }}>
        <div style={{ marginLeft: '10px', marginBottom: '-30px', position: "absolute", zIndex: "1", }}>
          <Button
            style={{ border: 'none', width: "15px" }}
            icon={<ReloadOutlined />}
            onClick={onRefresh}
          />
        </div>
        <Table
          columns={columns}
          dataSource={paginatedData} // Use the paginated data here
          pagination={false} // Disable built-in pagination
          rowSelection={{ type: 'checkbox' }}
          // bordered
          rowClassName={() => 'white-row'}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <div>
          {/* <span>Row per page </span> */}
          {/* <Select
            defaultValue={10}
            style={{ width:"auto", marginLeft: '5px' }}
            onChange={(value) => setPageSize(value)}
          > */}
          {/* <Select.Option value={10}>10</Select.Option>
            <Select.Option value={20}>20</Select.Option>
            <Select.Option value={30}>30</Select.Option>
           */}
          {/* {generateOptions().map((value) => (
          <Select.Option key={value} value={value}>
            {value}
          </Select.Option>
        ))}
        </Select> */}
          <span style={{ marginLeft: '8px' }}>
            Total {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, data.length)} of {data.length}
          </span>
        </div>

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={onPageChange}
          showLessItems
          itemRender={(page, type, originalElement) => {
            if (type === 'prev') return <span>Prev</span>;
            if (type === 'next') return <span>Next</span>;
            return originalElement;
          }}
          className="custom-pagination"
          style={{ display: 'flex', alignItems: 'center' }}
        />
      </div>
    </div>
  );
};

export default Logs;
