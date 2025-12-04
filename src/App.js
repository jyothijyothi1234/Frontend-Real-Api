import React from "react";
import DataFetch from "./pages/dataFetching";
import UserList from "./components/userList";


function App() {
  return (
    <div className="App">
      <DataFetch>
        <UserList   />
      </DataFetch>
    </div>
  );
}

export default App;
