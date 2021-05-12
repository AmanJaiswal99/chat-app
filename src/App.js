import './App.css';
import {auth,db} from './firebase'
import React, {useState,useEffect} from 'react'
import firebase from 'firebase'
import Channel from './Channel';

function App() {

  const[user,setUser] = useState(()=>auth.currentUser)
  const[initializing,setInitializing] = useState(true)

  useEffect(() => {
    const unsubscribe =auth.onAuthStateChanged(user=>{
      if(user){
        setUser(user)
      }else{
        setUser(null)
      }
    })
    if(initializing){
      setInitializing(false)
    }
    return unsubscribe
  }, [user])

  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.useDeviceLanguage()
    try{
      await auth.signInWithPopup(provider)
    }catch(error){
      console.log(error)
    }

  }

  const signout = async () => {
    try {
      await firebase.auth().signOut()
  }catch(error){
    console.log(error)
  }
  }

  if(initializing) return "loading..."

  return (
    <div className="App">
      {user?(
        <div className='homepage'>
          <div className="btndiv">
          <button onClick={signout}>SIGN OUT</button>
          </div>
      
        <Channel user={user} db={db} />
        </div>
      ):(
        <div className="card">
      <div className="nav">
        <h1>Realtime Chat Application</h1>
        <button onClick={signIn}>Sign In with Google</button>
      </div>
      </div>
      )}
     
    </div>
  );
}

export default App;
