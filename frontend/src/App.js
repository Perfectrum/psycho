import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BoardPanel, GoalPanel, Main } from './pages/Main';
import { Create } from './pages/Create';
import { Goals } from './pages/Goals';

import {
  Routes,
  Route
} from "react-router-dom";
import { Test } from './pages/Test';

function App() {

  console.log("APP RERENDERERD")
  return (
      <Routes>
        <Route path='create' element={(<Create />)}></Route>
        <Route path='main' element={(<Main />)}>
          <Route path='board' element={(<BoardPanel />)} />
          <Route path='goals' element={(<GoalPanel />)} />
        </Route>
        <Route index element={(<Login />)}></Route>
        <Route path='register' element={(<Register />)}></Route>
        <Route path='test' element={(<Test />)}></Route>
      </Routes>
  );
}

export default App;
