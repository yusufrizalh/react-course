import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bulma/css/bulma.min.css";
import CourseList from "./pages/CourseList.js";
import CourseCreate from "./pages/CourseCreate.js";
import CourseEdit from "./pages/CourseEdit.js";
import UserList from "./pages/UserList.js";
import CourseChart from "./pages/CourseChart.js";

function App() {
  return (
    <Router>
      <div className="container p-2 is-max-widescreen">
        <div className="columns">
          <div className="column is-full">
            <Switch>
              <Route exact path="/">
                <CourseList />
              </Route>
              <Route exact path="/create">
                <CourseCreate />
              </Route>
              <Route exact path="/edit/:id">
                <CourseEdit />
              </Route>
              <Route exact path="/users">
                <UserList />
              </Route>
              <Route exact path="/chart">
                <CourseChart />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
