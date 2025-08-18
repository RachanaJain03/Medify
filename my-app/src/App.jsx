import { Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Results from "./pages/Results"
import Booking from "./pages/Booking"
import MyBooking from "./pages/myBookings"
import Navbar from "./components/Navbar"
import MyBookings from "./pages/myBookings"


function App(){
    return(
        <>
         <Navbar/>
         <Routes>
            <Route path = "/" element={<Home/>}/>
            <Route path = "/results" element={<Results/>}/>
            <Route path = "/booking/:centerId" element={<Booking/>}/>
            <Route path = "/MyBookings" element={<MyBookings/>}/>
         </Routes>
        
        
        </>
    )
}

export default App;