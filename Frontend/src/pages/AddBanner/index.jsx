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
import { createTheme, ThemeProvider } from "@mui/material";

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

export const AddBanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/banners/${id}`, fields)
        : await axios.post("/banners", fields);

      const _id = isEditing ? id : data._id;

      navigate(`/banners/${_id}`);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании баннера");
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/banners/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
        })
        .catch((err) => {
          console.warn(err);
          alert("Ошибка при загрузке баннера");
        });
    }
  }, [id]);

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
        <input 
          ref={inputFileRef} 
          type="file" 
          onChange={handleChangeFile} 
          hidden 
        />
        {imageUrl && (
          <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Удалить
            </Button>
            <img
              className={styles.image}
              src={`https//87.228.19.239:4444/api${imageUrl}`}
              alt="Uploaded"
            />
          </>
        )}
        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок баннера..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <SimpleMDE
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
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
