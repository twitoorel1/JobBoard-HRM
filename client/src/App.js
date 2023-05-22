import { Provider as ReduxProvider } from "react-redux";
import { store } from "src/redux/store";
import { BrowserRouter } from "react-router-dom";
import Router from "src/routes";


export default function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ReduxProvider>
  );
}