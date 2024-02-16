import { useQuery } from "@apollo/client";
import { createContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
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
  totalPages: number;
  totalVideos: number;
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
  const [searchParam] = useSearchParams();
  const currentPage = Number(searchParam.get("page")) || 1;
  const limit = Number(searchParam.get("limit")) || 5;
  const { data, loading, error, refetch } = useQuery(GET_VIDEOS, {
    variables: { limit, page: currentPage },
  });

  const [state, dispatch] = useReducer(videosReducer, initialState);

  useEffect(() => {
    if (data) {
      dispatch({ type: ActionType.SET_VIDEO, payload: data.allVideos.videos });
    }
    if (error) {
      toast.error(handleError(error));
    }
  }, [data, error]);

  return (
    <VideoContext.Provider
      value={{
        ...state,
        loading,
        error,
        dispatch,
        refetch,
        totalPages: data?.allVideos.totalPages,
        totalVideos: data?.allVideos.totalVideos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}
