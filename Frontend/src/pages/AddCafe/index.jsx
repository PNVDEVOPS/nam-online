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

export const AddCafe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [cafecategories, setCafeCategories] = useState([]);
  const [selectedCafeCategory, setSelectedCafeCategory] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [menu, setMenu] = useState("");
  const [user, setUser] = useState("");
  const inputFileRefAvatar = React.useRef(null); // Изменено
  const inputFileRefMenu = React.useRef(null); // Добавлено

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setAvatar(data.url);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const handleChangeMenuFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setMenu(data.url);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла меню");
    }
  };

  const onClickRemoveImage = () => {
    setAvatar("");
  };

  const onClickRemoveMenuImage = () => {
    setMenu("");
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        name,
        time,
        contact: { address, phone, whatsapp },
        cafecategories: selectedCafeCategory,
        avatar,
        menu,
        user
      };

      const { data } = isEditing
        ? await axios.patch(`/cafes/${id}`, fields)
        : await axios.post("/cafes", fields);

      const _id = isEditing ? id : data._id;

      navigate(`/cafes/${_id}`);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании кафе");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get("/cafecategories")
      .then(({ data }) => {
        setCafeCategories(data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при загрузке категорий");
      });

    if (isEditing) {
      axios
        .get(`/cafes/${id}`)
        .then(({ data }) => {
          setName(data.name);
          setTime(data.time);
          setAddress(data.contact.address);
          setPhone(data.contact.phone);
          setWhatsapp(data.contact.whatsapp);
          setSelectedCafeCategory(data.cafecategories);
          setAvatar(data.avatar);
          setMenu(data.menu);
          setUser(data.user);
        })
        .catch((err) => {
          console.warn(err);
          alert("Ошибка при получении данных кафе");
        });
    }
  }, [isEditing, id]);

  const options = {
    spellChecker: false,
    maxHeight: "400px",
    autofocus: true,
    placeholder: "Введите текст...",
    status: false,
    autosave: {
      enabled: true,
      delay: 1000,
    },
  };

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRefAvatar.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input
        ref={inputFileRefAvatar}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {avatar && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${avatar}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Название кафе..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Время работы..."
        value={time}
        onChange={(e) => setTime(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Адрес..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Телефон..."
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="WhatsApp..."
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        fullWidth
      />
      <Select
        multiple
        value={selectedCafeCategory}
        onChange={(e) => setSelectedCafeCategory(e.target.value)}
        variant="standard"
        displayEmpty
        className={styles.categories}
      >
        <MenuItem value="" disabled>
          Выберите категории
        </MenuItem>
        {cafecategories.map((cafecategory) => (
          <MenuItem key={cafecategory._id} value={cafecategory._id}>
            {cafecategory.name}
          </MenuItem>
        ))}
      </Select>
      <br />
      <Button onClick={() => inputFileRefMenu.current.click()} variant="outlined" size="large">
        Загрузить меню
      </Button>
      <input
        ref={inputFileRefMenu}
        type="file"
        onChange={handleChangeMenuFile}
        hidden
      />
      {menu && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveMenuImage}>
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${menu}`}
            alt="Uploaded Menu"
          />
        </>
      )}
      <br />

      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : "Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
