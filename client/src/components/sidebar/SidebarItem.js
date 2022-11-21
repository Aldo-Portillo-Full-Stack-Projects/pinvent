import React from 'react'
import {MdKeyboardArrowRight} from 'react-icons/md'
import {NavLink} from 'react-router-dom'

export default function SidebarItem({item, isOpen}) {

  const [expandMenu, setExpandMenu] = React.useState(false)

  const expandMenuHandler = () => setExpandMenu(!expandMenu)

  const activeLink = ({isActive}) => (
    (isActive ? "active" : "link")
  )

  const activeSublink = ({isActive}) => (
    (isActive ? "active" : "link")
  )

  if(item.childrens) {
    return (
      <div className={expandMenu? "sidebar-item s-parent open ": "sidebar-item s-parent"}>
        <div className='sidebar-title'>
          <span>
            {item.icon && <div className='icons'>{item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
          </span>
          <MdKeyboardArrowRight size={25} className="arrow-icon" onClick={expandMenuHandler}/>
        </div>
        <div className='sidebar-content'>
          {item.childrens.map((child, index) => {
            return (
              <div key= {index} className='s-child'>
                <NavLink to={child.path} className={activeSublink}>
                  <div className='sidebar-item'>
                    <div className='sidebar-title'>
                      {child.icon && <div className='icon'>{child.icon}</div>}
                      {isOpen && <div className='icon'>{child.title}</div>}
                    </div>
                  </div>
                </NavLink>
              </div>
            )
          })}
        </div>
      </div>
    )
  } else {
    return (
      <NavLink to={item.path} className={activeLink}>
        <div className='sidebar-item s-parent'>
          <div className='sidebar-title '>
              {item.icon && <div className='icon'>{item.icon}</div>}
              {isOpen && <div className='icon'>{item.title}</div>}
          </div>
        </div>
      </NavLink>
    )
  }
}
