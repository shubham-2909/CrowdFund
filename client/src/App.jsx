import { Routes, Route } from 'react-router-dom'
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CreateRequest from './pages/CreateRequest'
import RequestList from './pages/RequestList'
function App() {
  return (
    <div className='relative sm:-8 p-4  min-h-screen flex flex-row color-white bg-[#13131a]'>
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar />
      </div>

      <div className='flex-1 max-sm: w-full max-w-[1280px]mx-auto sm: pr-5'>
        <Navbar />
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/create-campaign' element={<CreateCampaign />} />
          <Route
            path='/campaign-details/:address'
            element={<CampaignDetails />}
          />
          <Route
            path='/campaign-details/:address/requests'
            element={<RequestList />}
          />
          <Route
            path='/campaign-details/:address/requests/new'
            element={<CreateRequest />}
          />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
