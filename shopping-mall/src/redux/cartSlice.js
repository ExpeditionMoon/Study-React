import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import app from "../firebase";
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "@firebase/firestore";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, product }, thunkAPI) => {
    console.log(userId);
    try {
      const db = getFirestore(app);
      await setDoc(doc(db, "cart", userId, "products", product.id), product);
      // await setDoc(doc(db, "carts", "products"), product);
      return product;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCartLists = createAsyncThunk(
  "cart/getLists",
  async (userId, thunkAPI) => {
    try {
      const db = getFirestore(app);
      const lists = await getDocs(collection(db, "cart", userId));
      return lists.docs.map((doc) => doc.data());
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
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getCartLists.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(getCartLists.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter(product => product.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
