import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import goldtoiletpaper from "../src/images/backgroundv3.jpg";
import Header from "./components/Header/header.js";
import Nav from "./components/Nav/nav.js";
import Main from "./components/Main/main.js";
import Footer from "./components/Footer/footer";
import LogInForm from "./components/Forms/LogInForm";
import SignUpForm from "./components/Forms/SignUpForm";
import SingleRestroom from "./components/SingleRestroom/singleRestroom";
import NoMatch from './pages/NoMatch';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Header name="Gotta Go?" />
          <Nav />
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/login" element={<LogInForm />} />
            <Route exact path="/signup" element={<SignUpForm />} />
            <Route exact path="/restroom/:name" element={<SingleRestroom />} />

            <Route path="*" element={<NoMatch />} />
          </Routes>
          <Footer year={new Date().getFullYear()} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
