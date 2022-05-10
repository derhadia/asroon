import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Users from "./pages/users";
import InsertEdit from "./pages/users/InsertEdit";

function App() {
  return (
    <div className="App gray">
      <Router>
          <div>
              <Switch>
                  <Route exact path='/' component={Users} />
                  <Route path='/edit/:id' component={InsertEdit} />
                  <Route path='/add' component={InsertEdit} />
              </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;
