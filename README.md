# Club Register App

## Overview

This app prototype is designed for managing sport events designed for martial arts competitions and includes features such as:

- accounts for admin club and user
- creating, aditing users by clubs
- entering competitions
- creating announcement,collecting competitions entries
- selecting and printing competition members and clubs

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

## Prerequisities

### Wymagania wstępne

- Node.js >= 14.0.0.
- npm or yarn package manager

### Struktura projektu

    src/: Główne pliki aplikacji.
       components/: Komponenty React używane w aplikacji.
       services/: Funkcje do komunikacji z API.
       styles/: Pliki CSS.
    public/: Pliki statyczne.
    package.json: Zdefiniowane zależności i skrypty.

### API

Aplikacja korzysta z zewnętrznych API do uzyskiwania danych o lokalizacji, wyszukiwaniu obiektów i prognoz pogody

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

###### Club Register App © 2024 by MK is licensed under CC BY-NC-ND 4.0 -->
