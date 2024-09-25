import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container, Header, SearchingRow } from "../welcome/welcome.style";
import { StyledLink } from "./layout.style";
import { AnimationBackgrounds } from "../backgrounds/backgrounds";
import { DividerWithText } from "../login/login.style";
import { useState } from "react";

function Layout() {
  const [showBackground, setShowBackground] = useState<boolean>(true);
  const [dividedText, setDividedText] = useState<boolean>(false);
  const [path, setPath] = useState<string>("/");
  // const location = useLocation();

  const navigate = useNavigate();
  console.log(path);
  
  const handleNavigation = (path: string) => {
    if (path !== "/") {
      setShowBackground(false);
      setDividedText(true);
      setPath(path);
      
    } else {
      setShowBackground(true);
      setDividedText(false);
      setPath(path);
    }
    navigate(path);
  };

  console.log("showBackground", showBackground);

  // const handleCollectionAccordingFilter = (
  //   filters: Record<string, string[]>
  // ) => {
  //   console.log("filters", filters);
  // };

  return (
    <Container style={{ flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header>Little Chic</Header>
        <SearchingRow style={{ display: "flex", justifyContent: "center" }}>
          <StyledLink
            to="/collection"
            onClick={() => handleNavigation("/collection")}
          >
            Shop Collection
          </StyledLink>
          <StyledLink
            to="/our-story"
            onClick={() => handleNavigation("/our-story")}
          >
            Our Story
          </StyledLink>
          <StyledLink
            to="/gift-card"
            onClick={() => handleNavigation("/gift-card")}
          >
            Gift Card
          </StyledLink>
          <StyledLink
            to="/my-collection"
            onClick={() => handleNavigation("/my-collection")}
          >
            My collection
          </StyledLink>
        </SearchingRow>
        {dividedText && <DividerWithText />}
        {showBackground && <AnimationBackgrounds />}
        {/* <FilterCollection onFilter={handleCollectionAccordingFilter} /> */}
      </div>
      <main>
        <Outlet />
      </main>
    </Container>
  );
}

export default Layout;
