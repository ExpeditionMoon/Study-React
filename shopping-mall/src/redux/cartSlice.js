import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import app from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "@firebase/firestore";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, product }, thunkAPI) => {
    try {
      const db = getFirestore(app);
      const docData = await addDoc(
        collection(db, "cart", userId, "products"),
        product
      );
      if (docData && docData.id && product) {
        return { ...product, id: docData.id };
      } else {
        throw new Error("사용자를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCartLists = createAsyncThunk(
  "cart/getLists",
  async (userId, thunkAPI) => {
    try {
      const db = getFirestore(app);
      const lists = await getDocs(collection(db, "cart", userId, "products"));
      return lists.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, "cart", userId, "products", productId));
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  cart: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cart.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCartLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cart = action.payload;
      })
      .addCase(getCartLists.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
