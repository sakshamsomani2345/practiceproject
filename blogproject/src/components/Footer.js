import React from 'react'

function Footer() {
  return (
    <>
     <div className="line"></div>
    <div className='footer'>
      <div className="leftfooter">
      <div className="logo">
        <h2><span className="logo_heading">Saksham's </span>Blog</h2>
      </div>
      </div>
      <div className="rightfooter">
        <div className="aboutfooter">
            <div className="aboutheading">ABOUT</div>
            <li>100 JS Projects</li>
            <li>Saksham's Blog</li>
        </div>
        <div className="follow">
        <div className="aboutheading">FOLLOW US</div>

            <li>Github</li>
            <li>Discord</li>
        </div>
        <div className="legal">
        <div className="aboutheading">LEGAL</div>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            
        </div>
        
      </div>
    </div>
    <div className="line"></div>
    </>
  )
}

export default Footer
