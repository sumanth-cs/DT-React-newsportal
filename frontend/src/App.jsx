import React from 'react'
import { Button } from './components/ui/button'

const App = () => {
  return (
    <div className="bg-blue-500 text-white p-4 text-xl font-bold">
      Tailwind is working! 🎉
      <div className="flex flex-col items-center justify-center min-h-svh">
      <Button className="bg-red-500">Click me</Button>
    </div>
    </div>
  )
}

export default App