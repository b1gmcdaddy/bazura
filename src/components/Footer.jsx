import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-5">
      <div className="max-w-[1240px] mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Your Restaurant Name. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer