import { EmployeeProfile, Skill } from '../types';

export interface InitialStateType {
  all_skills: Skill[];
  employee_skills: Skill[];
  user: string | null;
  employee_profile: EmployeeProfile | null;
  filtered_skills: Skill[];
}
export const initialState = {
  all_skills: [],
  employee_skills: [],
  user: null,
  employee_profile: null,
  filtered_skills: [],
};
export type Action =
  | { type: 'SET_ALL_SKILLS'; all_skills: Skill[] }
  | { type: 'SET_EMPLOYEE_SKILLS'; employee_skills: Skill[] }
  | { type: 'SET_USER'; user: null }
  | { type: 'SET_EMPLOYEE_PROFILE'; employee_profile: EmployeeProfile }
  | { type: 'SET_FILTERED_SKILLS'; filtered_skills: Skill[] };

const reducer = (state: InitialStateType, action: Action): InitialStateType => {
  switch (action.type) {
    case 'SET_ALL_SKILLS':
      return {
        ...state,
        all_skills: action.all_skills,
      };

    case 'SET_EMPLOYEE_SKILLS':
      return {
        ...state,
        employee_skills: action.employee_skills,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };

    case 'SET_EMPLOYEE_PROFILE':
      return {
        ...state,
        employee_profile: action.employee_profile,
      };

    case 'SET_FILTERED_SKILLS':
      return {
        ...state,
        filtered_skills: action.filtered_skills,
      };

    default:
      return state;
  }
};

export default reducer;
