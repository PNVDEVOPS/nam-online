import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImportantreklamas } from "../redux/slices/importantreklamas";
import { CircularProgress } from "@mui/material";

const AllImportantreklamaPage = () => {
  const dispatch = useDispatch();
  const { importantreklamas } = useSelector((state) => state.importantreklamas);

  useEffect(() => {
    dispatch(fetchImportantreklamas());
  }, [dispatch]);

  return (
    <div>
      <h1>Важные объявления</h1>
      {importantreklamas.status === "loading" ? (
        <div><CircularProgress></CircularProgress></div>
      ) : importantreklamas.items.length === 0 ? (
        <div>объявлений нет</div>
      ) : (
        <div>
          {importantreklamas.items.map((item) => (
            <div key={item._id}>
              <h2>{item.title}</h2>
              <img src={`https://xn--80ayb.online:4444${item.imageUrl}`} alt={item.title} />
              {/* <a href={item.href}>Link</a> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllImportantreklamaPage;
