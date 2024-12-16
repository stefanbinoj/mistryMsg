import React from 'react'

function Footer() {
  return (
      <div className="container mt-5">
    <hr />
  <footer className="py-3 my-4 text-slate-950 ">
    <ul className=" flex justify-center border-bottom pb-3 mb-3">
      <li className="nav-item"><a href="#" className="nav-link px-2 ">Home</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 ">Features</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 ">Pricing</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 ">FAQs</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 ">About</a></li>
    </ul>
    <p className="text-center ">© 2021 Company, Inc</p>
  </footer>
</div>
  )
}

export default Footer