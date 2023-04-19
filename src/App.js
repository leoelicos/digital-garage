import { useEffect } from 'react'
import CarComponent from './components/CarComponent.js'
import CarProvider from './utils/CarContext.js'
import './app.css'
export default function App() {
  useEffect(() => {
    document.title = 'Vroom'
  }, [])

  return (
    <CarProvider>
      <CarComponent />
    </CarProvider>
  )
}
