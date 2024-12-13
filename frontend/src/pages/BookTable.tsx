import { deleteEntity, query } from "../api/ApiUtils";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { FC, useState } from "react";
import { BookListView } from "../types/BookListView";
import BookstoreQuery from "./BookstoreQuery";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const initialState = {
  pagination: {
    paginationModel: {
      pageSize: 5,
    },
  },
};

const BookTable: FC = () => {
  const navigate = useNavigate();

  const handleEditClick = (id: GridRowId) => () => {};

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteEntity(`books/${id}`);
    window.location.reload();
  };

  const handleViewClick = (id: GridRowId) => () => {
    navigate(`/books/${id}`);
  };

  const columns: GridColDef<BookListView>[] = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "author",
      headerName: "Author",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "genre",
      headerName: "Genre",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      align: "right",
      headerAlign: "right",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="View"
            onClick={handleViewClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

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
