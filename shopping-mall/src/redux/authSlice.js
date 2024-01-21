import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../firebase";

// 회원가입
export const singUp = createAsyncThunk(
  "auth/signup",
  async ({ email, password }, thunkAPI) => {
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { email: userCredential.user.email, uid: userCredential.user.uid };
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        error.message = "아이디 형식이 잘못되었습니다.";
      } else if (error.code === "auth/weak-password") {
        error.message = "비밀번호는 6자리 이상입니다.";
      } else if (error.code === "auth/email-already-in-use") {
        error.message = "이미 존재하는 아이디입니다.";
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 로그인
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      return { email: userCredential.user.email, uid: userCredential.user.uid };
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        error.message = "이메일 또는 비밀번호가 잘못되었습니다.";
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 로그아웃
export const logout = createAsyncThunk("auth/logout", async () => {
  const auth = getAuth(app);
  await signOut(auth);
});

const initialState = {
  user: null,
  error: null,
  isLoading: false,
  success: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(singUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(singUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.email;
        state.error = null;
        state.success = "success";
      })
      .addCase(singUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.email;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, clearUser, resetError } = authSlice.actions;
export default authSlice.reducer;
