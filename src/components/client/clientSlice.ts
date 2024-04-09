import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface IData {
  name: string;
  data: {
    label: string;
    data: {
      primary: string;
      likes: number;
    }[];
  }[];
}
export interface IReport {
  name: string;
  list: IData[];
}

export interface IClient {
  name: string;
  reports: IReport[];
  id?: string;
}

export interface IClients {
  clients: IClient[];
  status: string | undefined;
  error: string | undefined;
}

const initialState: IClients = {
  clients: [],
  status: undefined,
  error: undefined,
};

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
  async (data: IClient) => {
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
  async (data: string) => {
    const response = await fetch(`http://localhost:4000/clients/${data}`, {
      method: "DELETE",
    });
    const jsonData = await response.json();
    return jsonData;
  }
);

export const updateReport = createAsyncThunk(
  "client/updateReport",
  async (data: IClient) => {
    const response = await fetch(`http://localhost:4000/clients/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const jsonData = await response.json();
    return jsonData;
  }
);

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    clearError(state) {
      state.status = undefined;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients.push(...action.payload);
      })
      .addCase(fetchClientsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(postNewClientData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients.push(action.payload);
      })
      .addCase(postNewClientData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(deleteClientData.fulfilled, (state, action) => {
        const clientIndex = state.clients.findIndex(
          (el) => el.id === action.payload
        );
        state.status = "succeeded";
        state.clients.splice(clientIndex, 1);
      })
      .addCase(deleteClientData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(updateReport.fulfilled, (state, action) => {
        const clientIndex = state.clients.findIndex(
          (el) => el.id === action.payload.id
        );
        state.status = "succeeded";
        state.clients[clientIndex] = action.payload;
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearError } = clientSlice.actions;

export default clientSlice.reducer;
