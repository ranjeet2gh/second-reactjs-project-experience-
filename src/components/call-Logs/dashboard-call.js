import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Pagination, Select } from 'antd';
import { SearchOutlined, EllipsisOutlined, ReloadOutlined } from '@ant-design/icons';
import './dashboard-call.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { CallLogs } from '../../services/APIs';

const CallDashboard = () => {
  const [allData, setAllData] = useState([]);  
  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await CallLogs();
       // console.log(response.data.data);
        
        
        const mappedData = response.data.data.map((item, index) => ({
          key: index,  
          patientName: item.patient_name || 'N/A',
          callDateTime: item.call_date_time || 'N/A',
          callId: item.call_id || 'N/A',
          practiceName: item.practice_name || 'N/A',
          insuranceCompany: item.insurance_company || 'N/A',
          callDuration: (item.call_duration_seconds)/60 || 'N/A',
          callStatus:  item.call_status === 0 ? 'Failed' : item.call_status === 1 ? 'In Progress' : item.call_status === 2 ? 'Complete' : 'N/A',
        }));

        setAllData(mappedData);
        setData(mappedData);
      } catch (err) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
       
    };

    getData();
  }, []);

  const columns = [
    
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
      sorter: (a, b) => a.patientName.localeCompare(b.patientName),
    },
    {
      title: 'Call Date & Time',
      dataIndex: 'callDateTime',
      sorter: (a, b) => new Date(a.callDateTime) - new Date(b.callDateTime),
    },
    {
      title: 'Call ID',
      dataIndex: 'callId',
      sorter: (a, b) => a.callId.localeCompare(b.callId),
    },
    {
      title: 'Practice Name',
      dataIndex: 'practiceName',
      sorter: (a, b) => a.practiceName.localeCompare(b.practiceName),
    },
    {
      title: 'Insurance Company',
      dataIndex: 'insuranceCompany',
      sorter: (a, b) => a.insuranceCompany.localeCompare(b.insuranceCompany),
    },
    {
      title: 'Call Duration(min)',
      dataIndex: 'callDuration',
      sorter: (a, b) => {
        const durationA = parseInt(a.callDuration) || 0;
        const durationB = parseInt(b.callDuration) || 0;
        return durationA - durationB;
      },
      width:"10%"
    },
    {
      title: 'Call Status',
      dataIndex: 'callStatus',
      render: (status) => (
        <span
          style={{
            color:
              status === 'Complete'
                ? 'green'
                : status === 'In Progress'
                ? 'blue'
                : 'red',
          }}
        >
          {status}
        </span>
      ),
      sorter: (a, b) => a.callStatus.localeCompare(b.callStatus),
      width:"10%"
    },
    {
      title: 'Retry Call',
      dataIndex: 'retryCall',
      render: (text, record) => (
        <Button
          disabled={record.callStatus === 'In Progress' || record.callStatus === 'N/A'}
          style={{
            borderColor:
             ( record.callStatus === 'In Progress'|| record.callStatus === 'N/A') ? '#B2B2B21F' : '#00796B',
            color:
            ( record.callStatus === 'In Progress'|| record.callStatus === 'N/A') ? 'gray' : '#00796B',
          }}
        >
          Retry Call
        </Button>
      ),
      sorter: (a, b) => a.callStatus.localeCompare(b.callStatus),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: () => <Button icon={<EllipsisOutlined style={{ transform: 'rotate(90deg)' }} />} />,
    },
  ];

  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const onSearch = (value) => {
    const filteredData = allData.filter((item) =>
      item.patientName.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
    setCurrentPage(1);
  };

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const onRefresh = () => {
    setData(allData);
    setCurrentPage(1);
  };
  
   
  const onRowClick = (record) => {
    if(record.callId !== "N/A"){
    navigate(`/page-details/${record.callId}`, { state: { rowData: record } });
    }
  };

   
  if (loading) {
    return <div style={{ padding: '20px', marginTop: '44px' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', marginTop: '44px', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px', marginTop: '34px', position: 'relative' }}>
      <div style={{ marginBottom: '10px' }}>
  <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "8px" }}>
    <h3 style={{ fontWeight: '500' }}>Logs</h3>
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
      overflowX: 'auto',  
      position: 'relative',
    }}>
      <div  style={{ marginLeft: '15px', marginBottom:'-30px',position:"absolute",zIndex:"1", }}>
        <Button
          style={{ border: 'none',width:'0px' }}
          icon={<ReloadOutlined />}
          onClick={onRefresh}
        />
      </div>
      
      <Table
        columns={columns}
        dataSource={paginatedData}
        pagination={false} 
        rowSelection={{ type: 'checkbox' }}
        // bordered
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
        rowClassName={() => 'white-row'}
      />
  </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <div>
          {/* <span>Rows per page </span>
          <Select
            value={pageSize}
            style={{ width: 'auto', marginLeft: '5px' }}
            onChange={(value) => {
              setPageSize(value);
              setCurrentPage(1);
            }}
          >
            {generateOptions().map((value) => (
              <Select.Option key={value} value={value}>
                {value}
              </Select.Option>
            ))}
          </Select> */}
          <span style={{ marginLeft: '8px' }}>
            Total {Math.min(currentPage * pageSize, data.length) === 0 ? 0 : (currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, data.length)} of {data.length}
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

export default CallDashboard;
