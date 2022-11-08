import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Main } from './pages/Main';

import {
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
      <Routes>
        <Route path='/main' element={(<Main />)}></Route>
        <Route path='/' element={(<Login />)}></Route>
        <Route path='/register' element={(<Register />)}></Route>
      </Routes>
  );
}

export default App;
