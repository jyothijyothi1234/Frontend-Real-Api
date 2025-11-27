import React, { createContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import BASE_URL from "../apis/configure";

export const CreateContext = createContext();

function DataFetch({ children }) {
  const [store, setStore] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState({
    title: "",
    body: "",
  });
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const dataFetch = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${BASE_URL}?q=${search}
                &_page=${page}&_limit=${6}`,
          { signal }
        );
        if (!response.ok) {
          throw new Error("404 server is not respond");
        }

        const data = await response.json();

        const result = data.sort((x, y) => x.id - y.id);
        setStore(result);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    dataFetch();

    return () => controller.abort();
  }, [search, page]);

  const handlerEdit = (indexOf) => {
    const items = store[indexOf];
    setEditItem({
      title: items.title,
      body: items.body,
    });
    setEditIndex(indexOf);

    // setSearch(store[indexOf])// this is for normal todolist
    // setEditIndex(indexOf)
  };

  const handlerEditChange = (field, value) => {
    setEditItem((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const Save = () => {
    if (editIndex !== null) {
      const updatedStore = [...store];
      updatedStore[editIndex] = {
        ...updatedStore[editIndex],
        title: editItem.title,
        body: editItem.body,
      };
      setStore(updatedStore);
      setEditIndex(null);
      setEditItem({ title: "", body: "" });
    }
  };

  const handlerSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlerNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlerPrev = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handlerDelete = (indexOf) => {
    const filtering = store.filter((item, index) => index !== indexOf);

    /* here we are trying to keep the confirm modal for pop message
        before deleting the data to confirm wether to delete are not */
    const result = window.confirm("Confirm before clicking the button !!");
    if (result) {
      setStore(filtering);
    }
    return;
  };
  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <CreateContext.Provider
          value={{
            search,
            error,
            store,
            handlerSearch,
            handlerPrev,
            handlerNext,
            handlerDelete,
            loading,
            setError,
            setSearch,
            handlerEdit,
            Save,
            handlerEditChange,
            editItem,
            editIndex,
          }}
        >
          {children}
        </CreateContext.Provider>
      </Grid>
    </Grid>
  );
}

export default DataFetch;
