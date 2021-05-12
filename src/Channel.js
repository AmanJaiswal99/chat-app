import React,{useState,useEffect} from 'react'
import firebase from 'firebase'
import Message from './Message';

function Channel({user=null,db=null}) {
    const [messages,setMessages] = useState([])
    const [newMessage ,setNewMessage] = useState()

    const uid = user?.uid;
    const displayName = user?.displayName;
    const photoURL = user?.photoURL;
 

    useEffect(() => {
        if(db){
           
            const unsubscribe = db
            .collection('messages')
            .orderBy('created')
            .limit(100)
            .onSnapshot(querySnapshot=>{
                const data = querySnapshot.docs.map(doc=>({
                    ...doc.data(),
                    id:doc.id,
                }))
                setMessages(data)
            })

            return unsubscribe;
        } 
        }, [db])

        const handleOnChange = e => {
            setNewMessage(e.target.value)
        }

        const handleOnSubmit = e => {
            

            if(db){
                e.preventDefault();
                db.collection('messages').add({
                    text:newMessage,
                    created: firebase.firestore.FieldValue.serverTimestamp(), uid,
                    displayName,
                    photoURL,
                })
            }
          
        }
    return (
        <div className='channel'>
           <div className="messages">
           {messages.map(item=>(
                <Message {...item}/>
            ))}
            </div>

             <form
          onSubmit={handleOnSubmit}
          className="forminput"
        >
          <input
           
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
            className="inputbox"
          />
          <button
            type="submit"
            disabled={!newMessage}
            className="submitbtn"
          >
            Send
          </button>
        </form>
        </div>
        
    )
}

export default Channel
