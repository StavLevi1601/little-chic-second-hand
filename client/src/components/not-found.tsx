import { useNavigate } from 'react-router-dom';
import { NotFoundContainer, PElement, HElement, Button } from './not-found.style';

const NotFound = () => {
  const navigation = useNavigate();

  const handleToReturnHomePage = () => {
    navigation('/');
  };

  return (
    <NotFoundContainer>
      <PElement> Oops! Something went wrong</PElement>
      <HElement>The page was not found - 404</HElement>
      <Button onClick={handleToReturnHomePage}>return to home page</Button>
    </NotFoundContainer>
  );
};

export default NotFound;
