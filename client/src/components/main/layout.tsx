import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Container, Header, SearchingRow } from '../welcome/welcome.style';
import { StyledLink } from './layout.style';
import { AnimationBackgrounds } from '../backgrounds/backgrounds';
import { DividerWithText } from '../login/login.style';
import { useState, useEffect } from 'react';
import NotFound from '../not-found';

function Layout() {
  const [showBackground, setShowBackground] = useState<boolean>(true);
  const [dividedText, setDividedText] = useState<boolean>(false);
  const [isValidRoute, setIsValidRoute] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const validPaths = ['/collection', '/my-collection', '/items', '/our-story', '/'];
    const isValid = validPaths.some((path) => location.pathname.startsWith(path));
    setIsValidRoute(isValid);

    if (!isValid) {
      setShowBackground(true);
      setDividedText(true);
    } else if (location.pathname === '/') {
      setShowBackground(true);
      setDividedText(false);
    } else {
      setShowBackground(false);
      setDividedText(true);
    }
  }, [location.pathname]);
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Container style={{ flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header>Little Chic</Header>
        <SearchingRow style={{ display: 'flex', justifyContent: 'center' }}>
          <StyledLink to="/collection" onClick={() => handleNavigation('/collection')}>
            Shop Collection
          </StyledLink>
          <StyledLink to="/our-story" onClick={() => handleNavigation('/our-story')}>
            Our Story
          </StyledLink>
          <StyledLink to="/gift-card" onClick={() => handleNavigation('/gift-card')}>
            Gift Card
          </StyledLink>
          <StyledLink to="/my-collection" onClick={() => handleNavigation('/my-collection')}>
            My collection
          </StyledLink>
        </SearchingRow>
        {dividedText && <DividerWithText />}
        {showBackground && <AnimationBackgrounds />}
      </div>
      <main>{isValidRoute ? <Outlet /> : <NotFound />}</main>
    </Container>
  );
}

export default Layout;
