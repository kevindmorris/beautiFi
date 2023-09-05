import _ from "lodash";
import moment from "moment";
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";

import USDollar from "../../../../utils/USDollar";

export default function AnnuityTable({
  data,
  contributionFrequency,
}: {
  data: any;
  contributionFrequency: number;
}) {
  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      minWidth: 150,
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<number>) =>
        moment(params.value).format(
          contributionFrequency === 1 ? "yyyy" : "yyyy MMMM"
        ),
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
      headerName: "Future Value (FV)",
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
