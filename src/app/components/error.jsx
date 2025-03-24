import React from 'react'

const Error = () => {
  return (
    <header className="bg-gray-500 text-white py-4 px-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img src="logo.png" alt="Stacey" className="h-8 mr-4" />
        <h1 className="text-xl font-bold">Stacey</h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:text-gray-400">Home</a></li>
          <li><a href="#" className="hover:text-gray-400">About</a></li>
          <li><a href="#" className="hover:text-gray-400">Services</a></li>
          <li><a href="#" className="hover:text-gray-400">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
  )
}

export default Error
