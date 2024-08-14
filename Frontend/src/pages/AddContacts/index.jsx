import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { ThemeProvider, createTheme } from "@mui/material";

export const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const inputFileRef = React.useRef(null);
  const [phone, setPhone] = useState("");
  const [secondPhone, setSecondPhone] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState("");

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

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImage(data.url);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const onClickRemoveImage = () => {
    setImage("");
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        text,
        imageUrl: image,
        phone,
        secondPhone,
        mail,
      };

      const { data } = isEditing
        ? await axios.patch(`/contacts/${id}`, fields)
        : await axios.post("/contacts", fields);

      const _id = isEditing ? id : data._id;

      navigate(`/contacts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании контакта");
    }
  };

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

        {image && (
          <div>
            <img className={styles.image} src={`https://xn--80ayb.online:4444/api${image}`} alt="Uploaded" />
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Удалить
            </Button>
          </div>
        )}

        <br />
        <br />
        <TextField
          color="primary"
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок контакта..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
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
          label="Доп. Телефон"
          value={secondPhone}
          onChange={(e) => setSecondPhone(e.target.value)}
          fullWidth
        />
        <TextField
          color="primary"
          label="Электронная почта"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
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
