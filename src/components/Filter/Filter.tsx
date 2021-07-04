import React, { useState } from 'react'
import './Filter.css'
interface FilterProps {
	filterMovies: (query: string) => void
	generateGenresOptions: () => JSX.Element
}

export const Filter: React.FC<FilterProps> = ({
	filterMovies,
	generateGenresOptions,
}) => {
	const [searchText, setSearchText] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		let query = e.target.value.toLowerCase()
		setSearchText(query)
		filterMovies(query)
	}

	return (
		<section className='Filter'>
			<div className='input-container'>
				<i className='fas fa-search'></i>
				<input
					type='search'
					name='search'
					autoComplete='off'
					placeholder='Search...'
					value={searchText}
					onChange={e => handleChange(e)}
				/>
			</div>
			{generateGenresOptions()}
		</section>
	)
}
