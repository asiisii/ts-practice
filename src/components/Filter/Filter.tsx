import React from 'react'
import { FilterProps } from '../../util/dataTypes'
import './Filter.css'

// ~~~ Displays genres option list and controlled search form ~~~
export const Filter: React.FC<FilterProps> = ({
	searchText,
	handleChange,
	generateGenresOptions,
}) => {
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
