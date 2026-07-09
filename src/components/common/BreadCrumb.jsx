import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumb = ({currentPageTitle,links=[]}) => {
  return (
    <nav aria-label="breadcrumb" className='mt-4'>
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        {
      links.length > 0 && links.map((link,index) => (
        <li className="breadcrumb-item " aria-current="page"><Link to={link.path}>{link.title}</Link></li>
      ))}
     <li className="breadcrumb-item active" aria-current="page"><Link to={""}>{currentPageTitle}</Link></li>
  </ol>
</nav>
  )
}

export default BreadCrumb