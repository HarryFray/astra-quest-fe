# Astro Quest

Welcome to the Space Explorer web application! This project what bootstrapped with [Next.js](https://nextjs.org/), providing a platform for you to speak with real Astronauts and see the location of the international space station

## Getting Started

To run the application, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory and install the required dependencies using the command:

   ```yarn install```

3. Start the development server by running:

   ```yarn dev```

4. Open [http://localhost:3000](http://localhost:3000/) in your browser to see the application in action.

## Authentication

Unauthenticated users are directed to a login page, where they can use a third-party Single Sign On (SSO) provider Google or Github

3rd party NPM package utlized [next-auth](https://www.npmjs.com/package/next-auth)

## Home Page

Once authenticated, users are welcomed with a personalized message based on their login information.

## Features

The application provides the following features:

### Profile

Clicking on the "Profile" option in the menu takes users to their personal profile page. Here, they can view and edit their profile information.

### Astronauts

Selecting the "Astronauts" option from the menu displays a table of the current astronauts in space. The table includes two columns: "Astronaut Name" and "Craft" they are located on.

API documentation for People in Space: [Open Notify API - People In Space](http://open-notify.org/Open-Notify-API/People-In-Space)

### Astronaut


### ISS Location

Clicking on the "ISS Location" option opens a page displaying a map showing the real-time location of the International Space Station (ISS) as it orbits the Earth.

API documentation for ISS Current Location: [Open Notify API - ISS Location Now](http://open-notify.org/Open-Notify-API/ISS-Location-Now/)

3rd party NPM package utlized: [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api)

### Logout

Users can easily log out from the application by selecting the "Logout" option in the menu. This action redirects them back to the login page.

## Deployment

To deploy the application on Vercel, use the following command:

```yarn deploy```

or push to main

Now you're ready to explore the universe and learn fascinating information about astronauts and the International Space Station. Happy space exploration!

For any issues or inquiries, please feel free to contact us at <harry.fray7@gmail.com>.
