import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { ThemeProvider, createTheme } from "@mui/material";

export const AddVacations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [vacationcategories, setVacationCategories] = useState([]);
  const [selectedVacationCategory, setSelectedVacationCategory] = useState("");
  const inputFileRef = React.useRef(null);
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [mail, setMail] = useState("");
  const [daysToExpire, setDaysToExpire] = useState(7); // Добавляем состояние для количества дней до истечения
  const [images, setImages] = useState([]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#0193DE",
      },
      secondary: {
        main: "#0193DE",
      },
    },
  });

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const files = event.target.files;
      const newImages = [...images];

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("image", files[i]);
        const { data } = await axios.post("/upload", formData);
        newImages.push(data.url);
      }

      setImages(newImages);
      console.log("New images:", newImages); // отладочный вывод
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const onClickRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        text,
        imageUrls: images,
        phone,
        price,
        mail,
        vacationcategory: selectedVacationCategory,
        daysToExpire, // Передаем количество дней до истечения
      };

      console.log("Fields before submission:", fields); // отладочный вывод

      const { data } = isEditing
        ? await axios.patch(`/vacations/${id}`, fields)
        : await axios.post("/vacations", fields);

      console.log("Response from server:", data); // отладочный вывод

      const _id = isEditing ? id : data._id;

      navigate(`/vacations/${_id}`);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании статьи");
    }
  };

  useEffect(() => {
    axios
      .get("/vacationcategories")
      .then(({ data }) => {
        setVacationCategories(data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при загрузке категорий");
      });
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <ThemeProvider theme={theme}>
        <Button onClick={() => inputFileRef.current.click()} color="primary" variant="outlined" size="large">
          Загрузить превью
        </Button>
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden multiple />

        {images.map((imageUrl, index) => (
          <div key={index}>
            <img className={styles.image} src={`https://xn--80ayb.online:4444/api${imageUrl}`} alt={`Uploaded ${index + 1}`} />
            <Button variant="contained" color="error" onClick={() => onClickRemoveImage(index)}>
              Удалить
            </Button>
          </div>
        ))}

        <br />
        <br />
        <TextField
          color="primary"
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок статьи..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <Select
          color="primary"
          value={selectedVacationCategory}
          onChange={(e) => setSelectedVacationCategory(e.target.value)}
          variant="standard"
          displayEmpty
          className={styles.categories}
        >
          <MenuItem color="primary" value="">
            Выберите категорию
          </MenuItem>
          {vacationcategories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <SimpleMDE
          color="primary"
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
        />
        <TextField
          color="primary"
          label="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />
        <TextField
          color="primary"
          label="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
        />
            <TextField
          color="primary"
          label="@mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          fullWidth
        />

        {/* Добавляем поле ввода для количества дней до истечения */}
        <TextField
          color="primary"
          label="Количество дней до истечения"
          type="number"
          value={daysToExpire}
          onChange={(e) => setDaysToExpire(e.target.value)}
          fullWidth
        />

        <div className={styles.buttons}>
          <Button onClick={onSubmit} color="primary" size="large" variant="contained">
            {isEditing ? 'Сохранить' : "Опубликовать"}
          </Button>
          <a href="/">
            <Button size="large">Отмена</Button>
          </a>
        </div>
      </ThemeProvider>
    </Paper>
  );
};
