import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BoardPanel, GoalPanel, Matrixpanel, Main } from './pages/Main';
import { Create } from './pages/Create';
import { Goals } from './pages/Goals';

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Test } from './pages/Test';

function App() {

  console.log("APP RERENDERERD")
  return (
      <Routes>
        <Route path='create' element={(<Create />)}></Route>
        <Route path='main' element={(<Main />)}>
          <Route index element={(<Navigate to='board' redirect />)} />
          <Route path='board' element={(<BoardPanel />)} />
          <Route path='goals' element={(<GoalPanel />)} />
          <Route path='matrix' element={(<Matrixpanel />)} />
          <Route path='inbox' element ={<div>Здесь будет Inbox</div>} />
          <Route path='tasks' element ={<div>Здесь будут Задачи</div>} />
        </Route>
        <Route index element={(<Login />)}></Route>
        <Route path='register' element={(<Register />)}></Route>
        <Route path='test' element={(<Test />)}></Route>
      </Routes>
  );
}

export default App;
