import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Toaster } from 'react-hot-toast';
import './App.css'
import Auth from './components/Auth';

function App() {
  

  return (
    <>
      <div><Toaster/></div>
        <BrowserRouter>
          <Routes>
            <Route
            path='/signup'
            element={<SignUp/>}
            />
            <Route
            path='/signin'
            element={<Login/>}
            />
            <Route
            path='/'
            element={<Auth><Home/></Auth>}
            />

          </Routes>
        </BrowserRouter>
    </>)
}

export default App
