import React from 'react'
import logo from '../../util/assets/logo.png'
import './Navbar.css'

// ~~~ This component will display logo and the app title ~~~
export const Navbar: React.FC = () => {
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