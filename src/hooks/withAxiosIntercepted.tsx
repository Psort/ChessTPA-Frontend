import {useCallback, useContext, useEffect, useState} from "react";
import {ACCESS_TOKEN, EMAIL, REFRESH_TOKEN} from "../constants/constants";
import axios, {InternalAxiosRequestConfig} from "axios";
import jwt_decode from "jwt-decode";
import {AuthApi} from "../api/AuthApi";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {GameContext} from "../context/GameContext";
import {UserContext} from "../context/UserContext";


export const authorizedApi = axios.create();

export function withAxiosIntercepted<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>
) {

  return function AxiosIntercepted(props: T) {
    const userContext = useContext(UserContext)
    const navigate = useNavigate();
    const gameContext = useContext(GameContext)
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const refreshToken = useCallback(async () => {
      try {
        const response = await AuthApi.refreshToken({
          refreshToken: localStorage.getItem(REFRESH_TOKEN),

        });
        localStorage.setItem(ACCESS_TOKEN,response.data.access_token)
        localStorage.setItem(REFRESH_TOKEN,response.data.refresh_token)
      } catch (error: any) {
        localStorage.removeItem(EMAIL);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        userContext.userModifier(null);
        gameContext.gameModifier(null)
        navigate("/")
      }
    }, [localStorage.getItem(REFRESH_TOKEN)]);
    useEffect(() => {
      axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {

        return {
          ...config,
          baseURL: process.env.REACT_APP_API_URL,
        };
      });

      authorizedApi.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
          const decodedToken = jwt_decode(token) as any;
          const tokenExp = decodedToken.exp as number;
          const currentTimestamp = Math.round(Date.now() / 1000);
          if (tokenExp < currentTimestamp) {
            await refreshToken()
          }
        }
        if (config?.headers) {
          config.headers["Authorization"] = `Bearer ${localStorage.getItem(
            ACCESS_TOKEN
          )}`;
        }

        return {
          ...config,
          baseURL: process.env.REACT_APP_API_URL,
        };
      });

      authorizedApi.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      setIsInitialized(true);
    }, []);


    return isInitialized ? <Component {...props} /> : <></>;
  };
}
