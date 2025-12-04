import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import { CreateContext } from  "../pages/dataFetching";
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

function UserList() {
  const {
    error,
    store,
    handlerSearch,
    handlerPrev,
    handlerNext,
    search,
    handlerDelete,
    loading,
    Save,
    handlerEdit,
    handlerEditChange,
    editItem,
    editIndex,
    handlerAdd
  } = useContext(CreateContext);

  /* here that fields will show when there it send the index
      to that usestate then that will show  in 114 line where if true means 
      show the input fields   */


  return (
    <Grid container sx={{ margin: "20px 20px" }}>
      <Grid
        size={{ xs: 12 }}
        sx={{ margin: "20px 20px", display: "flex", justifyContent: "center" }}
      >

<Box display="flex" gap={2}>
        <TextField
          sx={{ width: "400px" }}
          name="texting"
          value={search}
          onChange={handlerSearch}
        />


   <Button    variant="contained" onClick={handlerNext}>Next</Button>

        <Button  variant="contained" onClick={handlerPrev}>Previous</Button>
        {/* <Button onClick={Save}>Save</Button> */}

        </Box>
      </Grid>

      <Grid size={{ xs: 12 }} sx={{ border: "2px solid black" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow  >
                <TableCell sx={{ border: "2px solid black",textAlign:"center",fontWeight:"bold",fontSize:"25px" }}>userId</TableCell>
                <TableCell sx={{ border: "2px solid black",textAlign:"center",fontWeight:"bold",fontSize:"25px" }}>Id</TableCell>
                <TableCell sx={{ border: "2px solid black",textAlign:"center",fontWeight:"bold",fontSize:"25px" }}>Title</TableCell>
                <TableCell sx={{ border: "2px solid black",textAlign:"center",fontWeight:"bold",fontSize:"25px" }}>Body</TableCell>
                <TableCell sx={{ border: "2px solid black",textAlign:"center",fontWeight:"bold",fontSize:"25px" }}>Filter</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {store.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: "2px solid black" }}>
                    {item.userId}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid black" }}>
                    {item.id}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid black" }}>
                    {item.title}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid black" }}>
                    {item.body}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid black" }}>
                    <Button onClick={() => handlerDelete(index)}>Delete</Button>
                    {/* <Button onClick={() => handlerEdit(index)}>{editIndex===null?"edit":"save"}</Button> */}
                    <Button
  onClick={() =>
    editIndex === index ? Save() : handlerEdit(index)
  }
>
  {editIndex === index ? "Save" : "Edit"}
</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


                      {editIndex !== null && (
                        
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          <TextField
                            name="title"
                            value={editItem.title}
                            onChange={(e) =>
                              handlerEditChange("title", e.target.value)
                            }
                          />
                          <TextField
                            name="body"
                            value={editItem.body}
                            onChange={(e) =>
                              handlerEditChange("body", e.target.value)
                            } />
                           
                           </Box>
                      )}
                   
        {loading && <h1>Loading!!!...</h1>}
        {error && <h1 style={{ color: "red" }}>{error}</h1>}
      </Grid>
    </Grid>
  );
}

export default UserList;
