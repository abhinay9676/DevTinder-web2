import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Connection from "./components/Connection";
import Request from "./components/Request";



export default function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
     <Route path="/" element={<Body/>}>
     <Route path="/" element={<Feed/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/profile" element={<Profile/>}/>
     <Route path="/connection" element={<Connection/>}/>
     <Route path="/request" element={<Request/>}/>
     </Route>

      
    </Routes>

    </BrowserRouter>
    </Provider>
   
    </>
    
  )
}
