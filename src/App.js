import React, { useEffect } from 'react'
import CarComponent from './components/CarComponent.js'
// Importing our theme provider which will make our global state available to child components
import CarProvider from './utils/CarContext.js'

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
