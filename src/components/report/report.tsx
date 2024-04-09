import React from "react";
import { useDispatch } from "react-redux";
import "./report.scss";
import { Chart } from "react-charts";
import type { AppDispatch } from "../../app/store.ts";
import {
  IReport,
  IClient,
  IData,
  updateReport,
} from "../client/clientSlice.ts";

const ReportContainer = ({ client, report }) => {
  const dispatch = useDispatch<AppDispatch>();

  const removeReportHandler = () => {
    const clientReportIndex: number = client.reports.findIndex(
      (el: IReport) => el.name === report.name
    );
    const data: IClient = structuredClone(client);
    data.reports.splice(clientReportIndex, 1);
    dispatch(updateReport(data));
  };

  const addDataToReportHandler = () => {
    const clientReportIndex: number = client.reports.findIndex(
      (el: IReport) => el.name === report.name
    );
    const randomData: IData = {
      name: `Data #${Math.floor(Math.random() * 1000000 + 1)}`,
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
    const data: IClient = structuredClone(client);
    data.reports[clientReportIndex].list.push(randomData);
    dispatch(updateReport(data));
  };

  const removeDataFromReportHandler = (name: string) => {
    const clientReportIndex: number = client.reports.findIndex(
      (el: IReport) => el.name === report.name
    );
    const clientReportDataIndex: number = client.reports[
      clientReportIndex
    ].list.findIndex((el) => el.name === name);
    const data: IClient = structuredClone(client);
    data.reports[clientReportIndex].list.splice(clientReportDataIndex, 1);
    dispatch(updateReport(data));
  };

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum: { primary: string }) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum: { likes: number }) => datum.likes,
        elementType: "bar",
      },
    ],
    []
  );

  return (
    <div className="report-container">
      <div className="report-container__header">
        {report.name}{" "}
        <button className="add-data-report" onClick={addDataToReportHandler}>
          Add data
        </button>
        <button className="remove-report" onClick={removeReportHandler}>
          ✖ Remove report
        </button>
      </div>
      {report.list.map(({ name, data }) => (
        <div className="report-container__data" key={name}>
          <div className="report-container__data__subheader">
            {name}
            <button
              className="remove-data-report"
              onClick={() => removeDataFromReportHandler(name)}
            >
              ✖ Remove data
            </button>
          </div>
          {data.length > 0 && (
            <div className="report-container__data__wrapper">
              <Chart
                options={{
                  data,
                  primaryAxis,
                  secondaryAxes,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReportContainer;
