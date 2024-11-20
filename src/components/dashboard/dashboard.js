import React ,{useState, useEffect}from 'react'
import './dashboard.css'
// import { FaPhone, FaUsers, FaUsersSlash } from 'react-icons/fa';
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import AreaChartComponent from '../charts/AreaChart';
import BarChartComponent from '../charts/BarChartComponent';
import PieChartComponent from '../charts/PieChartComponent';
import RecentlyVerifiedCustomer from '../charts/RecentlyVerifiedCustomer';
import users from '../../assets/users.png'
import unusers from '../../assets/Unverfied.svg'
import {
  fetchTotalNewCustomers,
  fetchTodayTotalCalls,
  fetchUnverifiedCustomers,
} from '../../services/APIs.js';
const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    totalnewCustomers: null,
    todayCalls: null,
    unverifiedCust: null,
  });
  //console.log(dashboardData.todayCalls);
 // debugger
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          totalNewCustomersResponse,
          todayTotalCallsResponse,
          unverifiedCustomers,
        ] = await Promise.all([
          fetchTotalNewCustomers(),
          fetchTodayTotalCalls(),
          fetchUnverifiedCustomers(),
        ]);
        // console.log(totalNewCustomersResponse.data.data);
        // debugger
        setDashboardData({
          totalnewCustomers: totalNewCustomersResponse.data.data.total_new_customers_today,
          todayCalls: todayTotalCallsResponse.data.data.total_calls_today,
          unverifiedCust: unverifiedCustomers.data.data.unverified_customers,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="header" >
      <div className='welcome'>Welcome To InsureTalk</div>
      <div className='cards-container'>
        <div className="stats-card">
          <div className="card-icon">
          <i className="bi bi-telephone-fill" style={{color:"#00796B",width:"18" ,height:"18"}} ></i>
           
          </div>

          <div className="card-content">
            <div>
              <div className="card-title">Total Calls per day </div>
              <div className="card-value">{dashboardData.todayCalls}</div>
            </div>
            <div>
              <div className="card-footer">
                <span className="card-subtitle">vs Last Year</span>
                <span className="card-percentage">
                  < BsGraphUpArrow  style={{verticalAlign:"text-top"}} /> 50%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="stats-card">
          <div className="card-icon">
          <img src= {users} alt="Icon" width="20" height="20"></img>
          </div>

          <div className="card-content">
            <div>
              <div className="card-title">Total Customers </div>
              <div className="card-value">{dashboardData.totalnewCustomers}</div>
            </div>
            <div>
              <div className="card-footer">
                <span className="card-subtitle">vs Last Year</span>
                <span className="card-percentage" style={{color:"red"}}>
                  <BsGraphDownArrow style={{verticalAlign:"text-top"}} /> 50%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="stats-card">
          <div className="card-icon">
          <img src= {unusers} alt="Icon" width="25" height="25"></img>
          </div>

          <div className="card-content">
            <div>
              <div className="card-title"> Unverified Customers </div>
              <div className="card-value">{dashboardData.unverifiedCust}</div>
            </div>
            <div>
              <div className="card-footer">
                <span className="card-subtitle">vs Last Year</span>
                <span className="card-percentage">
                  < BsGraphUpArrow style={{verticalAlign:"text-top"}} /> 50%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
     <div className='area-rvc'>
      <div className='areachart' >
        <AreaChartComponent/>     
      </div>
      <div className='rcv'>
        <RecentlyVerifiedCustomer/>
      </div>
      </div>
     <div className='lowerchart'   >
        <div className='barchart'>
        <BarChartComponent/>
        </div>
        <div className='piechart'>
        <PieChartComponent/>
        </div>
      </div>






    </div>
  )
}

export default Dashboard