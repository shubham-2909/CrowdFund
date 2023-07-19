import { Routes, Route } from 'react-router-dom'
import { Home } from './pages'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
function App() {
  return (
    <div className='relative sm:-8 p-4  min-h-screen flex flex-row color-white bg-[#13131a]'>
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar />
      </div>

      <div className='flex-1 max-sm: w-full max-w-[1280px]mx-auto sm: pr-5'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
