import Todo from './Components/Todo/Todo';
import classes from './App.module.scss';

function App() {
  return (
    <div className={`${classes.App} App`}>
      <Todo />
    </div>
  );
}

export default App;
