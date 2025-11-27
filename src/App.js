import React from "react";
import UserList from "./component/UserList";
import DataFetch from "./context/DataFetch";

function App() {
  return (
    <div className="App">
      <DataFetch>
        <UserList />
      </DataFetch>
    </div>
  );
}

export default App;
