import "./App.css";
import Home from "./components/home/Home";
import { useState } from "react";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [isLogged, setLogged] = useState(false);
  return (
    <Router>
      <div className="App">
        {isLogged ? (
          <Route exact path="/" component={Home} />
        ) : (
          <Route exact path="/" component={() => <Login setLogged={setLogged}/> } />
        )}

        <Route exact path="/registro" component={Register} />
      </div>
    </Router>
  );
}

export default App;
