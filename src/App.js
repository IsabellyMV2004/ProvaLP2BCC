import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import BatePapo from './components/BatePapo';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/bate-papo" component={BatePapo} />
        <Route path="/" exact component={LoginForm} />
      </Switch>
    </Router>
  );
}

export default App;
