import React, { createContext, useEffect, useState } from "react";
import api from "../apis/baseURL";
import { endPoints } from "../apis/endPoints";

export const CreateContext = createContext();

function DataFetch({ children }) {
  const [store, setStore] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState({ title: "", body: "" });

  // -------------------- GET ALL POSTS --------------------
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(endPoints.getPosts, {
          params: { q: search, _page: page, _limit: 6 },
          signal,
        });
        setStore(response.data.sort((a, b) => a.id - b.id));
      } catch (error) {
        if (error.name === "CanceledError") console.log("Request canceled");
        else if (error.response) setError(`Server Error: ${error.response.status}`);
        else if (error.request) setError("No response from server");
        else setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    return () => controller.abort();
  }, [search, page]);

  // -------------------- GET SINGLE POST BY ID --------------------
  const fetchSinglePost = async (id) => {
    try {
      const response = await api.get(endPoints.getPostById(id));
      return response.data; // return single post data
    } catch (error) {
      console.log("Error fetching single post:", error);
      return null;
    }
  };

  // -------------------- EDIT / SELECT ITEM --------------------
  const handlerEdit = async (indexOf) => {
    const post = store[indexOf];

    // Fetch latest data from server by ID
    const singleData = await fetchSinglePost(post.id);
    if (singleData) setEditItem({ title: singleData.title, body: singleData.body });

    setEditIndex(indexOf);
  };

  const handlerEditChange = (field, value) => {
    setEditItem((prev) => ({ ...prev, [field]: value }));
  };

  // -------------------- UPDATE / PUT OR PATCH --------------------
  const Save = async () => {
    if (editIndex === null) return;

    const updatedItem = {
      ...store[editIndex],
      title: editItem.title,
      body: editItem.body,
    };

    try {
      // Use PATCH to update partially, or PUT for full update
      await api.patch(endPoints.updatePost(updatedItem.id), updatedItem);

      const updatedStore = [...store];
      updatedStore[editIndex] = updatedItem;
      setStore(updatedStore);

      setEditIndex(null);
      setEditItem({ title: "", body: "" });
    } catch (error) {
      if (error.response) setError(`Server Error: ${error.response.status}`);
      else if (error.request) setError("No response from server");
      else setError(error.message);
    }
  };




//   // -------------------- UPDATE / PUT (Full update on server) --------------------
// const Save = async () => {
//   if (editIndex === null) return;

//   const updatedItem = {
//     ...store[editIndex],   // keep id, userId, etc.
//     title: editItem.title, // overwrite title
//     body: editItem.body,   // overwrite body
//   };

//   try {
//     // ---- PUT: Full update ----
//     await api.put(endPoints.updatePost(updatedItem.id), updatedItem);

//     // update UI also
//     const updatedStore = [...store];
//     updatedStore[editIndex] = updatedItem;
//     setStore(updatedStore);

//     // reset state
//     setEditIndex(null);
//     setEditItem({ title: "", body: "" });
//   } catch (error) {
//     if (error.response) setError(`Server Error: ${error.response.status}`);
//     else if (error.request) setError("No response from server");
//     else setError(error.message);
//   }
// };

  // -------------------- DELETE --------------------
  const handlerDelete = async (indexOf) => {
    const itemToDelete = store[indexOf];
    const result = window.confirm("Confirm before deleting!");
    if (!result) return;

    try {
      await api.delete(endPoints.deletePost(itemToDelete.id));
      setStore(store.filter((_, idx) => idx !== indexOf));
    } catch (error) {
      if (error.response) setError(`Server Error: ${error.response.status}`);
      else if (error.request) setError("No response from server");
      else setError(error.message);
    }
  };

  // -------------------- POST / ADD NEW --------------------
  const handlerAdd = async (newItem) => {
    try {
      const response = await api.post(endPoints.createPost, newItem);
      setStore([response.data, ...store]);
    } catch (error) {
      if (error.response) setError(`Server Error: ${error.response.status}`);
      else if (error.request) setError("No response from server");
      else setError(error.message);
    }
  };

  // -------------------- SEARCH & PAGINATION --------------------
  const handlerSearch = (e) => setSearch(e.target.value);
  const handlerNext = () => setPage((prev) => prev + 1);
  const handlerPrev = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <CreateContext.Provider
      value={{
        search,
        error,
        store,
        handlerSearch,
        handlerPrev,
        handlerNext,
        handlerDelete,
        handlerAdd,
        loading,
        handlerEdit,
        Save,
        handlerEditChange,
        editItem,
        editIndex,
        handlerAdd
      }}
    >
      {children}
    </CreateContext.Provider>
  );
}

export default DataFetch;

