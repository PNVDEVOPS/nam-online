import React, { useState, useEffect } from "react";
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

export const AddSidereklama = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = useState(false);
  const [href, setHref] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [duration, setDuration] = useState(""); 
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

  const onSubmit = async () => {
    try {
      setLoading(true);
  
      const fields = {
        href,
        imageUrl,
        duration,
      };
  
      const { data } = isEditing
        ? await axios.patch(`/sidereklamas/${id}`, fields)
        : await axios.post("/sidereklamas", fields);
  
      const _id = isEditing ? id : data._id;
  
      navigate(`/sidereklamas/${_id}`);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании баннера");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/sidereklamas/${id}`)
        .then(({ data }) => {
          setHref(data.href);
          setImageUrl(data.imageUrl);
          setDuration(data.duration); 
        })
        .catch((err) => {
          console.warn(err);
          alert("Ошибка при загрузке баннера");
        });
    }
  }, [id]);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <ThemeProvider theme={theme}>
        <Button onClick={() => inputFileRef.current.click()} color="primary" variant="outlined" size="large">
          Загрузить превью 300x500
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
              src={`http://87.228.19.239:4444${imageUrl}`}
              alt="Uploaded"
            />
          </>
        )}
        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Введите ссылку..."
          value={href}
          onChange={(e) => setHref(e.target.value)}
          fullWidth
        />
        <br />
        <br />
        <Select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          fullWidth
          variant="standard"
          displayEmpty
        >
          <MenuItem value="" disabled>
            Выберите длительность...
          </MenuItem>
          <MenuItem value={1}>1 день</MenuItem>
          <MenuItem value={7}>1 неделя</MenuItem>
          <MenuItem value={30}>1 месяц</MenuItem>
        </Select>
        <br />
        <br />
        <div className={styles.buttons}>
          <Button onClick={onSubmit} color="primary" size="large" variant="contained" disabled={isLoading}>
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

export default AddSidereklama;
