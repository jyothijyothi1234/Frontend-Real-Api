import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { CreateContext } from "../context/DataFetch";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  } = useContext(CreateContext);

  /*  here it is form validation to validate the form */
  // const handleee=()=>{

  //   let errorss={}
  //   if(!texting.trim()){
  //     errorss="Name is not undefined"
  //   }

  //   if(!email.includes("@")){
  //     errorss="Email is incorrect"
  //   }

  //   const clear=Object.key(errorss).length===0
  //       setError(clear)
  // }

  return (
    <Grid container sx={{ margin: "20px 20px" }}>
      <Grid
        size={{ xs: 12 }}
        sx={{ margin: "20px 20px", display: "flex", justifyContent: "center" }}
      >
        {/* <form> */}
        <TextField
          sx={{ width: "30%" }}
          name="texting"
          value={search}
          onChange={handlerSearch}
        />
        <Button onClick={handlerNext}>Next</Button>

        <Button onClick={handlerPrev}>Previous</Button>
        <Button onClick={Save}>Save</Button>

        {/* </form> */}
      </Grid>

      <Grid size={{ xs: 12 }} sx={{ border: "2px solid black" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: "2px solid black" }}>userId</TableCell>
                <TableCell sx={{ border: "2px solid black" }}>Id</TableCell>
                <TableCell sx={{ border: "2px solid black" }}>Title</TableCell>
                <TableCell sx={{ border: "2px solid black" }}>Body</TableCell>
                <TableCell sx={{ border: "2px solid black" }}>Filter</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {store.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: "2px solid black" }}>
                    {item.id}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid black" }}>
                    {item.userId}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid black" }}>
                    {item.title}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid black" }}>
                    {item.body}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid black" }}>
                    <Button onClick={() => handlerDelete(index)}>Delete</Button>
                    <Button onClick={() => handlerEdit(index)}>Edit</Button>

                    <Grid
                      size={{ xs: 12 }}
                      sx={{
                        margin: "20px 20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      /* here that fields will show when there it send the index
                      to that usestate then that will show */
                      {editIndex === index && (
                        <>
                          <TextField
                            name="title"
                            value={editItem.title}
                            onChange={(e) =>
                              handlerEditChange("title", e.target.value)
                            }
                          ></TextField>
                          <TextField
                            name="body"
                            value={editItem.body}
                            onChange={(e) =>
                              handlerEditChange("body", e.target.value)
                            }
                          >
                            Edit
                          </TextField>
                        </>
                      )}
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {loading && <h1>Loading!!!...</h1>}
        {error && <h1 style={{ color: "red" }}>{error}</h1>}
      </Grid>
    </Grid>
  );
}

export default UserList;
