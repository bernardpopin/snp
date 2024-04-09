import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchClientsData = createAsyncThunk(
  "client/fetchClientsData",
  async () => {
    const response = await fetch("http://localhost:4000/clients/");
    const jsonData = await response.json();
    return jsonData;
  }
);

export const postNewClientData = createAsyncThunk(
  "client/postNewClientData",
  async (data) => {
    const response = await fetch("http://localhost:4000/clients/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const jsonData = await response.json();
    return jsonData;
  }
);

export const deleteClientData = createAsyncThunk(
  "client/deleteClientData",
  async (data) => {
    const response = await fetch(`http://localhost:4000/clients/${data}`, {
      method: "DELETE",
    });
    const jsonData = await response.json();
    return jsonData;
  }
);

export const updateReport = createAsyncThunk(
  "client/updateReport",
  async (data) => {
    const response = await fetch(`http://localhost:4000/clients/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const jsonData = await response.json();
    return jsonData;
  }
);

export interface ClientState {
  clients: Array<object>;
}

const initialState: ClientState = {
  clients: [],
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClientsData.fulfilled, (state, action) => {
      state.clients.push(...action.payload);
    });
    builder.addCase(postNewClientData.fulfilled, (state, action) => {
      state.clients.push(action.payload);
    });
    builder.addCase(deleteClientData.fulfilled, (state, action) => {
      const clientIndex = state.clients.findIndex(
        (el) => el.id === action.payload
      );
      state.clients.splice(clientIndex, 1);
    });
    builder.addCase(updateReport.fulfilled, (state, action) => {
      const clientIndex = state.clients.findIndex(
        (el) => el.id === action.payload.id
      );
      state.clients[clientIndex] = action.payload;
    });
  },
});

export const {} = clientSlice.actions;

export default clientSlice.reducer;
