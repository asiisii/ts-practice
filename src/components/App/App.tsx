import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from '../Home/Home'
import { MovieDetails } from '../MovieDetails/MovieDetails'
import './App.css'

const App: React.FC = () => {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/:id' component={MovieDetails} />
			</Switch>
		</div>
	)
}

export default App
