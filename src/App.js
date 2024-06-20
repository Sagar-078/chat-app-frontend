import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import ProfileSection from './Pages/ProfileSection';
import OpenRoute from './Components/openRout';
import PrivateRout from './Components/privetRoute';
import Message from './Pages/Message';
import Wellcom from './Pages/Wellcom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const {user} = useSelector((state)=>state.user);
  const {socket} = useSelector((state)=>state.socket);

  //////
  useEffect(() => {

    if(user?._id){
      socket.emit("join_user_room", user?._id);
    }

    const handleBeforeUnload = () => {
      if(user?._id){
      socket.emit("leave_user_room",user?._id)
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {

      if(user?.id){
        socket.emit("leave_user_room", user?.id)
      }

      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, [user, socket]);
  return (

    <div>

      <Routes>

        
        <Route path='/' 
          element={
            <OpenRoute>
              <Home/>
            </OpenRoute>
        }/>

        <Route element={
          <PrivateRout>
            <Dashboard/>
          </PrivateRout>
        }>

          <Route path='/dashboard' element={
            
            <PrivateRout>
              <Wellcom/>
            </PrivateRout>
            
          }/>

          {/* here is the problem when in this page  */}

          <Route path='/dashboard/:id' element={
          
            <PrivateRout>
              <Message />
            </PrivateRout>
            
          }/>

        </Route>

        <Route path='/dashboard/my-profile' 
          element={
            <PrivateRout>
              <ProfileSection/>
            </PrivateRout>
        }/>

      </Routes>

    </div>

  );
}

export default App;
