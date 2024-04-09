import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import type { RootState, AppDispatch } from "./store.ts";
import ClientContainer from "../components/client/client.tsx";
import {
  IClient,
  fetchClientsData,
  postNewClientData,
  clearError,
} from "../components/client/clientSlice.ts";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clients, status, error } = useSelector(
    (state: RootState) => state.clients
  );
  const [clientsFetchedState, setClientsFetchedState] =
    useState<boolean>(false);
  const [clientsState, setClientsState] = useState<IClient[]>([]);

  useEffect(() => {
    if (!clientsFetchedState) {
      dispatch(fetchClientsData());
      setClientsFetchedState(true);
    }
    setClientsState(clients);
  }, [dispatch, clientsFetchedState, clients]);

  const cleanErrorHandler = () => {
    dispatch(clearError());
  };

  const addNewClientHandler = () => {
    const randomClientNumber: number = Math.floor(Math.random() * 100 + 1);
    const randomClient: IClient = {
      name: `Client #${randomClientNumber}`,
      reports: [],
    };
    dispatch(postNewClientData(randomClient));
  };

  const searchClient = (event: any) => {
    const result: IClient[] = clients.filter((client) =>
      client.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setClientsState(result);
  };

  return (
    <div className="app">
      {status === "failed" && (
        <div className="app__error">
          Error: {error}
          <button className="clean-error" onClick={cleanErrorHandler}>
            ✖
          </button>
        </div>
      )}
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
      {clientsState.length === 0 && status !== "loading" && (
        <div className="app__no-matches">No matches</div>
      )}
      {status === "loading" && <div className="app__loading">Loading...</div>}
    </div>
  );
};

export default App;
