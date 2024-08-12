import express from "express";
import fs from 'fs'
import mongoose from "mongoose";
import multer from "multer";
import cors from 'cors';


import { 
  registerValidation,
  loginValidation,
  postCreateValidation,
  afishaCreateValidation,
  BannerCreateValidation,
  AdCreateValidation,
  EventCreateValidation,
  TopreklamaCreateValidation,
  SidereklamaCreateValidation,
  ImportantreklamaCreateValidation,
  VacationCreateValidation,
  contactCreateValidation,
  busCreateValidation,
} from "./validations.js";

import { handleValidationErrors, checkAuth } from "./utils/index.js";
import { 
  UserController, 
  PostController, 
  AfishaController, 
  BannerController, 
  AdController, 
  EventController, 
  CategoryController, 
  AdCategoryController, 
  CafeController, 
  MenuController, 
  MenuItemController, 
  CafeCategoryController, 
  TopreklamaController,
  SidereklamaController,
  ImportantreklamaController,
  VacationController,
  VacationCategoryController,
  ContactController,
  BusController
} from "./controllers/index.js";
import searchRouter from './routes/search.js'; 

mongoose
  .connect("mongodb+srv://admin:wwwwww@cluster0.qlvioza.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login);
app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register);

app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post('/upload', checkAuth, upload.array('images', 12), (req, res) => {
  const files = req.files;
  const urls = files.map(file => `/uploads/${file.filename}`);
  res.json({ urls });
});

app.use('/search', searchRouter); 

app.get("/tags", PostController.getLastTags);
app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});


app.get('/buses', BusController.getAll);
app.get('/buses/:id', BusController.getOne);
app.post('/buses', checkAuth, busCreateValidation, handleValidationErrors, BusController.create);
app.delete('/buses/:id', checkAuth, BusController.remove);
app.patch('/buses/:id', checkAuth, busCreateValidation, handleValidationErrors, BusController.update);


app.get("/aftags", AfishaController.getLastTags);
app.get("/afishas", AfishaController.getAll);
app.get("/afishas/aftags", AfishaController.getLastTags);
app.get("/afishas/:id", AfishaController.getOne);
app.post("/afishas", checkAuth, afishaCreateValidation, handleValidationErrors, AfishaController.create);
app.delete("/afishas/:id",  AfishaController.remove);
app.patch("/afishas/:id",  afishaCreateValidation, handleValidationErrors, AfishaController.update);


app.get("/aftags", EventController.getLastTags);
app.get("/events", EventController.getAll);
app.get("/events/aftags", EventController.getLastTags);
app.get("/events/:id", EventController.getOne);
app.post("/events", checkAuth, EventCreateValidation, handleValidationErrors, EventController.create);
app.delete("/events/:id",  EventController.remove);
app.patch("/events/:id",  EventCreateValidation, handleValidationErrors, EventController.update);


app.get("/tags", AdController.getLastTags);
app.get("/ads", AdController.getAll);
app.get("/ads/tags", AdController.getLastTags);
app.get("/ads/:id", AdController.getOne);
app.post("/ads", checkAuth, AdCreateValidation, handleValidationErrors, AdController.create);
app.delete("/ads/:id", checkAuth, AdController.remove);
app.patch("/ads/:id", checkAuth, AdCreateValidation, handleValidationErrors, AdController.update);

app.post("/adcategories", checkAuth, AdCategoryController.createAdCategory);
app.get("/adcategories", AdCategoryController.getAllAdCategories);
app.get("/adcategories/:id", AdCategoryController.getAdCategoryById);
app.patch("/adcategories/:id", checkAuth, AdCategoryController.updateAdCategory);
app.delete("/adcategories/:id", checkAuth, AdCategoryController.deleteAdCategory);


app.get("/tags", VacationController.getLastTags);
app.get("/vacations", VacationController.getAll);
app.get("/vacations/tags", VacationController.getLastTags);
app.get("/vacations/:id", VacationController.getOne);
app.post("/vacations", checkAuth, VacationCreateValidation, handleValidationErrors, VacationController.create);
app.delete("/vacations/:id", checkAuth, VacationController.remove);
app.patch("/vacations/:id", checkAuth, VacationCreateValidation, handleValidationErrors, VacationController.update);

