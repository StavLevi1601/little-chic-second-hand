import { useParams } from "react-router-dom";

function Welcome() {
  const { username } = useParams();

  console.log("username", username);
  return (
    <div>
      <h1>Welcome, {username}!</h1>
    </div>
  );
}

export default Welcome;
