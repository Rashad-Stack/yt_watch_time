import { useQuery } from "@apollo/client";
import { createContext, useEffect, useReducer } from "react";
import { GET_SESSION } from "../lib/query";
import { ActionType } from "../types";

type User = {
  id: string;
  email: string;
  watchPoint: number;
  role: string;
};

type State = {
  user: User | null;
  isAuthenticated: boolean;
};

export type AuthAction = {
  type: ActionType;
  payload?: User;
};

type Context = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: () => void;
  clearUser: () => void;
};

function authReducer(state: State, action: AuthAction): State {
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

  const { data, refetch, loading, error } = useQuery(GET_SESSION, {
    fetchPolicy: "no-cache",
  });

  function setUser() {
    refetch();
    dispatch({
      type: ActionType.LOGIN,
      payload: { ...data?.session },
    });
  }

  function clearUser() {
    dispatch({ type: ActionType.LOGOUT });
  }

  useEffect(() => {
    if (data) {
      return dispatch({
        type: ActionType.LOGIN,
        payload: { ...data?.session },
      });
    }

    if (error) {
      return dispatch({ type: ActionType.LOGOUT });
    }
  }, [data, error]);

  return (
    <AuthContext.Provider value={{ ...state, loading, clearUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
