import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login'
import Registration from './pages/auth/Registration';
import Layout from './pages/Layout';
import Home from './pages/Home';
import AddEmployee from './pages/AddEmployee';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes >
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='addemployee' element={<AddEmployee/>}/>
          </Route>
          <Route path='*' element={<NotFound/>}/>
          <Route>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Registration/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
