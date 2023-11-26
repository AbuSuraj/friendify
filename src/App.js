 import './App.scss';
import Login from './login/Login';
import Home from './Home/Home';
import Register from './register/Register';

function App() {
  return (
    <div className="App">
    <Home/>
     {/* <Login/> */}
     <Register/>
    </div>
  );
}

export default App;
