/* eslint-disable no-unused-vars */

import './App.css'
import DialogContext from '@context/DialogContext';
import { useState } from 'react';
import { useMessageContext } from '@context/MessageContext';

function Dialog() {
  const { setChannel } = useMessageContext();
  const [channelName, setChannelName] = useState('');
  const [memberIds, setMemberIds] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const createChannel = async () => {

    const apiUrl = 'http://206.189.91.54/api/v1/channels';
    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

    const payload = {
      name: channelName,
      user_ids: memberIds.split(',').map(memberId => parseInt(memberId.trim())),
    };
  
    console.log('Request Payload:', JSON.stringify(payload));
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
          'client': client,
          'uid': uid,
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        setResponse('Channel created successfully');
        console.log('New Channel:', data);
        setChannel(data.data.name);
      } else {
        const errorData = await response.json();
        setError(errorData.errors ? errorData.errors[0] : 'Unknown error');
      }
  
      console.log('Full Response:', response);
      
    } catch (error) {
      console.error('Error creating channel:', error);
      setError('Error creating channel');
    }
  };
  return (
    <>
      <div>
      <DialogContext />
      <dialog id="MiniDialog" inert loading data-modal-mode="mini">
      <form method="dialog">
        <article>
          <section className="warning-message">
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" >
              <title>A warning icon</title>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15h-1v-6h2v5h-1zm0-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <p>Create Channel:</p>
            <input type="text" placeholder="Channel Name:" value={channelName} onChange={(e) => setChannelName(e.target.value)}/>
          </section>  
          <section>
          <input type="text" placeholder="Member Id's:"  value={memberIds}  onChange={(e) => setMemberIds(e.target.value)}/>
          </section>
        </article>  
        <footer>
          <menu>
            <button type="submit" value="cancel"  className="confirm-button">
              Cancel
            </button>
            <button type="submit" value="confirm" className="confirm-button"  onClick={createChannel}>Confirm</button>
          </menu>
        </footer>
      </form>
    </dialog>

    <main>
  
    </main>
    </div>

    </>
  )
}



export default Dialog
