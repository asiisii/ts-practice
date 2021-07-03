import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from '../Home/Home'
// import defaultImage from '../../assets/moviePosterImages/defaultImage.jpeg'
import './App.css'

const App: React.FC = () => {

	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={Home} />
			</Switch>
		</div>
	)
}

export default App
