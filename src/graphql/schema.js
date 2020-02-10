import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
  type Query {
    getAPOD: APOD
  }

  type APOD {
    explanation: String!
    hdurl: String!
    title: String!
  }
`

export const resolvers = {
  Query: {
    getAPOD: async () => {
      try {
        const res = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
        )

        const { explanation, hdurl, title } = res.data

        return {
          explanation,
          hdurl,
          title
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}
