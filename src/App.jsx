import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";



export default function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
     <Route path="/" element={<Body/>}>
     <Route path="/" element={<feed/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/profile" element={<Profile/>}/>
     </Route>

      
    </Routes>

    </BrowserRouter>
    </Provider>
   
    </>
    
  )
}
