import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const { data } = await axios.get("/contacts");
    return data;
  }
);

export const fetchRemoveContact = createAsyncThunk(
  "contacts/fetchRemoveContact",
  async (id) => {
    axios.delete(`/contacts/${id}`);
  }
);

export const fetchContactById = createAsyncThunk(
  "contacts/fetchContactById",
  async (id) => {
    const { data } = await axios.get(`/contacts/${id}`);
    return data;
  }
);

const initialState = {
  contacts: {
    items: [],
    status: "loading",
  },
  selectedContact: {
    item: null,
    status: "loading",
  },
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.contacts.items = [];
        state.contacts.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        state.contacts.status = "loaded";
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.contacts.items = [];
        state.contacts.status = "error";
      })
      .addCase(fetchRemoveContact.pending, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          (obj) => obj._id !== action.meta.arg
        );
      })
      .addCase(fetchContactById.pending, (state) => {
        state.selectedContact.item = null;
        state.selectedContact.status = "loading";
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.selectedContact.item = action.payload;
        state.selectedContact.status = "loaded";
      })
      .addCase(fetchContactById.rejected, (state) => {
        state.selectedContact.item = null;
        state.selectedContact.status = "error";
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
