import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import type { RootState, AppDispatch } from "./store.ts";
import ClientContainer from "../components/client/client.tsx";
import {
  fetchClientsData,
  addClient,
} from "../components/client/clientSlice.ts";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clients } = useSelector((state: RootState) => state.clients);
  const [clientsFetchedState, setClientsFetchedState] = useState(false);
  const [clientsState, setClientsState] = useState([]);

  useEffect(() => {
    if (!clientsFetchedState) {
      dispatch(fetchClientsData());
      setClientsFetchedState(true);
    }
    setClientsState(clients);
  }, [dispatch, clientsFetchedState, clients]);

  const addNewClientHandler = () => {
    const randomClientNumber = Math.floor(Math.random() * 100 + 1);
    dispatch(addClient(randomClientNumber));
  };
  const searchClient = (event) => {
    const result = clients.filter((client) =>
      client.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setClientsState(result);
  };
  return (
    <div className="app">
      <div className="header-container">
        <button className="add-client" onClick={addNewClientHandler}>
          New client
        </button>
        <input
          className="search-client"
          name="search"
          placeholder="Search client"
          onChange={searchClient}
        />
      </div>
      {clientsState &&
        clientsState.map((client) => (
          <ClientContainer key={client.name} client={client}></ClientContainer>
        ))}
      <div className="app__no-matches">
        {clientsState.length === 0 && "No matches"}
      </div>
    </div>
  );
};

export default App;
