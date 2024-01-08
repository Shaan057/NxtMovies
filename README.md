# Nxt Movies

### Introduction

> Keywords: `React`,`Front-end`

- Developed the frontend part of the NxtWatch an `NETFLIX` clone application.
- This application allows users to log in, search and view details of the movies.
- Concepts such as authentication, state management, context, page navigation, media queries and flexbox concepts in the code by following the clean code guidelines.

### Technical Aspects

> Keywords: `Authentication`, `Validation`, `Cookies`

- Implemented a basic authentication flow and handled common errors such as invalid username and invalid password.
- Used cookies to persist user credentials across page reloads.

### State Management and Navigation:

> Keywords: `State management`, `Navigation`, `Protected Route` Used

- Context for state management for creating a global state to manage cart state across routes.Used React Router for navigation within the application.
- Additionally, implemented protected routes to control access based on user roles.`

### API Integration:

> Keywords: API Integration

- Integrated mock APIs for displaying data

### Clean Code Guidelines:

> Keywords: `Clean code guidelines`

- Followed clean code guidelines by maintaining a consistent folder structure and used meaningful naming conventions, such as `prefixing` event handlers with `on` and creating `reusable` components throughout the application.

### Responsiveness:

> Keywords: `Responsiveness`,

- `Flexbox` To ensure a responsive design, used `media queries` and `flexbox` for layouting.

#### Design Files

<details>
<summary>Click to view</summary>

- You can check the **Design Files** for different devices <a href="https://www.figma.com/file/tPdVlj0p5PESmymNkHYVgk/Movies_App?node-id=0%3A1" target="_blank">here</a>.

</details>

### Set Up Instructions

<details>
<summary>Click to view</summary>

- Download dependencies by running `npm install`
- Start up the app using `npm start`
</details>

### Functionality

<details>
<summary>Click to view</summary>
<br/>

- **Login Route**

  - When an invalid username and password are provided and the **Login** button is clicked, then the respective error message received from the response is displayed
  - When a valid username and password are provided and the **Login** button is clicked, then the page is navigated to the Home Route
  - When an _unauthenticated_ user tries to access the Home Route, Popular Route, Search Route, Account Route and Movie Item Details Route, then the page is navigated to Login Route
  - When an _authenticated_ user tries to access the Home Route, Popular Route, Search Route, Account Route and Movie Item Details Route, then the page is navigated to the respective route
  - When an _authenticated_ user tries to access the Login Route, then the page is navigated to the Home Route

- **Home Route**

  - When an authenticated user opens the Home Route,

    - An HTTP Get request is made to **Trending Now Movies API URL**, **Originals API URL** with `jwt_token` in the Cookies

      - **_Loader_** is displayed while fetching the each data
      - After the data is successfully fetched from both the API's
        - A **random** movie title and movie poster with its details is displayed from the **Originals Response**
        - Display the list of movies received from the Trending Now Movies Response
        - Display the list of movies received from the Originals Response
      - If any of the HTTP GET request made is unsuccessful, then the failure view given in the **Figma** screens is displayed respectively
        - When the **Try Again** button is clicked, then the respective HTTP GET request is made

        - When a **Movie** item is clicked, then the page is navigated to the Movie Item Details Route

      - An HTTP Get request is made to **Top Rated Movies API URL** as well

      - **_Loader_** is displayed while fetching the data
      - After the data is successfully fetched from the API
        - Display the list of movies received from the top rated movies response
      - If the HTTP GET request made is unsuccessful, then the failure view given in the **Figma** screens is displayed
        - When the **Try Again** button is clicked, then the HTTP GET request is made to **Top Rated Movies API URL**

      - Users can browse popular movies & searched movies using pagination buttons.

  - **Header**

    - When the **Movies** logo in the header is clicked, then the page is navigated to the Home Route
    - When the **Home** link in the Header is clicked, then the page is navigated to the Home Route
    - When the **Popular** link in the header is clicked, then the page is navigated to the Popular Route
    - When the **Search** icon in the header is clicked, then the page is navigated to the Search Route
    - When the **Profile** logo in the header is clicked, then the page is navigated to the Account Route

- **Popular Route**

  - When an authenticated user opens the Popular Route

    - An HTTP GET request is made to **Popular Movies API URL** with `jwt_token` in the Cookies

      - **_Loader_** is displayed while fetching the data
      - After the data is fetched successfully, the response received is displayed
      - If the HTTP GET request made is unsuccessful, then the failure view given in the **Figma** screens is displayed
        - When the **Try Again** button is clicked, an HTTP GET request is made to **Popular Movies API URL**

    - When a **Movie** item is clicked, then the page is navigated to the Movie Item Details Route
    - All the header functionalities mentioned in the Home Route works in this route accordingly

- **Movie Item details Route**

  - When an authenticated user opens the Movie Item Details Route

    - An HTTP GET request is made to **Movie Item Details API URL** with `jwt_token` in the Cookies

      - **_Loader_** is displayed while fetching the data
      - After the data is fetched successfully,
        - Movie item details received from the response is displayed
        - Display the list of similar movies received from the response
      - If the HTTP GET request made is unsuccessful, then the failure view given in the **Figma** screens is displayed
        - When the **Try Again** button is clicked, an HTTP GET request is made to **Movie Item Details API URL**

    - All the header functionalities mentioned in the Home Route works in this route accordingly

- **Search Route**

  - When an authenticated user opens the Search Route

    - When a value is provided in the search input and the button with the search icon is clicked

      - Make an HTTP GET request to the **Search Movies API URL** with `jwt_token` in the Cookies and query parameter `search` with value as the text provided in the search input
      - **_Loader_** is displayed while fetching the data
      - After the data is fetched successfully, display the list of movies received from the response
      - If the HTTP GET request made is unsuccessful, then the failure view given in the **Figma** screens is displayed
        - When the **Try Again** button is clicked, an HTTP GET request is made to **Search Movies API URL**
      - When the HTTP GET request made to the **Search Movies API URL** returns an empty list for movies then **Search no results** view is displayed

    - When a **Movie** item is clicked, then the page is navigated to the Movie Item Details Route
    - All the header functionalities mentioned in the Home Route  works in this route accordingly

- **Account Route**

  - When an authenticated user opens the Account Route

    - The username which was provided in the login, is displayed
    - The password which was provided in the login, is displayed in masked
    - When the **Logout** button is clicked, then the page is navigated to the Login Route

  - All the header functionalities mentioned in the Home Route  works in this route accordingly

- **Not Found Route**

  - When a random path is provided as the URL, then the page  navigates to the Not Found Route

- Users is able to view the website responsively in mobile view, tablet view as well

</details>

**Login API**

#### API: `https://apis.ccbp.in/login`

**Trending Now Movies API**

#### API: `https://apis.ccbp.in/movies-app/trending-movies`

**Top Rated Movies API**

#### API: `https://apis.ccbp.in/movies-app/top-rated-movies`

#### API: `https://apis.ccbp.in/movies-app/originals`

#### API: `https://apis.ccbp.in/movies-app/popular-movies`

#### API: `https://apis.ccbp.in/movies-app/movies/{movieId}`

**Search Movies API**

#### API: `https://apis.ccbp.in/movies-app/movies-search?search={searchText}`

</details>

### User Credentials

<details>
<summary>Click to view user credentials</summary>

<br/>

```text
 username: rahul
 password: rahul@2021
```

<br/>
</details>

### Visit

### [Link](https://moviesapprjs.ccbp.tech/)
