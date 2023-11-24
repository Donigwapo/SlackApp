/* eslint-disable no-unused-vars */

import '@components/App.css'
import DialogContext from '@context/DialogContext';

function ChannelDetailsDialog() {
 
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
            <p>(Put here the name of the channel)</p>
          </section>  
          <section>
            <div className='detailsContainer'>
              <label>Created By: </label>
              <label>Created On:</label>
            </div>
          </section>
          <section>
      
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



export default ChannelDetailsDialog
