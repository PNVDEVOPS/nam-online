import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Topreklama } from "../Topreklama";
import { TopreklamasSkeleton } from "./Skeleton";
import { fetchTopreklamas } from "../../redux/slices/topreklamas";

const TopreklamaList = () => {
  const userData = useSelector((state) => state.auth.data);

  const dispatch = useDispatch();
  const { topreklamas } = useSelector((state) => state.topreklamas);

  useEffect(() => {
    dispatch(fetchTopreklamas());
  }, [dispatch]);

  if (topreklamas.status === "loading") {
    return <TopreklamasSkeleton />;
  }

  return (
    <div>
      {topreklamas.items.map((obj) => (
        <div key={obj._id}>
          {obj.imageUrl && (
            <Topreklama
              id={obj._id}
              imageUrl={`http://localhost:4444${obj.imageUrl}`}
              href={obj.href} // Добавляем href
              isFullPost={false}
              isLoading={topreklamas.status === "loading"}
              isEditable={!!userData}

            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TopreklamaList;
