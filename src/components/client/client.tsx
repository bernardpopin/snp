import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./client.scss";
import ReportContainer from "../report/report.tsx";
import type { AppDispatch } from "../../app/store.ts";
import { deleteClientData, updateReport } from "./clientSlice.ts";

const ClientContainer = ({ client }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showClientState, setShowClientState] = useState(false);
  const hasReports = client.reports.length > 0;
  const clientId = client.id;

  const removeClientHandler = () => {
    dispatch(deleteClientData(clientId));
  };

  const addReportHandler = () => {
    const randomReportNumber = Math.floor(Math.random() * 1000000 + 1);
    const randomReport = {
      name: `Report #${randomReportNumber}`,
      list: [],
    };
    const data = structuredClone(client);
    data.reports.push(randomReport);
    dispatch(updateReport(data));
  };

  return (
    <div className="client-container">
      <div className="client-container__header">
        <button
          className="add-client"
          onClick={() => setShowClientState(!showClientState)}
        >
          {showClientState && "▲"} {!showClientState && "▼"}
        </button>
        {client.name}
        <button className="remove-client" onClick={removeClientHandler}>
          ✖ Remove client
        </button>
      </div>
      {showClientState && (
        <div className="client-container__content-container">
          <div className="client-container__subheader">
            {client.name} reports:
            <button className="add-report" onClick={addReportHandler}>
              Add report
            </button>
          </div>
          {hasReports && (
            <div className="client-container__report-list">
              {client.reports.map((report) => (
                <ReportContainer
                  key={report.name}
                  client={client}
                  report={report}
                ></ReportContainer>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientContainer;
