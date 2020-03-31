# NC-News Backend

NC-News Backend is a RESTful Api, built using Node.js and Express.js, serving up comments and articles from an SQL database. It is used to create a Reddit style social/news aggregate website called NC News.

The api is hosted live at: https://patrick-mackridge-nc-news.herokuapp.com/api

## Front End

The full version of NC News is hosted on Netlify [here](https://patrick-mackridge-nc-news.netlify.com/). The GitHub repo for the front end can be found [here](https://github.com/PatrickMackridge/nc-news-frontend).

## The Endpoints

The available endpoints for this api are:

- /api
- /api/topics
- /api/users
- /api/users/:username
- /api/articles
- /api/articles/:article_id
- /api/articles/:article_id/comments
- /api/comments/:comment_id

For more details and methods for interacting with these endpoints, please check out the [full api](https://patrick-mackridge-nc-news.herokuapp.com/api)

## The Tech Stack

- Node.js
- Express.js
- Knex.js
- PostgreSQL

## Testing

To run a test of the endpoints, run script `npm test`
To test utility functions, run script `npm run test-utils`

The testing suites used in this project are Mocha, Chai and Supertest

## Try it yourself!

Feel free to fork and clone this repository if you'd like to run it yourself, or just take a closer look at the code.

## Requirements

You must be using Node JS version 13.01.0 or higher to run this repository. Use the terminal command `node -v` to check your current version

## Running this project locally

1. Fork and clone the project

2. Install necessary dependencies by running `npm install` in the project's terminal

3. Enter the knexfile in the root directory, and update the customConfig with your own details, as shown below:

- If you are running this project from a Mac OS, no user details will be required. If you are running it on linux, you'll need to enter your PSQL details as shown below:

```js
const customConfig = {
  development: {
    connection: {
      database: "nc_news"
      //      user: ,
      //      password:
    }
  },
  test: {
    connection: {
      database: "nc_news_test"
      //      user: ,
      //      password:
    }
  }
};
```

4. Setup and seed your database using the scripts `npm run setup-dbs` followed by `npm run seed`

5. Start the server with the script `npm start`

6. Open a browser window and go to http://localhost:9090/api receive a JSON of all available endpoints and methods, with examples and explanations.

7. Enjoy those endpoints!
