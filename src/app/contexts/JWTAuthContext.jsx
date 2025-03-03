import { createContext, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
// GLOBAL CUSTOM COMPONENTS
import Loading from "app/components/MatxLoading";
import { URL } from "app/utils/constant";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false
};

const isValidToken = (accessToken) => {
  if (!accessToken) return false;
  const decodedToken = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;

  // return decodedToken?.id ? true : false;
};

const isValidSession = async (session_id) => {
  if (!session_id) return false;
  try {
    const response = await axios.post(`${URL}/LevelGameAPIs/getMyProfile`, { session_id });
    return response;
  } catch (error) {
    console.error("Session validation error:", error);
    return false;
  }
};

const setSession = (session_id) => {
  if (session_id) {
    localStorage.setItem("session_id", session_id);
    // axios.defaults.headers.common.Authorization = `Bearer ${session_id}`;
  } else {
    localStorage.removeItem("session_id");
    // delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, user, isAuthenticated, isInitialized: true };
    }
    case "LOGIN": {
      const { user } = action.payload;
      return { ...state, user, isAuthenticated: true };
    }
    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }
    case "REGISTER": {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }
    default: {
      return state;
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT"
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(URL + "/LevelGameAPIs/user/login", {
        username,
        password
      });

      if (data.code == 200) {
        const { session_id } = data;
        const user = {
          user_id: data.user_id,
          org_id: data.org_id,
          username: data.username,
          email: data.email,
          org_name: data.org_name,
          user_type: data.user_type
        };

        setSession(session_id);
        dispatch({ type: "LOGIN", payload: { user } });
      } else if (data.code == 400) {
        throw new Error(data.desc);
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, username, password) => {
    const { data } = await axios.post("/api/auth/register", { email, username, password });
    const { accessToken, user } = data;

    setSession(accessToken);
    dispatch({ type: "REGISTER", payload: { user } });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const session_id = window.localStorage.getItem("session_id");

        if (session_id) {
          const { data } = await isValidSession(session_id);
          setSession(session_id);
          const user = {
            user_id: data.user_id,
            org_id: data.org_id,
            username: data.username,
            email: data.email,
            org_name: data.org_name,
            user_type: data.user_type
          };

          dispatch({
            type: "INIT",
            payload: { isAuthenticated: true, user }
          });
        } else {
          dispatch({
            type: "INIT",
            payload: { isAuthenticated: false, user: null }
          });
        }
      } catch (err) {
        console.log(err);

        dispatch({
          type: "INIT",
          payload: { isAuthenticated: false, user: null }
        });
      }
    })();
  }, []);

  if (!state.isInitialized) return <Loading />;

  return (
    <AuthContext.Provider value={{ ...state, method: "JWT", login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
