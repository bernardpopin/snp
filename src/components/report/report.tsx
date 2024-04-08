import React from "react";
import { useDispatch } from "react-redux";
import "./report.scss";
import { Chart } from "react-charts";
import type { AppDispatch } from "../../app/store.ts";
import {
  removeReport,
  removeDataFromReport,
  addDataToReport,
} from "../client/clientSlice.ts";

const ReportContainer = ({ clientName, report }) => {
  const dispatch = useDispatch<AppDispatch>();

  const removeReportHandler = () => {
    dispatch(removeReport({ clientName, report }));
  };

  const addDataToReportHandler = () => {
    const randomDataNumber = Math.floor(Math.random() * 1000000 + 1);
    dispatch(addDataToReport({ clientName, report, randomDataNumber }));
  };

  const removeDataFromReportHandler = (name) => {
    dispatch(removeDataFromReport({ clientName, report, dataName: name }));
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
