import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/common/Header";
import NoPage from './components/common/NoPage';
import RequireAuth from "./components/common/RequireAuth"

import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import History from "./pages/History"

import axios from "axios";
import axiosInstance from "./API/axios";
import localforage from "localforage";

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CustomTheme from "./assets/themes/CustomTheme";

axios.defaults.baseURL = "http://127.0.0.1:8000";
axiosInstance.defaults.baseURL = "http://127.0.0.1:8000";


localforage.config({
  name: 'Diagnosis-DB',
  version: 1.0,
  storeName: 'token_values',
  description: 'JWT Tokens required to interact with the server.'
});


function App() {
  return (
    <div>
      <ThemeProvider theme={CustomTheme}>
      <CssBaseline />
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/dashboard" element={<RequireAuth clearence={"admin"}> <Dashboard /> </RequireAuth>}></Route>
            <Route exact path="/history" element={<RequireAuth clearence={"admin"}> <History /> </RequireAuth>}></Route>
            <Route path="*" element={<NoPage />}></Route>
          </Routes>
        </Router>

      </ThemeProvider>
    </div>
  );
}

export default App;
