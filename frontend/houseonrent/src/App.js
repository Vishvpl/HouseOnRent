import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Visit from './components/Visit';
import Housestate from './contexts/Housestate';
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import Visitstate from './contexts/Visitstate';
import Login from './components/Login';
import Signup from './components/Signup';
import Myhouses from './components/Myhouses';


function App() {
  
  return (
    <>
    <Router>
    <Housestate>
    {/* <Navbar/> */}
    <Visitstate>
      <Routes>
    <Route exact path='/' element={[<Navbar/>,<Home/>]}/>
    <Route exact path='/login' element={[<Navbar/>,<Login/>]}/>
    <Route exact path='/signup' element={[<Navbar/>,<Signup/>]}/>
    <Route exact path='/myhouses' element={[<Navbar/>,<Myhouses/>]}/>
    <Route exact path='/schedulevisit' element={[<Navbar/>,<Visit/>]}/>
    </Routes>
    </Visitstate>
    </Housestate>
    </Router>
    </>
  );
}

export default App;
