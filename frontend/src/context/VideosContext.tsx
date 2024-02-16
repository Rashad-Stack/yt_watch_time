import { useQuery } from "@apollo/client";
import { createContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import { handleError } from "../lib/handleError";
import { GET_VIDEOS } from "../lib/query";
import { ActionType, Video } from "../types";

type State = {
  videos: Video[];
};

type Action = {
  type: ActionType;
  payload: Video | Video[];
};

type Context = {
  videos: Video[];
  loading: boolean;
  error: Error | undefined;
  dispatch: React.Dispatch<Action>;
  refetch: () => void;
};

const videosReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_VIDEO:
      if (Array.isArray(action.payload)) {
        return { videos: action.payload };
      }
      state.videos = [action.payload, ...state.videos];
      return state;
    default:
      return state;
  }
};

const initialState: State = {
  videos: [],
};

export const VideoContext = createContext<Context | undefined>(undefined);

export default function VideosProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading, error, refetch } = useQuery(GET_VIDEOS);

  const [state, dispatch] = useReducer(videosReducer, initialState);

  useEffect(() => {
    if (data) {
      dispatch({ type: ActionType.SET_VIDEO, payload: data.videos });
    }
    if (error) {
      toast.error(handleError(error));
    }
  }, [data, error]);

  return (
    <VideoContext.Provider
      value={{ ...state, loading, error, dispatch, refetch }}
    >
      {children}
    </VideoContext.Provider>
  );
}
