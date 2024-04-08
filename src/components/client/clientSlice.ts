import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const fetchClientsData = createAsyncThunk(
  "client/fetchClientsData",
  async () => {
    const response = await fetch("http://localhost:4000/clients/");
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
  reducers: {
    addClient: (state, action: PayloadAction<object>) => {
      const randomClient = {
        name: `Client #${action.payload}`,
        reports: [],
      };
      state.clients.push(randomClient);
    },
    removeClient: (state, action: PayloadAction<object>) => {
      const clientIndex = state.clients.findIndex(
        (el) => el.name === action.payload
      );
      state.clients.splice(clientIndex, 1);
    },
    removeReport: (state, action: PayloadAction<object>) => {
      const clientIndex = state.clients.findIndex(
        (el) => el.name === action.payload.clientName
      );
      const clientReportIndex = state.clients[clientIndex].reports.findIndex(
        (el) => el.name === action.payload.report.name
      );
      state.clients[clientIndex].reports.splice(clientReportIndex, 1);
    },
    addReport: (state, action: PayloadAction<object>) => {
      const clientIndex = state.clients.findIndex(
        (el) => el.name === action.payload.clientName
      );
      const randomReport = {
        name: `Report #${action.payload.randomReportNumber}`,
        list: [],
      };
      state.clients[clientIndex].reports.push(randomReport);
    },
    removeDataFromReport: (state, action: PayloadAction<object>) => {
      const clientIndex = state.clients.findIndex(
        (el) => el.name === action.payload.clientName
      );
      const clientReportIndex = state.clients[clientIndex].reports.findIndex(
        (el) => el.name === action.payload.report.name
      );
      const clientReportDataIndex = state.clients[clientIndex].reports[
        clientReportIndex
      ].list.findIndex((el) => el.name === action.payload.dataName);
      state.clients[clientIndex].reports[clientReportIndex].list.splice(
        clientReportDataIndex,
        1
      );
    },
    addDataToReport: (state, action: PayloadAction<object>) => {
      const clientIndex = state.clients.findIndex(
        (el) => el.name === action.payload.clientName
      );
      const clientReportIndex = state.clients[clientIndex].reports.findIndex(
        (el) => el.name === action.payload.report.name
      );
      const randomData = {
        name: `Data #${action.payload.randomDataNumber}`,
        data: [
          {
            label: `Series ${Math.floor(Math.random() * 100 + 1)}`,
            data: [
              {
                primary: "2022-02-03T00:00:00.000Z",
                likes: Math.floor(Math.random() * 1000 + 1),
              },
              {
                primary: "2022-03-03T00:00:00.000Z",
                likes: Math.floor(Math.random() * 1000 + 1),
              },
            ],
          },
          {
            label: `Series ${Math.floor(Math.random() * 100 + 1)}`,
            data: [
              {
                primary: "2022-04-03T00:00:00.000Z",
                likes: Math.floor(Math.random() * 1000 + 1),
              },
              {
                primary: "2022-05-03T00:00:00.000Z",
                likes: Math.floor(Math.random() * 1000 + 1),
              },
            ],
          },
        ],
      };
      state.clients[clientIndex].reports[clientReportIndex].list.push(
        randomData
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClientsData.fulfilled, (state, action) => {
      state.clients.push(...action.payload);
    });
  },
});

export const {
  addClient,
  removeClient,
  removeReport,
  addReport,
  removeDataFromReport,
  addDataToReport,
} = clientSlice.actions;

export default clientSlice.reducer;
