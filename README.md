# My Navigator

**My Navigator** is a web application that allows users to check their current location, search for nearby places, display them on a map, and view a three-day weather forecast.

## Features

- **Check current location**: Users can view their current position on the map.
- **Search for nearby places**: Search for points of interest (e.g., restaurants, shops, etc.) in the vicinity.
- **Display map**: View nearby places on an interactive map.
- **Weather forecast**: Get a three-day weather forecast for a selected location.

## Preview

You can test the app at the following link:

- **Preview:** [Navigator](https://navigator.ovh/)

## Video Demonstration

[![Obrazek](https://firebasestorage.googleapis.com/v0/b/my-dojo-web.appspot.com/o/git-pictures%2FNavigator.png?alt=media&token=d76e5016-343b-4d8d-bad6-2805e37945df)](https://vimeo.com/1041583293?share=copy#t=0)

## Local Setup

To run this project locally, follow these steps:

1.Clone the repository:

```
git clone https://github.com/Monika464/navigator2--2022
```

2.Enter folder

```
cd navigator2--2022
```

2.Install dependencies:

```
npm install
```

3.Start the development server:

```
npm run dev
```

### Prerequisities

- Node.js >= 14.0.0.
- npm or yarn package manager

### Struktura projektu

    src/: Main application files
       components/:  React components used in the app
       services/: Functions for API communication
       styles/: CSS files
    public/:  Static files
    package.json: Contains dependencies and scripts

### API

The app uses external APIs to fetch location, nearby places, and weather data.

## Scripts

    - npm run start: Start the app in production mode.
    - npm run dev: Start the app in development mode using nodemon.
    - npm run test: Run the tests using Jest.

## Technologies:

| Tech                    | Use                                      |
| ----------------------- | ---------------------------------------- |
| React                   | A framework for building user interfaces |
| REST API                | Used for backend communication           |
| React Router DOM        | For route management in the application  |
| React Copy to Clipboard | Enables copying data to the clipboard    |

###### Navigator © 2024 by MK
