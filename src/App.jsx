
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import Login from './pages/auth/Login'
import Registration from './pages/auth/Registration';
import Layout from './pages/Layout';
import Home from './pages/Home';
import AddEmployee from './pages/AddEmployee';
import NotFound from './pages/NotFound';
// import CreateAccount from './pages/CreateAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes >
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='addemployee' element={<AddEmployee/>}/>
          </Route>
          <Route>
          {/* <Route path='createaccount' element={<CreateAccount/>}/> */}
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Registration/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
