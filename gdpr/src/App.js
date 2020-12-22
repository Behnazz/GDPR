import "./App.css";
import GDPRTable from "./Components/Table";
import FineDetails from "./Components/FineDetails";
import AddFineForm from "./Components/AddFineForm";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/fine-details/:id">
            <FineDetails />
          </Route>
          <Route path="/add-fine">
            <AddFineForm />
          </Route>
          <Route path="/">
            <GDPRTable />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
