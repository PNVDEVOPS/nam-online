// AddAfisha.jsx

import React, { useState, useEffect, useCallback } from "react";
import { TextField, Paper, Button, Select, MenuItem, createTheme, ThemeProvider } from "@mui/material";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { selectIsAuth } from "../../redux/slices/auth";

const theme = createTheme({
  palette: {
    primary: { main: "#0193DE" },
    secondary: { main: "#0193DE" },
  },
});

export const AddAfisha = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = React.useRef(null);
  const [director, setDirector] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [secondPhone, setSecondPhone] = useState("");
  const [mon, setMon] = useState("");
  const [tue, setTue] = useState("");
  const [wed, setWed] = useState("");
  const [thu, setThu] = useState("");
  const [fri, setFri] = useState("");
  const [sat, setSat] = useState("");
  const [sun, setSun] = useState("");

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

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        category: selectedCategory,
        text,
        director,
        country,
        role,
        phone,
        secondPhone,
        mon,
        tue,
        wed,
        thu,
        fri,
        sat,
        sun,
      };

      const { data } = isEditing
        ? await axios.patch(`/afishas/${id}`, fields)
        : await axios.post("/afishas", fields, {
            headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
          });

      const _id = isEditing ? id : data._id;

      navigate(`/afishas/${_id}`);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании статьи");
    }
  };

  useEffect(() => {
    axios
      .get("/categories")
      .then(({ data }) => {
        setCategories(data);
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
      autosave: { enabled: true, delay: 1000 },
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
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        {imageUrl && (
          <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Удалить
            </Button>
            <img className={styles.image} src={`https//87.228.19.239:4444/api${imageUrl}`} alt="Uploaded" />
          </>
        )}
        <br />
        <br />
        <TextField
          color="primary"
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок афиши..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
        <h2>Информация</h2>
        <TextField
          color="primary"
          className={styles.about}
          label="Режиссер"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          fullWidth
        />
        <TextField
          color="primary"
          className={styles.about}
          label="Страна"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          fullWidth
        />
        <TextField
          color="primary"
          className={styles.about}
          label="Роль"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
        />
        <TextField
          color="primary"
          className={styles.about}
          label="К.т 1"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />
        <TextField
          color="primary"
          className={styles.about}
          label="К.т 2"
          value={secondPhone}
          onChange={(e) => setSecondPhone(e.target.value)}
          fullWidth
        />

        <h2> Расписание на неделю</h2>
        <div className={styles.shedule}>
          <TextField
            color="primary"
            label="Mon"
            value={mon}
            onChange={(e) => setMon(e.target.value)}
            fullWidth
          />
          <TextField
            color="primary"
            label="Tue"
            value={tue}
            onChange={(e) => setTue(e.target.value)}
            fullWidth
          />
          <TextField
            color="primary"
            label="Wed"
            value={wed}
            onChange={(e) => setWed(e.target.value)}
            fullWidth
          />
          <TextField
            color="primary"
            label="Thu"
            value={thu}
            onChange={(e) => setThu(e.target.value)}
            fullWidth
          />
          <TextField
            color="primary"
            label="Fri"
            value={fri}
            onChange={(e) => setFri(e.target.value)}
            fullWidth
          />
          <TextField
            color="primary"
            label="Sat"
            value={sat}
            onChange={(e) => setSat(e.target.value)}
            fullWidth
          />
          <TextField
            color="primary"
            label="Sun"
            value={sun}
            onChange={(e) => setSun(e.target.value)}
            fullWidth
          />
        </div>
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
