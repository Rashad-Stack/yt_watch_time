import { useQuery } from "@apollo/client";
import { createContext, useEffect, useReducer } from "react";
import { GET_SESSION } from "../lib/query";
import { ActionType } from "../types";

type State = {
  user: User | null;
  isAuthenticated: boolean;
};

type User = {
  id: string;
  email: string;
  watchPoint: number;
  role: string;
};

type Context = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: () => void;
  clearUser: () => void;
};

type Action = {
  type: ActionType;
  payload?: User;
};

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.LOGIN:
      return { ...state, isAuthenticated: true, user: action.payload || null };
    case ActionType.LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
};

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<Context | undefined>(undefined);

export default function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const { data, refetch, loading, error } = useQuery(GET_SESSION);

  console.log(error);

  function setUser() {
    refetch();
    dispatch({ type: ActionType.LOGIN, payload: { ...data?.session } });
  }

  function clearUser() {
    refetch();
    dispatch({ type: ActionType.LOGOUT });
  }

  useEffect(() => {
    function setCurrentUser() {
      if (data) {
        return dispatch({
          type: ActionType.LOGIN,
          payload: { ...data?.session },
        });
      }

      if (error) {
        return dispatch({ type: ActionType.LOGOUT });
      }

      dispatch({ type: ActionType.LOGOUT });
    }
    setCurrentUser();
  }, [data, error]);

  return (
    <AuthContext.Provider value={{ ...state, setUser, clearUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
