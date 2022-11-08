import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Main } from './pages/Main';

import {
  Routes,
  Route
} from "react-router-dom";
import { Test } from './pages/Test';

function App() {

  console.log("APP RERENDERERD")
  return (
      <Routes>
        <Route path='/main' element={(<Main />)}></Route>
        <Route path='/' element={(<Login />)}></Route>
        <Route path='/register' element={(<Register />)}></Route>
        <Route path='/test' element={(<Test />)}></Route>
      </Routes>
  );
}

export default App;
