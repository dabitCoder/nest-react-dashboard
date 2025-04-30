# nest-dashboard-app

This application is a full-stack dashboard designed to provide users with insights into a list of articles. The backend serves article data with filtering and sorting capabilities, while the frontend presents this data in a user-friendly interface.

## Overview

The application consists on two main parts: 
- **Backend**: A RESTful API built to serve article data from a database, supporting filtering by author and sorting by shares or views, pagination and more.
- **Frontend**: A React application that displays articles, highlights key information, and allows users to interact with the data through filtering, sorting, and summary generation.

## Technologies
- **Backend**: Nest.js (Node.js) / Mikro ORM /  MariaDB
- **Frontend**: Vite / React / Typescript / TailwindCSS

I decided to install as few libraries as possible. I usually use redux and react-query to manage state / data fetching, but
this application was not complex enough to require them. 

# Setup Instructions
First of all, clone the repo:

```bash
git clone git@github.com:dabitCoder/nest-react-dashboard.git
cd nest-react-dashboard
```

<details>
<summary>Docker Setup (Recommended)</summary>
If you have Docker and Docker compose installed on your computer, the following steps are quite straightforward

```bash
docker-compose up --build -d
```
This will built both the backend and the frontend, creating a MariaDB database and a PHPMyAdmin service to be able to interact
with the whole backend.

### Routes for each service
- **PHPMyAdmin**: `http://localhost:81`
- **API**: `http://localhost:3000/articles` and `http://localhost:3000/authors`
- **Frontend**: `localhost`

I also included a small Docker entrypoint script that will run migrations and seeders, so you should be good to go once the docker process finishes. The MariaDB database is set up with the following defaults (which can be changed in the docker-compose.yml file):

- Database Name: articles_db
- Username: root
- Password: root
</details>

<details>
<summary>Manual Setup (Alternative)</summary>

You will need Yarn installed on your local to be able to run the project manually. You can follow the instructions on the official
site https://yarnpkg.com/getting-started/install. Once that is done, proceed with: 

```
yarn install
```

### Set up the MariaDB database:

Ensure you have MariaDB installed and running.

Create a database named articles_db (or change the name in backend/mikro-orm-config.ts).

Create a user with appropriate permissions (or use the root user for local development).

Update the database connection details in the backend/mikro-orm-config.ts file:

### Run the setup script:
I created a small script on the root package.json to help you setup everything so you don't have 
to waste a lot of time. Simply run:
```
yarn setup:environment
```

and all the tables, entities, and seeders should ran and make the API fully functional. Once that 
is done, you can simply run: 

```
yarn dev
```

And both API and frontend should be running.
</details>

### Testing
A script is included to run all application tests:
```
yarn test
```

This script executes backend integration, end-to-end (E2E), and frontend unit tests.

I aimed for a 90% coverage of the backend codebase, which can be checked by running: 
```
cd backend
yarn test:cov
```
The output of this command details coverage across all files, with a particular focus on services and controllers. 



## Project Structure
```
nest-react-dashboard/
├── backend/        # NestJS API
│   ├── src/
│   ├── ...
│   └── package.json
├── frontend/       # React/Vite App
│   ├── src/
│   ├── public/
│   ├── ...
│   └── package.json
├── docker-compose.yml # Docker setup
└── README.md
```

- **Backend**: The backend employs a "module per feature" organization, with controllers designed to be lightweight. Services handle the primary application logic.


- **Frontend**: My main goal with the frontend has been to keep components "dumb" and pages "smart". However, I found an issue that I was not able to resolve
where if I tried to fetch data from the `Summary` page or `Dashboard` it will break the application. In theory I was breaking a rule of hooks, but
after a _long_ time debugging, I got to the conclusion that React was being really picky for some reason.

# Challenges 
This project was my first experience using Yarn Workspaces, and it took some time to get everything properly configured. I believe the React issue I mentioned earlier is related to my Workspace setup.
Fortunately, the app development itself presented very few challenges. The timeline extended a bit longer than initially planned due to two factors:
- The technical issue on Monday
- My focus on comprehensive testing, particularly for the backend services

I wanted to ensure code quality through thorough testing, which required additional time but improved the overall reliability of the API .


# Summary logic
Article summaries are pre-generated using database seeders. The frontend simulates a "processing" effect when displaying summaries, providing a user-friendly experience, although the summary data is retrieved directly.

# Use of AI
I utilized Bolt.new to improve the overall design of the application. 
I also used Gemini to help me refactor / create the custom hooks to separate the fetching logic from the components.
The majority of the application's code was written manually, with occasional assistance from Cursor to resolve particularly challenging issues that exceeded a 15-minute timeframe.