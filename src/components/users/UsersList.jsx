/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
/*

To dynamically populate the options in the <select> dropdown with the result from the UserList API,
 you can use the data retrieved from the API to generate the options. 
 Here's how you can modify your AddDirectMessage component to achieve this:

Firstly, modify your UserList component to expose the user data through a prop callback:

*/
const UserList = ({onUsersFetched}) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

  useEffect(() => {
    const apiUrl = 'http://206.189.91.54/api/v1/users';
    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

    const fetchUsers = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'access-token': accessToken,
            'client': client,
            'uid': uid,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data.data);
          onUsersFetched(data.data);
        } else {
          const errorData = await response.json();
          setError(errorData.errors ? errorData.errors[0] : 'Unknown error');
        }

        console.log('Full Response:', response);

      } catch (error) {
        console.error('Error fetching user list:', error);
        setError('Error fetching user list');
      }
    };

    fetchUsers();
  }, [onUsersFetched]); // Empty dependency array to fetch users only once when the component mounts

  return (
    <div className="userListContainer">
      <h2>User List</h2>

      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>ID: {user.id}</p>
              <p>Email: {user.email}</p>
              <p>Provider: {user.provider}</p>
              <p>UID: {user.uid}</p>
              <p>Allow Password Change: {user.allow_password_change.toString()}</p>
              <p>Name: {user.name}</p>
              <p>Nickname: {user.nickname}</p>
              <p>Image: {user.image}</p>
              <p>Created At: {user.created_at}</p>
              <p>Updated At: {user.updated_at}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}

      {error && (
        <div style={{ marginTop: '10px', color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default UserList;
