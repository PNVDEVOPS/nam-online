import {configureStore} from '@reduxjs/toolkit'
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';
import { afishasReducer } from './slices/afishas';
import { bannersReducer } from './slices/banners';
import { adsReducer } from './slices/ads';
import { eventsReducer } from './slices/events';
import { categoriesReducer } from './slices/categories';
import { adcategoriesReducer } from './slices/adcategories';
import { cafecategoriesReducer } from './slices/cafecategories';
import { menuItemsReducer } from './slices/menuitems';

import { cafesReducer } from './slices/cafes';
import { menucategoriesReducer } from './slices/menucategories';
import { topreklamasReducer } from './slices/topreklamas';
import { sidereklamasReducer } from './slices/sidereklamas';
import { importantreklamasReducer } from './slices/importantreklamas';
import { vacationsReducer } from './slices/vacations';
import { vacationcategoriesReducer } from './slices/vacationcategories';
import { contactsReducer } from './slices/contacts';
import { busesReducer } from './slices/buses';


const store = configureStore({
    reducer: {
        posts: postsReducer,
        afishas: afishasReducer,
        auth: authReducer,
        banners: bannersReducer,
        ads: adsReducer,
        events: eventsReducer,
        categories: categoriesReducer,
        adcategories: adcategoriesReducer,
        cafecategories: cafecategoriesReducer,
        menucategories: menucategoriesReducer,
        menuitems: menuItemsReducer,
        cafes: cafesReducer,
        topreklamas: topreklamasReducer,
        sidereklamas: sidereklamasReducer,
        importantreklamas: importantreklamasReducer,
        vacations: vacationsReducer,
        vacationcategories: vacationcategoriesReducer,
        contacts: contactsReducer,
        buses: busesReducer
    }
});



export default store;
   