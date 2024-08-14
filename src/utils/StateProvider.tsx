import {
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { Action, InitialStateType, initialState } from './reducer';

export const StateContext = createContext<any>({
  state: initialState,
  dispatch: () => {},
});

export const StateProvider = ({
  reducer,
  initialState,
  children,
}: {
  reducer: Reducer<InitialStateType, Action>;
  initialState: InitialStateType;
  children: ReactNode;
}) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateProvider = () => useContext(StateContext);
