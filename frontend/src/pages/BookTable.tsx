import { deleteEntity, query } from "../api/ApiUtils";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import { FC } from "react";
import { BookListView } from "../types/BookListView";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import BookstoreQuery from "../components/BookstoreQuery";
import BookstoreTitle from "../components/BookstoreTitle";
import { useConfirm } from "material-ui-confirm";

const initialState = {
  pagination: {
    paginationModel: {
      pageSize: 5,
    },
  },
};

const columnVisibilityModel = {
  id: false,
};

const BookTable: FC = () => {
  const navigate = useNavigate();
  const confirm = useConfirm();

  const handleEditClick = (id: GridRowId) => () => {
    navigate(`/books/${id}`);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    confirm({
      title: "Delete book entry",
      description:
        "Are you sure you want to delete this entry? This cannot be undone.",
    }).then(() => {
      deleteEntity(`books/${id}`);
      window.location.reload();
    });
  };

  const handleViewClick = (id: GridRowId) => () => {
    navigate(`/books/details/${id}`);
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
    <Stack spacing={3}>
      <BookstoreTitle>Books</BookstoreTitle>
      <BookstoreQuery queryKey={["books"]} queryFn={() => query("books")}>
        {({ data }) => (
          <DataGrid
            columns={columns}
            rows={data}
            initialState={initialState}
            columnVisibilityModel={columnVisibilityModel}
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{ toolbar: GridToolbar }}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "& .MuiDataGrid-cell": {
                border: "none",
              },
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                printOptions: { disableToolbarButton: true },
                csvOptions: { disableToolbarButton: true },
              },
            }}
          />
        )}
      </BookstoreQuery>
    </Stack>
  );
};

export default BookTable;
