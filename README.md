# NASA Astronomy Picture of the Day - React, Apollo GraphQL & Netlify Lambda Functions Tutorial

## Tutorial Start

1. Create and/or login to github account, create new repository & copy web URL

2. Create React App

`npx create-react-app .`

3. Install dependencies

`npm i apollo-server-lambda graphql @apollo/react-hooks apollo-boost axios`

4. Install netlify-lambda as a dev dependency

`npm i -D netlify-lambda`

5. Create netlify-lambda scripts in package.json

```
   "scripts": {
      "start": "react-scripts start",
      "start:lambda": "netlify-lambda serve src/lambda",
      "build": "react-scripts build",
      "build:lambda": "netlify-lambda build src/lambda",
   }
```

6. Create graphql directory and schema.js file under the src directory
7. Import gql from apollo-server-lambda, create type definitions, create query resolver

```
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
```

8. Create lambda directory under the src directory
9. Import ApolloServer from apollo-server-lambda, import typeDefs & resolvers from schema, create new ApolloServer and export the server handler

```
import { ApolloServer } from 'apollo-server-lambda'
import { typeDefs, resolvers } from '../graphql/schema'

const server = new ApolloServer({
   typeDefs,
   resolvers,
   playground: true,
   introspection: true
})

export const handler = server.createHandler({
   cors: {
      origin: '*',
      credentials: true
   }
})
```

10. Create components directory and Apod.js component file under the src directory
11. Import gql from apollo-boost, import useQuery from @apollo/react-hooks, create GET_APOD query, de-structure loading, data, error from the useQuery hook, return a loading message if loading is true, return an error message if error is true, de-structure title, hdurl and explanation from the getAPOD data response & create JSX

```
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
```

12. Clean up App.js file, import Apod component & create Apod JSX element

```
import React from 'react'
import './App.css'
import Apod from './components/Apod'

const App = () => {
  return (
    <div className='App'>
      <Apod />
    </div>
  )
}

export default App
```

13. Delete everything in App.css and add styling

```
main {
  display: flex;
  justify-content: center;
}

.container {
  width: 75%;
  border: 0.15rem solid #f1f1f1;
  padding: 1rem;
  margin: 1rem;
  text-align: center;
}

h1 {
  color: #0b3d91;
}

h3 {
  color: #fc3d21;
}

img {
  width: 100%;
  border-radius: 0.25rem;
}

@media (min-width: 1025px) {
  .container {
    width: 50%;
  }
}
```

14. Create netlify.toml file under the root directory

```
[build]
  functions = "built-lambda"
  publish = "build"
```

15. Create React build

`npm run build`

16. Build lambda functions

`npm run build:lambda`

17. Generate NASA Api key from https://api.nasa.gov/

18. Push changes to git repository

`git add .`

`git commit -m "Created NASA Astronomy Pic of the Day app with React, Apollo GraphQL & Netlify Lambda!"`

`git push origin master`

19. Create new Netlify site from git and authorize/login

20. Update environment variables with the NASA Api key
