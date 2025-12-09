import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { CreateContext } from "../pages/dataFetching";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

function UserList() {
  const {
    store,
    search,
    handlerSearch,
    handlerNext,
    handlerPrev,
    loading,
    error,

    handlerEdit,
    handlerEditChange,
    editItem,
    editId,
    Save,

    handleOpen,
    handleClose,
    handlerDelete,
    open,
    style,
  } = useContext(CreateContext);

  /* here that fields will show when there it send the index to that usestate then that will show in 114 line where if true means show the input fields */

  // ---------------- NORMAL JS LOGIC TO DELETE ---------
  {
    /* <Button onClick={() => handlerDelete(item.id)}>Delete</Button>
   ------------- TO EDIT BUTTON AND SAVE 2ND METHOD ---------- 
   {/* <Button onClick={() => handlerEdit(item.id)}>{editIndex===null?"edit":"save"}</Button> */
  }

  return (
    <Grid container sx={{ margin: "30px" }}>
      <Grid
        size={{ xs: 12 }}
        sx={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}
      >
        <Box display="flex" gap={2} justifyContent="center">
          <TextField
            sx={{ width: "400px" }}
            value={search}
            onChange={handlerSearch}
          />
          <Button variant="contained" onClick={handlerNext}>
            Next
          </Button>
          <Button variant="contained" onClick={handlerPrev}>
            Previous
          </Button>
        </Box>


      </Grid>


      {editId && (
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <TextField
              value={editItem.title}
              onChange={(e) => handlerEditChange("title", e.target.value)}
            />
            <TextField
              value={editItem.body}
              onChange={(e) => handlerEditChange("body", e.target.value)}
            />
          </Box>
        )}

      <Grid size={{ xs: 12 }} sx={{ border: "2px solid black" }}>

        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    border: "2px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  UserId
                </TableCell>
                <TableCell
                  sx={{
                    border: "2px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  Id
                </TableCell>
                <TableCell
                  sx={{
                    border: "2px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    border: "2px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  Body
                </TableCell>
                <TableCell
                  sx={{
                    border: "2px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {store.map((item) => (
                <TableRow key={item.id}>
                  <TableCell
                    sx={{
                      border: "2px solid black",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    {item.userId}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "2px solid black",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    {item.id}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "2px solid black",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    {item.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "2px solid black",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    {item.body}
                  </TableCell>

                  <TableCell
                    sx={{
                      border: "2px solid black",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "25px",
                    }}
                  >
                    {editId === item.id ? (
                      <Button onClick={Save}>Save</Button>
                    ) : (
                      <Button onClick={() => handlerEdit(item.id)}>Edit</Button>
                    )}

                    <Button onClick={() => handleOpen(item.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

       
      </Grid>

      {/* MODAL DELETE CONFIRMATION */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}  >
          <CloseIcon
            onClick={handleClose}
            style={{ cursor: "pointer", float: "right" }}
          />

          <Typography variant="h6">Confirm before deleting?</Typography>

          <Button variant="contained" onClick={handlerDelete}  sx={{margin:"20px"}}>
            Ok
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Modal>

      {loading && <h2>Loading...</h2>}
      {error && <h2 style={{ color: "red" }}>{error}</h2>}
    </Grid>
  );
}

export default UserList;
