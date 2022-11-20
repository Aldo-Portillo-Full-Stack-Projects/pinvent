import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'

export default function Layout({children}) {
  return (
    <>
        <Header />
          <div style={{minHeight: "8-vh"}} className="--pad">{children}</div>
        <Footer />
    </>
  )
}
