import React from "react";
import { AppContainer } from "./App.styles";
import 'react-toastify/dist/ReactToastify.css';
import {AppRouter} from "./router/App.router";
import {withAxiosIntercepted} from "./hooks/withAxiosIntercepted";
import {GameContextProvider} from "./context/GameContext";
import {UserContextProvider} from "./context/UserContext";
import {ToastContainer} from "react-toastify";

function App() {
  return (
        <AppContainer>
            <UserContextProvider>
                <GameContextProvider>
                    <AppRouter/>
                    <ToastContainer />
                </GameContextProvider>
            </UserContextProvider>
        </AppContainer>
  );
}

export default withAxiosIntercepted(App);
