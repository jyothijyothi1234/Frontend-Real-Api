import React, { createContext, useEffect, useState } from "react";
import api from "../apis/baseURL";
import { endPoints } from "../apis/endPoints";

export const CreateContext = createContext();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function DataFetch({ children }) {
  const [store, setStore] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState({ title: "", body: "" });

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // -------------------- GET ALL POSTS --------------------
  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(endPoints.getPosts, {
          params: { q: search, _page: page, _limit: 6 },
          signal: controller.signal,
        });
        setStore(response.data.sort((x, y) => x.id - y.id));
      } catch (error) {
        if (error.response) setError(`Server Error: ${error.response.status}`);
        else setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    return () => controller.abort();
  }, [search, page]);

  // -------------------- FETCH SINGLE POST --------------------
  const fetchSinglePost = async (id) => {
    try {
      const response = await api.get(endPoints.getPostById(id));
      return response.data;
    } catch {
      return null;
    }
  };




  // // -------------------- UPDATE / PUT (Full update on server) -------------------- // 
  //const Save = async () => { 
    // if (editIndex === null) return; 
    // const updatedItem = { 
      // ...store[editIndex], 
    // keep id, userId, etc. 
    // title: editItem.title,
     // overwrite title 
     // body: editItem.body, 
     // overwrite body 
     // }; 
     // try { 
      // // ---- PUT: Full update ---- 
      // await api.put(endPoints.updatePost(updatedItem.id), updatedItem); 
      // // update UI also 
      // const updatedStore = [...store]; 
      // updatedStore[editIndex] = updatedItem; 
      // setStore(updatedStore); 
      // // reset state 
      // setEditIndex(null); 
      // setEditItem({ title: "", body: "" }); 
      // } catch (error) { 
        // if (error.response) 
          //setError(Server Error: ${error.response.status}); 
        // else if (error.request) 
          //setError("No response from server"); 
        // else setError(error.message); 
        // } 
        // };

  // -------------------- EDIT --------------------
  const handlerEdit = async (id) => {
    const singleData = await fetchSinglePost(id);

    if (singleData) {
      setEditItem({ title: singleData.title, body: singleData.body });
      setEditId(id);
    }
  };

  const handlerEditChange = (field, value) => {
    setEditItem((prev) => ({ ...prev, [field]: value }));
  };

  const Save = async () => {
    if (!editId) return;

    const updatedItem = { ...editItem };

    try {
      await api.patch(endPoints.updatePost(editId), updatedItem);

      setStore((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, ...updatedItem } : item
        )
      );

      setEditId(null);
      setEditItem({ title: "", body: "" });
    } catch (error) {
      setError("Error updating");
    }
  };




  // -------------------- DELETE --------------------
  const handlerDelete = async () => {

    //------------- this type for js we will use for confirm that button-------------- 
    // const result = window.confirm("Confirm before deleting!"); 
    // if (!result) return


    try {
      await api.delete(endPoints.deletePost(deleteId));

      setStore((prev) => prev.filter((item) => item.id !== deleteId));

      setOpen(false);
      setDeleteId(null);
    } catch (error) {
      setError("Error deleting");
    }
  };

  // -------------------- ADD POST --------------------
  const handlerAdd = async (newItem) => {
    try {
      const response = await api.post(endPoints.createPost, newItem);
      setStore([response.data, ...store]);
    } catch (error) {
      setError("Error adding");
    }
  };

  return (
    <CreateContext.Provider
      value={{
        search,
        store,
        loading,
        error,
        handlerSearch: (e) => setSearch(e.target.value),
        handlerNext: () => setPage((prev) => prev + 1),
        handlerPrev: () => setPage((prev) => (prev > 1 ? prev - 1 : 1)),

        handlerEdit,
        handlerEditChange,
        Save,
        editItem,
        editId,

        handlerAdd,

        open,
        handleOpen,
        handleClose,
        handlerDelete,
        style,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
}

export default DataFetch;

