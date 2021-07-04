import React, { useState } from 'react'
import './Filter.css'
interface FilterProps {}

export const Filter: React.FC<FilterProps> = () => {
	const [searchText, setSearchText] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setSearchText(e.target.value)
	}

	return (
		<section className='Filter'>
			<input
				type='search'
				name='search'
				autoComplete='off'
				placeholder='Search...'
				value={searchText}
				onChange={e => handleChange(e)}
			/>
		</section>
	)
}
