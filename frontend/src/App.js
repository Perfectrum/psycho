import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BoardPanel, GoalPanel, MatrixPanel, Main } from './pages/Main';
import { Create } from './pages/Create';
import { Goals } from './pages/Goals';

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Test } from './pages/Test';
import { CardCreator } from './pages/compontents/CardCreator';
import { GoalCreator } from './pages/compontents/GoalCreator';
import { InboxField } from './pages/compontents/InboxField';

function App() {

  console.log("APP RERENDERERD")
  return (
      <Routes>
        <Route path='create' element={(<Create />)}>
          <Route index element={(<Navigate to='task' redirect />)} />
          <Route path='task' element={(<CardCreator />)} />
          <Route path='goal' element={(<GoalCreator />)} />
        </Route>
        <Route path='main' element={(<Main />)}>
          <Route index element={(<Navigate to='board' redirect />)} />
          <Route path='board' element={(<BoardPanel />)} />
          <Route path='goals' element={(<GoalPanel />)} />
          <Route path='matrix' element={(<MatrixPanel />)} />
          <Route path='inbox' element ={(<InboxField />)} />
        </Route>
        <Route index element={(<Login />)}></Route>
        <Route path='register' element={(<Register />)}></Route>
        <Route path='test' element={(<Test />)}></Route>
      </Routes>
  );
}

export default App;
