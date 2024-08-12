import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Sidereklama } from "../Sidereklama";

import { fetchSidereklamas } from "../../redux/slices/sidereklamas";

const SidereklamaList = () => {
  const dispatch = useDispatch();
  const { sidereklamas } = useSelector((state) => state.sidereklamas);
  const userData = useSelector((state) => state.auth.data);


  useEffect(() => {
    dispatch(fetchSidereklamas());
  }, [dispatch]);



  return (
    <div>
      {sidereklamas.items.map((obj) => (
        <div  key={obj._id}>
          {obj.imageUrl && (
            <Sidereklama
              id={obj._id}
              imageUrl={`http://localhost:4444${obj.imageUrl}`}
              href={obj.href} // Добавляем href
              isFullPost={false}
              isLoading={sidereklamas.status === "loading"}
              isEditable={!!userData}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SidereklamaList;
