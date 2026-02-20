import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/routes'

import "@fontsource/el-messiri/400.css";
import "@fontsource/el-messiri/500.css";
import "@fontsource/el-messiri/600.css";
import "@fontsource/el-messiri/700.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App