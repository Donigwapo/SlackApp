import { IoIosAdd } from 'react-icons/io';
import { Button } from '@button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//endpoint 9:41 11/30
//email are now appeard 9:56 11/30
//sender and receiver appeard
function InboxList() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const senderEmails = [...new Set(messages.map(message => message.sender.email))];

 

{/*
  const onUsersFetched = (users) => {
    const filteredIds = users.filter(user => {

      const dateCondition = user.created_at > '2023-12-01'; // Example: Filtering users created after January 1, 2021
  
      return dateCondition;
  
    }).map(user => user.id);
    setUserIds(filteredIds);
    
  };


  useEffect(() => {


    const fetchData = async () => {

      try {

        const accessToken = localStorage.getItem('access-token');

        const client = localStorage.getItem('client');

        const uid = localStorage.getItem('uid');

        setLoading(true);

        if (!accessToken || !client || !uid) {

          setError('Authentication tokens not found');

          return;

        }
        
        const userIds = [];

        for (let i = 4736; i <= 4738; i++) {
        
          userIds.push(i);
          
        }
       for (const userId of userIds) {

          const apiUrl = `http://206.189.91.54/api/v1/messages?receiver_id=${userId}&receiver_class=User`;
          console.log('API URL:', apiUrl);
          const response = await fetch(apiUrl, {

            headers: {

              'Content-Type': 'application/json',

              'access-token': accessToken,

              client,

              uid,

            },

          });


          if (response.ok) {

            const data = await response.json();
    
            const newMessages = data.data;
    
            // Filter messages by date
    
            const filteredMessages = newMessages.filter(message => {
    
              const messageDate = new Date(message.created_at);
    
              const currentDate = new Date();
    
              // Only keep messages from today
    
              return messageDate.toDateString() === currentDate.toDateString();
    
            });
    
            setMessages(prevMessages => [...prevMessages, ...filteredMessages]);
    
            if (filteredMessages.length > 0) {
    
              setSenderName(filteredMessages[0].sender.name);
    
            }
    

          } else {

            throw new Error('Failed to fetch messages');

          }

   }

        setLoading(false);

      } catch (error) {

        console.error('Error fetching messages:', error);

        setError(error.message);

        setLoading(false);

      }

    };

    fetchData();
  }, [userIds]);

  

 */}
 const handleLogout = () => {

  localStorage.removeItem('access-token');

  localStorage.removeItem('client');

  localStorage.removeItem('expiry');

  localStorage.removeItem('uid');

  localStorage.removeItem('recipientId');
  localStorage.removeItem('selected-data');

  navigate('/');

};

  const handleButtonClick = () => { 

    navigate('/message-panel/send-message/');

  };

  // Extract sender and receiver information from the latest message
/*
const latestMessage = messages?.[0] || {};

  const receiver = latestMessage?.receiver;

  const receiverEmail = receiver ? receiver.email : '';
  */

  return (

    <div className="dm">

      <h2 className="dm__heading">

        <span>

          Direct Message <span className="dm__number"></span>
      {/* <UserList onUsersFetched={onUsersFetched} />*/}
        </span>

        <button className="ion-ios-plus-outline channels__add" onClick={handleButtonClick}>

          <IoIosAdd size={30} />

        </button>

      </h2>

    

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="logout-container">

        <Button buttonStyle="btn--outline" onClick={handleLogout}>

          Log out

        </Button>

      </div>

    </div>

  );

}

export default InboxList;