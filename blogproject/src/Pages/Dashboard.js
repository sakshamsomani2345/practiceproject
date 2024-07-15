import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import Dashposts from '../components/Dashposts';
import DashUsers from '../components/DashUsers';
import DashboardComp from '../components/DashboardComp';

function Dashboard() {
    const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  console.log(tab);
  return (
    <div className='dashboard'>
      <DashSidebar/>
      {tab==='dash' && <DashboardComp/>}

      {tab==='profile' && <DashProfile/>}
      {tab==='posts' && <Dashposts/>}
      {tab==='users' && <DashUsers/>}

      
    </div>
  )
}

export default Dashboard
