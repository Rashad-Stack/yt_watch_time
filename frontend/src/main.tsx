import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import AuthProvider from "./context/authcontext.tsx";
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
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </ApolloProvider>
  </React.StrictMode>,
);
