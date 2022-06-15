import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/Products"
import Header from "./components/Header";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";

//redux
import {Provider} from "react-redux"
import store from "./store"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
          <Routes>
              <Route path="/" element={<Products/>} />
              <Route path="/products/new" element={<NewProduct/>} />
              <Route path="/products/edit/:id" element={<EditProduct/>} />
          
          </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
