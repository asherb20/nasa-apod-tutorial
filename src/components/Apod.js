import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const GET_APOD = gql`
  query GetAPOD {
    getAPOD {
      explanation
      hdurl
      title
    }
  }
`

const Apod = () => {
  const { loading, data, error } = useQuery(GET_APOD)

  if (loading) return <p>Loading...</p>

  if (error) return <p>Whoops! An error occurred. Please refresh the page.</p>

  const { title, hdurl, explanation } = data.getAPOD

  return (
    <div className='container'>
      <div className='container-item'>
        <h1>NASA Astronomy Picture of the Day</h1>
      </div>
      <div className='container-item'>
        <h3>{title}</h3>
      </div>
      <div className='container-item'>
        <img src={hdurl} alt='NASA APOD' />
      </div>
      <div className='container-item'>
        <p>{explanation}</p>
      </div>
    </div>
  )
}

export default Apod
