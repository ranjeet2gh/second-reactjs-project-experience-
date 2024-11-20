import React from "react";
import { useState } from "react";
import { Table, Button, Pagination, Select } from "antd";
import {
  EllipsisOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  ArrowLeftOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import "./call-detail-page.css";
import Avtar from "../../assets/1.jpg";
import AudioCard from "../audio-card/audio-card";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const sampleData = Array.from({ length: 100 }, (_, index) => ({
  key: index,
  cdtCode: Math.floor(1000 + Math.random() * 9000).toString(),
  dataPoint: index % 2 === 0 ? "Covered" : "Downgraded",
  value: index % 2 === 0 ? "True" : "False",
  notes: index % 2 === 0 ? "Metlife" : "Guardian",
}));

const CallDetailPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(sampleData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showFullTranscript, setShowFullTranscript] = useState(false);
  const location = useLocation();
  const calldata = location.state;
  const callData = calldata.rowData;
  // console.log("test",callData.rowData);
  // debugger
  if (!callData) {
    return <p>No call data available.</p>;
  }

  const toggleTranscriptView = () => {
    setShowFullTranscript(!showFullTranscript);
  };

  const handleBackToLogs = () => {
    navigate("/logs"); 
  };

  const columns = [
    {
      title: "CDT Code",
      dataIndex: "cdtCode",
      sorter: (a, b) => a.cdtCode.localeCompare(b.cdtCode),
      width: "20%",
    },
    {
      title: "Data Point",
      dataIndex: "dataPoint",
      sorter: (a, b) => a.dataPoint.localeCompare(b.dataPoint),
      width: "20%",
    },
    {
      title: "Value",
      dataIndex: "value",
      sorter: (a, b) => new Date(a.value) - new Date(b.value),
      width: "20%",
    },

    {
      title: "Notes",
      dataIndex: "notes",
      sorter: (a, b) => a.notes.localeCompare(b.notes),
      width: "33%",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Button
          icon={<EllipsisOutlined style={{ transform: "rotate(90deg)" }} />}
        />
      ),
      width: "21%",
    },
  ];

   
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // const onSearch = (value) => {
  //   const filteredData = sampleData.filter((item) =>
  //     item.cdtCode.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setData(filteredData);
  //   setCurrentPage(1);  
  // };

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const onRefresh = () => {
    setData(sampleData);
    setCurrentPage(1);  
  };

  const callDetails = {
    id: callData.callId,
    status: callData.callStatus,
    name: callData.patientName,
    phone: "987675787",
    practice: callData.practiceName,
    insurance: callData.insuranceCompany,
    duration: callData.callDuration,
    dateTime: callData.callDateTime,
    transcription: [
      {
        speaker: "AI",
        text: "Hi,   calling from Bright Smile Dentals. Can I please ask some questions regarding a patient's coverage?",
      },
      { speaker: "Insurance Representative", text: "Yes, go ahead" },
      { speaker: "AI", text: "My first question is" },
      {
        speaker: "AI",
        text: "Hi,   calling from Bright Smile Dentals. Can I please ask some questions regarding a patient's coverage?",
      },
      { speaker: "Insurance Representative", text: "Yes, go ahead" },
      { speaker: "AI", text: "My first question is" },
      {
        speaker: "AI",
        text: "Hi,   calling from Bright Smile Dentals. Can I please ask some questions regarding a patient's coverage?",
      },
      { speaker: "Insurance Representative", text: "Yes, go ahead" },
      { speaker: "AI", text: "My first question is" },
      {
        speaker: "AI",
        text: "Hi,   calling from Bright Smile Dentals. Can I please ask some questions regarding a patient's coverage?",
      },
      { speaker: "Insurance Representative", text: "Yes, go ahead" },
      { speaker: "AI", text: "My first question is" },
    ],
  };

  return (
    <div>
      <div className="call-detail-page">
        
        <div className="call-header">
          <Button
            onClick={handleBackToLogs}
            icon={<ArrowLeftOutlined />}
            shape="circle"
          />
          <span className="header-title">Logs &gt; {callDetails.id} </span>
          <span
            className="call-status"
            style={{
              color:
                callDetails.status === "Complete"
                  ? "green"
                  : callDetails.status === "In Progress"
                  ? "blue"
                  : "red",
            }}
          >
            {callDetails.status}
          </span>
        </div>

       
        <div className="call-info-section">
          <div className="caller-info">
            {/* <div className="caller-avatar" style={{ alignSelf: "self-start" }}>
              <img src={Avtar} alt="caller-avatar" />
            </div> */}
             <div
              className="customer-avatar caller-avatar"
              style={{ backgroundColor:"gray", width:"30px",height:"30px",fontSize:"x-large",  }}
            >
              {callDetails.name.charAt(0)}
            </div>
            <div className="caller-details">
              <h5>{callDetails.name}</h5>
              <p>
                {" "}
                <i className="bi bi-telephone-fill pe-2 text-secondary"></i>
                {callDetails.phone}
              </p>
            </div>
            <div className="call-datetime">
              <p>{callDetails.dateTime}</p>
            </div>
          </div>

         
          <div className="call-details-row">
            <span>
              <strong>Practice Name:</strong> {callDetails.practice}
            </span>
             
            <span>
              <strong>Insurance Company:</strong> {callDetails.insurance}
            </span>
            <span>
              <strong>Call Duration (min):</strong> {callDetails.duration}
            </span>
          </div>

          
          <div className="audio-player">
            <AudioCard />
          </div>

          <div className="transcription">
            <div style={{ display: "flex" }}>
              {showFullTranscript ? (
                <Button
                  icon={<UpOutlined />}
                  onClick={toggleTranscriptView}
                  style={{ marginBottom: "10px", border: "none" }}
                >
                  {" "}
                </Button>
              ) : (
                <Button
                  icon={<DownOutlined />}
                  onClick={toggleTranscriptView}
                  style={{ marginBottom: "10px", border: "none" }}
                >
                  {" "}
                </Button>
              )}
              <h4>Transcription</h4>
            </div>
            <div
              className={`transcription-window ${
                showFullTranscript ? "full" : "fixed"
              }`}
            >
              {callDetails.transcription.map((line, index) => (
                <p key={index}>
                  <strong>{line.speaker}:</strong> {line.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      

      <div
        className="data-extracted"
        style={{ padding: "20px", marginTop: "10px",position:'relative' }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            alignItems:"center"
          }}
        >
          <div className="item1" >
            Data Extracted from the Call
          </div>
          <div>
            {" "}
            <button className="item2"
              // style={{
              //   background: "#00796B",
              //   color: "white",
              //   border: "none",
              //   borderRadius: "4px",
              //   padding: "4px",
              //   maxWidth: "168px",
              //   maxHeight: "34px",
              // }}
            >
              {" "}
              Send to PM System{" "}
            </button>{" "}
          </div>
        </div>
        <div></div>
        <div className="table-container" style={{
        overflowX: 'auto', // Allow horizontal scrolling
        position: 'relative',
      }}>
        <div
          style={{
            marginLeft: "10px",
            marginBottom: "-30px",
            position: "absolute",
            zIndex: "1",
          }}
        >
          <Button
            style={{ border: "none", width: "15px" }}
            icon={<ReloadOutlined />}
            onClick={onRefresh}
          />
        </div>
        <Table
          columns={columns}
          dataSource={paginatedData}  
          pagination={false} 
          rowSelection={{ type: "checkbox" }}
          // bordered
          rowClassName={() => "white-row"}
        />
 </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
           <div>
          
            <span style={{ marginLeft: "10px" }}>
              Total {(currentPage - 1) * pageSize + 1}-
              {Math.min(currentPage * pageSize, data.length)} of {data.length}
            </span>
          </div> 

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data.length}
            onChange={onPageChange}
            showLessItems
            itemRender={(page, type, originalElement) => {
              if (type === "prev") return <span>Prev</span>;
              if (type === "next") return <span>Next</span>;
              return originalElement;
            }}
            className="custom-pagination"
            style={{ display: "flex", alignItems: "center" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CallDetailPage;
