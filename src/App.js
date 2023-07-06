import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export class App extends Component {
  state = {
    progress: 0,
  };
  apiKey = process.env.REACT_APP_NEWS_API;
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <BrowserRouter>
        <Navbar />

        <LoadingBar
          color="#f11946"
          progress={this.state.progress}
          onLoaderFinished={() => this.setProgress(0)}
        />

        <Routes>
          <Route
            exact
            path="/general"
            element={
              <News
                setProgress={this.setProgress}
                key="general"
                category="general"
                country="us"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={this.setProgress}
                key="sports"
                category="sports"
                country="us"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={this.setProgress}
                key="health"
                category="health"
                country="us"
              />
            }
          />
          <Route
            exact
            path="/tecnology"
            element={
              <News
                setProgress={this.setProgress}
                key="technology"
                category="spotecnologyrts"
                country="us"
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={this.setProgress}
                key="business"
                category=" business"
                country="us"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={this.setProgress}
                key="science"
                category="tecnology"
                country="us"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={this.setProgress}
                key="entertainment"
                category="entertainment"
                country="in"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
