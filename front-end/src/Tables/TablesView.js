import { useEffect, useState } from "react";
import { listTables, unseatTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function TablesView() {
  const [tablesError, setTablesError] = useState(null);
  const [tables, setTables] = useState([]);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  function deleteHandler(table_id) {
    unseatTable(table_id).then(loadTables).catch(setTablesError);
  }

  return (
    <div>
      <ErrorAlert error={tablesError} />
      <h2>Tables</h2>
      {tables &&
        tables.map((table, i) => (
          <div key={i} className="row mb-2">
            <div className="col-6">
              <h5>{`${table.table_name}`}</h5>
              <p>capacity: {table.capacity}</p>
            </div>
            <div data-table-id-status={table.table_id} className="col-3">
              <p>{table.occupied ? "Occupied" : "Free"}</p>
            </div>
            <div data-table-id-finish={table.table_id} className="col-3">
              {table.occupied && (
                <button
                  className="btn btn-warning"
                  onClick={() => deleteHandler(table.table_id)}
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
