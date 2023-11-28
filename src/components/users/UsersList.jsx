  /* eslint-disable react/prop-types */
  import  { useEffect, useState, Fragment } from 'react';
  import { toastError } from "@utils/toastify";
  import { toast } from 'react-toastify';
 
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

    

        } catch (error) {
          console.error('Error fetching user list:', error);
          toast.loading('Error fetching user list');
        } 
        finally {
        // Dismiss the loading toast when fetching is done 
        } 
      };
      fetchUsers();
    }, [onUsersFetched]); // Empty dependency array to fetch users only once when the component mounts

    return (
      <Fragment>
        {users.length > 0 ? (
          <ul>
            {users.map(() => (

               toast.dismiss()
             
            ))}
          </ul>
        ) : (
          toast.loading('Retrieving Emails, please wait.')
        )}

        {error && (
          
             toastError({error})
        
        )}
    
      </Fragment>
    );
  };

  export default UserList;
