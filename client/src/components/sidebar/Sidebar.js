import "./Sidebar.scss"
import {RiProductHuntLine} from 'react-icons/ri'
import {HiMenuAlt3} from 'react-icons/hi'
import menu from "../../data/sidebar"
import SidebarItem from "./SidebarItem"
import React from "react"

export default function Sidebar({children}) {

  const [isOpen, setIsOpen] = React.useState(true)

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='layout'>
        <div className='sidebar' style={{ width: isOpen ? "230px": "60px"}}>
            <div className="top_section">
              <div className="logo" style={{display: isOpen ? "block": "none"}}>
                <RiProductHuntLine size={35} style={{cursor: "pointer"}}/>
              </div>
              <div className="bars" style={{marginLeft: isOpen ? "135px" : "0px"}}>
                <HiMenuAlt3 size={35} onClick = {toggle} style={{cursor: "pointer", }}/>
              </div>
            </div>
        </div>
        <main>
            {children}
        </main>
    </div>
  )
}
