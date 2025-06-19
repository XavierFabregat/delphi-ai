import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "~/lib/store";
import type { Project } from "~/types";

// Define a type for the slice state
export interface ProjectsState {
  projects: Project[];
  selectedProject: Project | null;
}

// Define the initial state using that type
const initialState: ProjectsState = {
  projects: [],
  selectedProject: null,
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects = [...state.projects, action.payload];
    },
    removeProject: (state, action: PayloadAction<Project>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload.id,
      );
    },
    setSelectedProject: (state, action: PayloadAction<Project>) => {
      state.selectedProject = action.payload;
    },
  },
});

export const { addProject, removeProject, setProjects, setSelectedProject } =
  projectSlice.actions;

export const selectProject = (state: RootState) => state.projects.projects;
export const selectActiveProject = (state: RootState) =>
  state.projects.selectedProject;

export default projectSlice.reducer;
