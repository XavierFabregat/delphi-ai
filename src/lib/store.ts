import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./features/projects/projects-slice";

// Returns a new store for each request;
export const makeStore = () => {
  return configureStore({
    reducer: {
      projects: projectsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer teh type of RootState and AppDispatch
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
