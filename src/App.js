import "./App.css";
import "./Header.js";
import "antd/dist/antd.css";
import Header from "./Header.js";
import { Route, Switch } from "react-router-dom";
import MainPage from "./main-page";
import FeedPage from "./feed-page/index.js";
import Gallery from "./gallery-page";
import LoginPage from "./login-page";
import MapComponent from "./feed-page/map";
function App() {
  return (
    <Switch>
      <Route exact={true} path="/p/:code">
        <Gallery />
      </Route>
      <Route>
        <div>
          <div id="header">
            <Header />
          </div>
          <div id="body">
            <Switch>
              <Route exact={true} path="/">
                <MainPage />
              </Route>
              <Route exact={true} path="/feed">
                <FeedPage />
              </Route>
              <Route exact={true} path="/test">
                <MapComponent />
              </Route>
              <Route exact={true} path="/login">
                <LoginPage></LoginPage>
              </Route>
            </Switch>
          </div>
          <div id="footer"></div>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
