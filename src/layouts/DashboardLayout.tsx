// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// export default function DashboardLayout() {
//   return (
//     <div className="layout">
       


//       <Sidebar />

//       <div className="main-content">
//         <Header />

//         <main className="content">
//           <Outlet />
//         </main>
//       </div>

//       <style>{`
//         *{
//           margin:0;
//           padding:0;
//           box-sizing:border-box;
//         }

//         .layout{
//           display:flex;
//           min-height:100vh;
//           background:#f5f7fb;
//         }

//         .sidebar{
//           width:260px;
//           background:#111827;
//           color:white;
//           padding:24px;
//         }

//         .logo{
//           margin-bottom:40px;
//         }

//         .logo h2{
//           color:white;
//         }

//         .sidebar nav{
//           display:flex;
//           flex-direction:column;
//           gap:12px;
//         }

//         .sidebar a{
//           color:#cbd5e1;
//           text-decoration:none;
//           padding:12px;
//           border-radius:8px;
//           transition:.2s;
//         }

//         .sidebar a:hover{
//           background:#1f2937;
//         }

//         .sidebar a.active{
//           background:#4f46e5;
//           color:white;
//         }

//         .main-content{
//           flex:1;
//           display:flex;
//           flex-direction:column;
//         }

//         .header{
//           height:70px;
//           background:white;
//           border-bottom:1px solid #e5e7eb;
//           display:flex;
//           align-items:center;
//           justify-content:space-between;
//           padding:0 24px;
//         }

//         .user-info{
//           font-weight:500;
//         }

//         .content{
//           padding:24px;
//         }
//       `}</style>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout() {
  return (
    <>
      <div className="tms-layout">
        <Sidebar />

        <div className="tms-main">
          <Header />

          <main className="tms-content">
            <Outlet />
          </main>
        </div>
      </div>

      <style>{`
        *,
        *::before,
        *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          background: #F8FAFC;
          color: #0F172A;
        }

        .tms-layout {
          display: flex;
          min-height: 100vh;
          background: #F8FAFC;
        }

        .tms-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
        }

        .tms-content {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
        }

        /* Scrollbar styling */
        .tms-content::-webkit-scrollbar {
          width: 5px;
        }

        .tms-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .tms-content::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 10px;
        }

        .tms-content::-webkit-scrollbar-thumb:hover {
          background: #94A3B8;
        }
      `}</style>
    </>
  );
}