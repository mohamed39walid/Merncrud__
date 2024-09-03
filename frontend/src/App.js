import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from './Component/Home';
import Adduser from './Component/Adduser';
import Updateuser from './Component/Updateuser';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/adduser' element={<Adduser/>}/>
      <Route path='/updateuser/:id' element={<Updateuser/>}/>
    </Routes>
  );
}

export default App;
