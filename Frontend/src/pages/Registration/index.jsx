import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { fetchAuth, fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Вася Пупкин",
      email: "vasya@test.ru",
      password: "test",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register("fullName", { required: "Укажите имя пользователя" })}
        className={styles.field}
        label="Имя пользователя"
        fullWidth
      />
      <TextField
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type="email"
        {...register("email", { required: "Укажите почту" })}
        className={styles.field}
        label="E-Mail"
        fullWidth
      />
      <TextField
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        type="password"
        {...register("password", { required: "Придумайте пароль" })}
        className={styles.field}
        label="Пароль"
        fullWidth
      />
      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </form>
    </Paper>
  );
};
