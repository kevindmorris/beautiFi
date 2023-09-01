import _ from "lodash";
import moment from "moment";
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";

import USDollar from "../../../utils/USDollar";

export default function AnnuityForecastTable({
  data,
  interval,
}: {
  data: any;
  interval: number;
}) {
  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      minWidth: 150,
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<number>) =>
        moment(params.value).format(interval === 1 ? "yyyy" : "yyyy MMMM"),
    },
    {
      field: "principal",
      headerName: "Contributions",
      headerAlign: "right",
      minWidth: 150,
      align: "right",
      valueFormatter: (params: GridValueFormatterParams<number>) =>
        USDollar.format(params.value),
    },
    {
      field: "interest",
      headerName: "Interest",
      headerAlign: "right",
      minWidth: 150,
      align: "right",
      valueFormatter: (params: GridValueFormatterParams<number>) =>
        USDollar.format(params.value),
    },
    {
      field: "balance",
      headerName: "Balance",
      headerAlign: "right",
      minWidth: 150,
      align: "right",
      valueFormatter: (params: GridValueFormatterParams<number>) =>
        USDollar.format(params.value),
    },
  ];

  return (
    <DataGrid
      rows={data}
      columns={columns}
      density="compact"
      getRowId={(row) => row.index}
      initialState={{
        sorting: { sortModel: [{ field: "date", sort: "desc" }] },
      }}
      sx={{ height: "85vh", flex: 1 }}
    />
  );
}
