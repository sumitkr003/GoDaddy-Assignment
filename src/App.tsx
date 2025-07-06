import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

const RepoList = React.lazy(() => import("./pages/RepositoryList"));

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<RepoList />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
