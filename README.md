# AstraQuest

## LIVE HERE!! [AstraQuest](https://astra-quest.vercel.app/) 🚀🚀🚀

Welcome to the Astro Quest web application! This project was bootstrapped with [Next.js](https://nextjs.org/), providing a platform for you to interact with real Astronauts and track the location of the International Space Station.

## Getting Started Locally (Feel free to simply log in on the deployed app to check it out)

To run the application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory and install the required dependencies using the command:

   `yarn` or `npm i`

3. Reach out to <harry.fray7@gmail.com> for `.env` variables. (secure link utilizing [Doppler Share](https://share.doppler.com/))

4. Start the development server by running:

   `yarn dev` or `npm run dev`

5. Open [http://localhost:3000](http://localhost:3000/) in your browser to see the application in action.

## Authentication

Unauthenticated users are directed to a login page, where they can use third-party Single Sign On (SSO) providers like Google or Github.

This project uses the third-party NPM package [next-auth](https://www.npmjs.com/package/next-auth) for authentication.

## Home Page

Once authenticated, users are welcomed with a personalized message based on their login information.

## Features

The application provides the following features:

### Profile

Clicking on the "Profile" option in the menu takes users to their personal profile page. Here, they can view and edit their profile information.

### Astronauts

Selecting the "Astronauts" option from the menu displays a table of the current astronauts in space. The table includes two columns: "Astronaut Name" and "Craft" they are located on.

API documentation for People in Space: [Open Notify API - People In Space](http://open-notify.org/Open-Notify-API/People-In-Space)

### Astronaut Chat

Selecting an Astronaut (from the Astronauts page) will allow you to chat with that specific Astronaut on the Astronaut Chat page. This is a full chat feature supported by the OpenAI API. An initial generic question is provided for you.

Serverless repository hitting the OpenAI endpoint managed by me: [goggins-chat-api](https://github.com/HarryFray/goggins-chat-api)
API documentation for OpenAI: [OpenAI API Documentation](https://platform.openai.com/docs/introduction)

### ISS Location

Clicking on the "ISS Location" option opens a page displaying a map showing the real-time location of the International Space Station (ISS) as it orbits the Earth. Updated every second.

API documentation for ISS Current Location: [Open Notify API - ISS Location Now](http://open-notify.org/Open-Notify-API/ISS-Location-Now/)

This feature utilizes the third-party NPM package [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api).

## Deployment

To deploy the application on Vercel, use the following command:

`yarn deploy`

Alternatively, you can push to the main branch.

## All Scripts

- `dev`: Start the development server using Next.js.
- `build`: Build your Next.js application for production.
- `start`: Start your Next.js application in production mode.
- `lint`: Lint your code using the Next.js ESLint configuration.
- `deploy`: Deploy your application using Vercel.
- `test`: Run your test suite using Jest.

##

Now you're ready to explore the universe, engage with real astronauts, and learn fascinating information about the International Space Station. Happy space exploration!

For any issues or inquiries, please feel free to contact us at <harry.fray7@gmail.com>.
