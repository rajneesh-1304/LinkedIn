import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersReducer from "./features/users/userSlice";
import searchReducer from './features/search/searchSlice'
import addressReducer from './features/address/addressSlice'
import profileReducer from './features/profile/profileSlice';
import postReducer from './features/post/postSlice';
import connectionReducer from './features/connection/connectionSlice';
import followingReducer from './features/following/followingSlice';
import notificationReducer from './features/notifications/notificationSlice';
import { injectStore } from "@/components/privateApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"], 
};

const rootReducer = combineReducers({
  users: usersReducer,
  search:searchReducer,
  address : addressReducer,
  profile: profileReducer,
  post: postReducer,
  connection: connectionReducer,
  following: followingReducer,
  notifications: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
