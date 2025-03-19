import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
// import Layout from './components/employee1_dashboard/layout/Layout'; // ✅ Correct

import AppRoutes from './routes';
import './App.css';



const AppContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <AppRoutes />;
  }

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

<Router>
      <Router path="/" element={<h1>Hello from Routes</h1>} />
    </Router>



function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
// import Attendance from './components/attendance/Attendance';
// import Layout from './components/layout/Layout';

// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<h1>Home Page Working!</h1>} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/attendance" element={<Attendance />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;
