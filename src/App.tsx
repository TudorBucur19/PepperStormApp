import useMediaQuery from '@mui/material/useMediaQuery';
import LandingPage from './pages/LandingPage'
import './App.css'
import { useEffect } from 'react';
import useScreenSize from 'src/store/useScreenSize';


function App() {
  const matches = useMediaQuery('(max-width: 480px)');
  const checkMobile  = useScreenSize(state => state.checkMobile);
  useEffect(() => {
    checkMobile(matches);
  }, [matches])

  return (
    <LandingPage/>
  )
}

export default App
