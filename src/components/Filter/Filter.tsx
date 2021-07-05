import React from 'react'
import './Filter.css'
interface FilterProps {
	searchText: string
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	generateGenresOptions: () => JSX.Element
}

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
