import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'Неверный Email').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'Неверный Email').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('fullName', 'Укажите имя').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка на аватар').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
    body('category', 'Неверная категория').optional().isString(),
  ];

  export const afishaCreateValidation = [
    body('title', 'Введите заголовок афиши').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст афиши').isLength({ min: 3 }).isString(),
    body('aftags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
  ];

  export const BannerCreateValidation = [
    body('title', 'Введите заголовок афиши').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст афиши').isLength({ min: 3 }).isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),

  ];

  export const TopreklamaCreateValidation = [
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
  ];

  export const SidereklamaCreateValidation = [
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
  ];

  export const ImportantreklamaCreateValidation = [
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
  ];

  export const AdCreateValidation = [
    body('title', 'Введите заголовок афиши').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст афиши').isLength({ min: 3 }).isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('phone', 'Неверный формат номера').optional().isString(),
    body('price', 'Неверный формат цены').optional().isString(),
    body('adcategory', 'Неверная категория').optional().isString(),
  ];

  export const VacationCreateValidation = [
    body('title', 'Введите заголовок афиши').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст афиши').isLength({ min: 3 }).isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('phone', 'Неверный формат номера').optional().isString(),
    body('price', 'Неверный формат цены').optional().isString(),
    body('vacationcategory', 'Неверная категория').optional().isString(),
    body('mail', 'Неверная категория').optional().isString(),
  ];

  export const EventCreateValidation = [
    body('title', 'Введите заголовок афиши').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст афиши').isLength({ min: 3 }).isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('phone', 'Неверный формат номера').optional().isString(),
    body('price', 'Неверный формат цены').optional().isString(),
  ];


  export const MenuCreateValidation = [
    body('menu', 'Введите название меню').optional().isString(),
    body('items', 'Введите название блюд').isLength({ min: 2 }).isString(),
  ];
  
  export const CafeCreateValidation = [
    body('name').notEmpty().withMessage('Введите название кафе'),
    body('categories').isArray().withMessage('Категории должны быть массивом'),
    body('menu').isArray().withMessage('Категории должны быть массивом'),
    body('contact.address').optional().isString().withMessage('Неверный формат адреса'),
    body('contact.phone').optional().isString().withMessage('Неверный формат телефона'),
    body('contact.email').optional().isEmail().withMessage('Неверный формат email'),
    body('avatar').optional().isString().withMessage('Неверный формат ссылки на аватар'),
  ];

  export const MenuItemCreateValidation = [
    body('name').notEmpty().withMessage('Введите название блюда'),
    body('price').notEmpty().withMessage('Введите цену').isNumeric().withMessage('Неверный формат цены'),
    body('weight').optional().isNumeric().withMessage('Неверный формат веса'),
    body('image').optional().isURL().withMessage('Неверный формат ссылки на изображение'),
];

export const contactCreateValidation = [
  body('title', 'Введите заголовок контакта').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст контакта').isLength({ min: 10 }).isString(),
  body('phone', 'Введите номер телефона').isLength({ min: 10 }).isString(),
  body('mail', 'Введите корректный email').isEmail(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];

export const busCreateValidation = [
  body('title', 'Введите название').isLength({ min: 3 }).isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
