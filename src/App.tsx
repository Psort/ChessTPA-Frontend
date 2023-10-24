import React from "react";
import { AppContainer } from "./App.styles";
import {AppRouter} from "./router/App.router";
import {withAxiosIntercepted} from "./hooks/withAxiosIntercepted";
import {GameContextProvider} from "./context/GameContext";

function App() {
  return (
      <GameContextProvider>
        <AppContainer>
            <AppRouter/>
        </AppContainer>
      </GameContextProvider>
  );
}

export default withAxiosIntercepted(App);
