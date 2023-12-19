import AppRouter from './routers'
import  { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div className='app-wrapper'>
      <AppRouter/>
      <Toaster />
    </div>
  )
}

export default App