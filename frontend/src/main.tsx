import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

const link = createHttpLink({
  uri: import.meta.env.VITE_API_URL + "/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  name: "watch-time-client",
  version: "0.1",
  link,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
