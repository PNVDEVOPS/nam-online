import React, { useState } from 'react';
import { Paper, Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import { ThemeProvider, createTheme } from '@mui/material';
import styles from './AddBusPage.module.scss';
import { selectIsAuth } from '../../redux/slices/auth';

export const AddBusPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const inputFileRef = React.useRef(null);
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0193DE',
      },
      secondary: {
        main: '#0193DE',
      },
    },
  });

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
      };

      const { data } = isEditing
        ? await axios.patch(`/buses/${id}`, fields)
        : await axios.post('/buses', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/buses/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании автобуса');
    }
  };

  if (!window.localStorage.getItem('token') && !isAuth) {
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
            <img className={styles.image} src={`https://xn--80ayb.online:4444/api${imageUrl}`} alt="Uploaded" />
          </>
        )}

        <br />
        <br />
        <TextField
          color="primary"
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <div className={styles.buttons}>
          <Button onClick={onSubmit} color="primary" size="large" variant="contained">
            {isEditing ? 'Сохранить' : 'Опубликовать'}
          </Button>
          <a href="/">
            <Button size="large">Отмена</Button>
          </a>
        </div>
      </ThemeProvider>
    </Paper>
  );
};
