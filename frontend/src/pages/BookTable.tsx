import { query } from "../api/ApiUtils";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import { Book } from "../types/Book";
import BookstoreQuery from "./BookstoreQuery";

const columns: GridColDef<Book>[] = [
  {
    field: "id",
    headerName: "ID",
    type: "number",
    width: 90,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "isbn",
    headerName: "ISBN",
    width: 150,
  },
];

const initialState = {
  pagination: {
    paginationModel: {
      pageSize: 5,
    },
  },
};

const BookTable: FC = () => {
  return (
    <BookstoreQuery queryKey={["books"]} queryFn={() => query("books")}>
      {({ data }) => (
        <DataGrid
          columns={columns}
          rows={data}
          initialState={initialState}
          disableRowSelectionOnClick
        />
      )}
    </BookstoreQuery>
  );
};

export default BookTable;
