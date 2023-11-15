
import { useUser } from '../context/userContext';

function DisplayUsername() {
  const { username } = useUser();

  return <div>{username ? `Hello, ${username}!` : 'Not logged in.'}</div>;
}

export default DisplayUsername;