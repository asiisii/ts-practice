import React from 'react'
import logo from '../../assets/logo.png'
import './Navbar.css'
interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
		<header className='Navbar'>
			<div className='logo-title-wrapper'>
				<div className='logo'>
					<img src={logo} alt='chartflix logo' />
				</div>
				<span>ChartFlix</span>
			</div>
		</header>
	)
}