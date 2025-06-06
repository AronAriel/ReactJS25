import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

interface AuthState {
  userEmail: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userEmail: "",
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  string, 
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user.email || "";
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await auth.signOut();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.userEmail = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login error";
      })
      .addCase(logout.fulfilled, (state) => {
        state.userEmail = "";
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
