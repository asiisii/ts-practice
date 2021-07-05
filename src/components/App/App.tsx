import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from '../Home/Home'
import './App.css'

const App: React.FC = () => {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route
					path='/:id'
					render={({ match }) => {
						return <MovieDetails id={match.params.id} />
					}}
				/>
			</Switch>
		</div>
	)
}

export default App
