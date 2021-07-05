import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface MovieDetailsProps {
	id: string
}

export const MovieDetails = ({
	match,
}: RouteComponentProps<MovieDetailsProps>) => {
	return <div>{match.params.id}</div>
}