app.post("/vacationcategories", checkAuth, VacationCategoryController.createVacationCategory);
app.get("/vacationcategories", VacationCategoryController.getAllVacationCategories);
app.get("/vacationcategories/:id", VacationCategoryController.getVacationCategoryById);
app.patch("/vacationcategories/:id", checkAuth, VacationCategoryController.updateVacationCategory);
app.delete("/vacationcategories/:id", checkAuth, VacationCategoryController.deleteVacationCategory);


app.get("/banners", BannerController.getAll);
app.get("/banners/:id", BannerController.getOne);
app.get("banners/tags", BannerController.getLastTags);
app.post("/banners", checkAuth, BannerCreateValidation, handleValidationErrors, BannerController.create);
app.delete("/banners/:id", checkAuth, BannerController.remove);


app.get("/topreklamas", TopreklamaController.getAllTopreklamas);
app.get("/topreklamas/:id", TopreklamaController.getTopreklamaById);
app.post("/topreklamas", checkAuth, TopreklamaCreateValidation, handleValidationErrors, TopreklamaController.createTopreklama);
app.delete("/topreklamas/:id", checkAuth, TopreklamaController.removeTopreklama);



app.get('/contacts', ContactController.getAll);
app.post('/contacts', checkAuth, contactCreateValidation, handleValidationErrors, ContactController.create);
app.get('/contacts/:id', ContactController.getOne);
app.patch('/contacts/:id', checkAuth, contactCreateValidation, handleValidationErrors, ContactController.update);
app.delete('/contacts/:id', checkAuth, ContactController.remove);


app.get("/sidereklamas", SidereklamaController.getAll);
app.get("/sidereklamas/:id", SidereklamaController.getOne);
app.get("sidereklamas/tags", SidereklamaController.getLastTags);
app.post("/sidereklamas", checkAuth, SidereklamaCreateValidation, handleValidationErrors, SidereklamaController.create);
app.delete("/sidereklamas/:id", checkAuth, SidereklamaController.remove);


app.get("/importantreklamas", ImportantreklamaController.getAll);
app.get("/importantreklamas/:id", ImportantreklamaController.getOne);
app.get("importantreklamas/tags", ImportantreklamaController.getLastTags);
app.post("/importantreklamas", checkAuth, ImportantreklamaCreateValidation, handleValidationErrors, ImportantreklamaController.create);
app.delete("/importantreklamas/:id", checkAuth, ImportantreklamaController.remove);


app.post("/categories", checkAuth, CategoryController.createCategory);
app.get("/categories", CategoryController.getAllCategories);
app.get("/categories/:id", CategoryController.getCategoryById);
app.patch("/categories/:id", checkAuth, CategoryController.updateCategory);
app.delete("/categories/:id", checkAuth, CategoryController.deleteCategory);

app.post("/cafecategories", CafeCategoryController.createCafeCategory);
app.get("/cafecategories", CafeCategoryController.getAllCafeCategories);
app.get("/cafecategories/:id", CafeCategoryController.getCafeCategoryById);
app.patch("/cafecategories/:id", checkAuth, CafeCategoryController.updateCafeCategory);
app.delete("/cafecategories/:id", checkAuth, CafeCategoryController.deleteCafeCategory);

app.post("/menucategories", CafeCategoryController.createCafeCategory);
app.get("/menucategories", CafeCategoryController.getAllCafeCategories);
app.get("/menucategories/:id", CafeCategoryController.getCafeCategoryById);
app.patch("/menucategories/:id", checkAuth, CafeCategoryController.updateCafeCategory);
app.delete("/menucategories/:id", checkAuth, CafeCategoryController.deleteCafeCategory);


app.get("/cafes", CafeController.getAllCafes);
app.get("/cafes/:id", CafeController.getCafeById);
app.post("/cafes", checkAuth, CafeController.createCafe);
app.put("/cafes/:id",checkAuth,  CafeController.updateCafe);
app.delete("/cafes/:id",checkAuth, CafeController.removeCafe);


app.get("/menus/:id", MenuController.getMenu);
app.post("/menus",  MenuController.createMenu);
app.put("/menus/:id",  MenuController.updateMenu);
app.delete("/menus/:id",  MenuController.deleteMenu);


app.get("/menuitems", MenuItemController.getMenuItems);
app.post("/menuitems",  MenuItemController.createMenuItem);
app.put("/menuitems/:id",  MenuItemController.updateMenuItem);
app.delete("/menuitems/:id",  MenuItemController.deleteMenuItem);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
