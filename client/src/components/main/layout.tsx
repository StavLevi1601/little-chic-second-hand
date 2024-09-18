import { Outlet, useNavigate } from "react-router-dom";
import { Container, Header, SearchingRow } from "../welcome/welcome.style";
import { StyledLink } from "./layout.style";
import { AnimationBackgrounds } from "../backgrounds/backgrounds";
import { DividerWithText } from "../login/login.style";
import { useState } from "react";

function Layout() {
  const [showBackground, setShowBackground] = useState<boolean>(true);
  const [dividedText, setDividedText] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    console.log("path", path);

    if (path !== "/") {
      setShowBackground(false);
      setDividedText(true);
    } else {
      setShowBackground(true);
      setDividedText(false);
    }
    navigate(path);
  };

  console.log("showBackground", showBackground);

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
            to="/my-items"
            onClick={() => handleNavigation("/my-items")}
          >
            My items
          </StyledLink>
        </SearchingRow>
        {dividedText && <DividerWithText />}
        {showBackground && <AnimationBackgrounds />}
      </div>
      <main>
        <Outlet />
      </main>
    </Container>
  );
}

export default Layout;
