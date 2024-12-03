import React, { useState } from 'react'
import './DropDownMenu.css'

interface DropDownMenuProps {
  title: string
  content: string[]
  menuStates: boolean[]
  setMenuStates: React.Dispatch<React.SetStateAction<boolean[]>>
  price: string
  buttonIs: boolean
  img: string
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  title,
  content,
  menuStates,
  setMenuStates,
  price,
  buttonIs,
  img,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    const newMenuStates = menuStates.map((state, index) =>
      index === menuStates.indexOf(true) ? !state : state
    )
    setMenuStates(newMenuStates)
    setIsOpen(!isOpen)
  }

  return (
    <div className='drop-down-wrapper'>
      <div
        className={`drop-down-menu ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <p className='drop-down-menu-title-text'>{title}</p>
        <p>{price}</p>
        <img
          src='./img/arrow_down.png'
          alt='arrow'
          className='animated-arrow'
        />
      </div>
      <div className={`dropdown-content ${isOpen ? 'open' : ''}`}>
        <ul>
          <div className='lines'></div>
          {content.map((item, index) => (
            <li key={index}>
              {buttonIs && index === content.length - 1 ? (
                <>
                  <span>{item}</span>
                </>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
        <img src={img} alt='services-drop-down' className='image-animation' />
      </div>
    </div>
  )
}

export default DropDownMenu
