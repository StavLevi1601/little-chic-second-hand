import Login from "./components/login/Login";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/welcome/welcome";
import useAuthStore from "./store/store";
import Layout from "./components/main/layout";
import { ShopCollection } from "./components/collection/shop-collection";

function App() {
  const { isAuthenticated } = useAuthStore();
  console.log("isAuthenticated", isAuthenticated);

  // return (
  //   <>
  //     <Router>
  //       <Routes>
  //         <Route path="/login" element={<Login />} />
  //         {isAuthenticated ? <Route path="/" element={<Welcome />} /> : null}
  //         {/* <Route path="/items/:itemId" element={<ItemPage />} /> */}
  //       </Routes>
  //     </Router>
  //   </>
  // );

  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          {/* {isAuthenticated ? <Route path="/" element={<Welcome />} /> : null} */}
          <Route path="collection" element={<ShopCollection />} />
          {/* // <Route path="our-story" element={<OurStory />} />
          // <Route path="gift-card" element={<GiftCard />} />
          // <Route path="add-item" element={<AddItem />} />
          // <Route path="my-items" element={<MyItems />} />
          // <Route path="items/:itemId" element={<ItemPage />} /> */}
          //{" "}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
