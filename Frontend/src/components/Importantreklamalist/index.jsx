import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Importantreklama } from "../Importantreklama";
import { fetchImportantreklamas } from "../../redux/slices/importantreklamas";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ImportantreklamaList = () => {
  const dispatch = useDispatch();
  const { importantreklamas } = useSelector((state) => state.importantreklamas);
  const userData = useSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(fetchImportantreklamas());
  }, [dispatch]);

  if (!importantreklamas.items.length) {
    return null; // Возвращаем null, если нет элементов
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const autoPlay = true; // Включаем автоплей
  const infinite = true; // Делаем карусель круговой
  const autoPlaySpeed = 3000; // Время между автоматической прокруткой в миллисекундах

  return (
    <Carousel
      responsive={responsive}
      autoPlay={autoPlay}
      infinite={infinite}
      autoPlaySpeed={10000}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={1000}
    >
      {importantreklamas.items.map((obj) => (
        <div key={obj._id}>
          {obj.imageUrl && (
            <Importantreklama
              id={obj._id}
              imageUrl={`http://localhost:4444${obj.imageUrl}`}
              href={obj.href}
              isFullPost={false}
              isLoading={importantreklamas.status === "loading"}
              isEditable={!!userData}
            />
          )}
        </div>
      ))}
    </Carousel>
  );
};

export default ImportantreklamaList;
