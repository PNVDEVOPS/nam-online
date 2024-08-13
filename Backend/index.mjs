import express from "express";
import fs from 'fs';
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

// User routes
app.post("/api/auth/login", loginValidation, handleValidationErrors, UserController.login);
app.post("/api/auth/register", registerValidation, handleValidationErrors, UserController.register);
app.get("/api/auth/me", checkAuth, UserController.getMe);

// File upload routes
app.post("/api/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post("/api/upload/multiple", checkAuth, upload.array('images', 12), (req, res) => {
  const files = req.files;
  const urls = files.map(file => `/uploads/${file.filename}`);
  res.json({ urls });
});

// Search routes
app.use('/api/search', searchRouter);

// Post routes
app.get("/api/tags", PostController.getLastTags);
app.get("/api/posts", PostController.getAll);
app.get("/api/posts/tags", PostController.getLastTags);
app.get("/api/posts/:id", PostController.getOne);
app.post("/api/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete("/api/posts/:id", checkAuth, PostController.remove);
app.patch("/api/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

// Bus routes
app.get("/api/buses", BusController.getAll);
app.get("/api/buses/:id", BusController.getOne);
app.post("/api/buses", checkAuth, busCreateValidation, handleValidationErrors, BusController.create);
app.delete("/api/buses/:id", checkAuth, BusController.remove);
app.patch("/api/buses/:id", checkAuth, busCreateValidation, handleValidationErrors, BusController.update);

// Afisha routes
app.get("/api/aftags", AfishaController.getLastTags);
app.get("/api/afishas", AfishaController.getAll);
app.get("/api/afishas/aftags", AfishaController.getLastTags);
app.get("/api/afishas/:id", AfishaController.getOne);
app.post("/api/afishas", checkAuth, afishaCreateValidation, handleValidationErrors, AfishaController.create);
app.delete("/api/afishas/:id", AfishaController.remove);
app.patch("/api/afishas/:id", afishaCreateValidation, handleValidationErrors, AfishaController.update);

// Event routes
app.get("/api/aftags", EventController.getLastTags);
app.get("/api/events", EventController.getAll);
app.get("/api/events/aftags", EventController.getLastTags);
app.get("/api/events/:id", EventController.getOne);
app.post("/api/events", checkAuth, EventCreateValidation, handleValidationErrors, EventController.create);
app.delete("/api/events/:id", EventController.remove);
app.patch("/api/events/:id", EventCreateValidation, handleValidationErrors, EventController.update);

// Ad routes
app.get("/api/tags", AdController.getLastTags);
app.get("/api/ads", AdController.getAll);
app.get("/api/ads/tags", AdController.getLastTags);
app.get("/api/ads/:id", AdController.getOne);
app.post("/api/ads", checkAuth, AdCreateValidation, handleValidationErrors, AdController.create);
app.delete("/api/ads/:id", checkAuth, AdController.remove);
app.patch("/api/ads/:id", checkAuth, AdCreateValidation, handleValidationErrors, AdController.update);

// AdCategory routes
app.post("/api/adcategories", checkAuth, AdCategoryController.createAdCategory);
app.get("/api/adcategories", AdCategoryController.getAllAdCategories);
app.get("/api/adcategories/:id", AdCategoryController.getAdCategoryById);
app.patch("/api/adcategories/:id", checkAuth, AdCategoryController.updateAdCategory);
app.delete("/api/adcategories/:id", checkAuth, AdCategoryController.deleteAdCategory);

// Vacation routes
app.get("/api/tags", VacationController.getLastTags);
app.get("/api/vacations", VacationController.getAll);
app.get("/api/vacations/tags", VacationController.getLastTags);
app.get("/api/vacations/:id", VacationController.getOne);
app.post("/api/vacations", checkAuth, VacationCreateValidation, handleValidationErrors, VacationController.create);
app.delete("/api/vacations/:id", checkAuth, VacationController.remove);
app.patch("/api/vacations/:id", checkAuth, VacationCreateValidation, handleValidationErrors, VacationController.update);

// VacationCategory routes
app.post("/api/vacationcategories", checkAuth, VacationCategoryController.createVacationCategory);
app.get("/api/vacationcategories", VacationCategoryController.getAllVacationCategories);
app.get("/api/vacationcategories/:id", VacationCategoryController.getVacationCategoryById);
app.patch("/api/vacationcategories/:id", checkAuth, VacationCategoryController.updateVacationCategory);
app.delete("/api/vacationcategories/:id", checkAuth, VacationCategoryController.deleteVacationCategory);

// Banner routes
app.get("/api/banners", BannerController.getAll);
app.get("/api/banners/:id", BannerController.getOne);
app.get("/api/banners/tags", BannerController.getLastTags);
app.post("/api/banners", checkAuth, BannerCreateValidation, handleValidationErrors, BannerController.create);
app.delete("/api/banners/:id", checkAuth, BannerController.remove);

// Topreklama routes
app.get("/api/topreklamas", TopreklamaController.getAllTopreklamas);
app.get("/api/topreklamas/:id", TopreklamaController.getTopreklamaById);
app.post("/api/topreklamas", checkAuth, TopreklamaCreateValidation, handleValidationErrors, TopreklamaController.createTopreklama);
app.delete("/api/topreklamas/:id", checkAuth, TopreklamaController.removeTopreklama);

// Contact routes
app.get("/api/contacts", ContactController.getAll);
app.post("/api/contacts", checkAuth, contactCreateValidation, handleValidationErrors, ContactController.create);
app.get("/api/contacts/:id", ContactController.getOne);
app.patch("/api/contacts/:id", checkAuth, contactCreateValidation, handleValidationErrors, ContactController.update);
app.delete("/api/contacts/:id", checkAuth, ContactController.remove);

// Sidereklama routes
app.get("/api/sidereklamas", SidereklamaController.getAll);
app.get("/api/sidereklamas/:id", SidereklamaController.getOne);
app.get("/api/sidereklamas/tags", SidereklamaController.getLastTags);
app.post("/api/sidereklamas", checkAuth, SidereklamaCreateValidation, handleValidationErrors, SidereklamaController.create);
app.delete("/api/sidereklamas/:id", checkAuth, SidereklamaController.remove);

// Importantreklama routes
app.get("/api/importantreklamas", ImportantreklamaController.getAll);
app.get("/api/importantreklamas/:id", ImportantreklamaController.getOne);
app.get("/api/importantreklamas/tags", ImportantreklamaController.getLastTags);
app.post("/api/importantreklamas", checkAuth, ImportantreklamaCreateValidation, handleValidationErrors, ImportantreklamaController.create);
app.delete("/api/importantreklamas/:id", checkAuth, ImportantreklamaController.remove);

// Category routes
app.post("/api/categories", checkAuth, CategoryController.createCategory);
app.get("/api/categories", CategoryController.getAllCategories);
app.get("/api/categories/:id", CategoryController.getCategoryById);
app.patch("/api/categories/:id", checkAuth, CategoryController.updateCategory);
app.delete("/api/categories/:id", checkAuth, CategoryController.deleteCategory);

// CafeCategory routes
app.post("/api/cafecategories", checkAuth, CafeCategoryController.createCafeCategory);
app.get("/api/cafecategories", CafeCategoryController.getAllCafeCategories);
app.get("/api/cafecategories/:id", CafeCategoryController.getCafeCategoryById);
app.patch("/api/cafecategories/:id", checkAuth, CafeCategoryController.updateCafeCategory);
app.delete("/api/cafecategories/:id", checkAuth, CafeCategoryController.deleteCafeCategory);

// MenuCategory routes
app.post("/api/menucategories", checkAuth, CafeCategoryController.createCafeCategory);
app.get("/api/menucategories", CafeCategoryController.getAllCafeCategories);
app.get("/api/menucategories/:id", CafeCategoryController.getCafeCategoryById);
app.patch("/api/menucategories/:id", checkAuth, CafeCategoryController.updateCafeCategory);
app.delete("/api/menucategories/:id", checkAuth, CafeCategoryController.deleteCafeCategory);

// Cafe routes
app.get("/api/cafes", CafeController.getAllCafes);
app.get("/api/cafes/:id", CafeController.getCafeById);
app.post("/api/cafes", checkAuth, CafeController.createCafe);
app.put("/api/cafes/:id", checkAuth, CafeController.updateCafe);
app.delete("/api/cafes/:id", checkAuth, CafeController.removeCafe);

// Menu routes
app.get("/api/menus/:id", MenuController.getMenu);
app.post("/api/menus", checkAuth, MenuController.createMenu);
app.put("/api/menus/:id", checkAuth, MenuController.updateMenu);
app.delete("/api/menus/:id", checkAuth, MenuController.deleteMenu);

// MenuItem routes
app.get("/api/menuitems", MenuItemController.getMenuItems);
app.post("/api/menuitems", checkAuth, MenuItemController.createMenuItem);
app.put("/api/menuitems/:id", checkAuth, MenuItemController.updateMenuItem);
app.delete("/api/menuitems/:id", checkAuth, MenuItemController.deleteMenuItem);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
