import Login from "../src/components/login/login";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useAuthStore from "./store/useAuthState";
import Layout from "./components/main/layout";
import { ShopCollection } from "./components/collection/mainContent/shop-collection";
import { MyCollection } from "./components/collection/mainContent/my-collection";

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
          // <Route path="my-collection" element={<MyCollection />} />
          {/* // <Route path="our-story" element={<OurStory />} />
          // <Route path="gift-card" element={<GiftCard />} />
          // <Route path="add-item" element={<AddItem />} />
          // <Route path="items/:itemId" element={<ItemPage />} /> */}
          //{" "}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
