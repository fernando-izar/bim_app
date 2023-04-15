import { executeCore } from "./core-handler";
import { Action } from "./actions";
import { reducer } from "./state-handler";
import {
  FC,
  PropsWithChildren,
  useReducer,
  createContext,
  useContext,
} from "react";
import { initialState, State } from "./state";
import { Authenticator } from "./Authenticator";

const appContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => {},
]);

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useReducer(reducer, initialState);

  const dispatch = (value: Action) => {
    setState(value);
    executeCore(value);
  };

  return (
    <appContext.Provider value={[state, dispatch]}>
      <Authenticator />
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
