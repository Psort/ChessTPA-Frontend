import React from "react";
import { AppContainer } from "./App.styles";
import {AppRouter} from "./router/App.router";
import {withAxiosIntercepted} from "./hooks/withAxiosIntercepted";

function App() {
  return (
        <AppContainer>
            <AppRouter/>
        </AppContainer>
  );
}

export default withAxiosIntercepted(App);
