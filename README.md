# Get Reel: Wix Headless with React Native

## Introduction

Get Reel is an educational project designed to demonstrate how to integrate Wix Headless with React Native applications. This project serves as a practical guide for developers looking to leverage Wix's powerful backend services in their mobile apps.

You are viewing the `getting-started` branch, which contains only the boilerplate code. If you want to see the full implementation, check out the [`main`](https://github.com/illBeRoy/get-reel-demo/tree/main) branch.

## Features

By building this app, you will learn how to:

1. **Create a Wix Data collection**: Create a collection of videos to store your reels and consume them as a "feed"
2. **Login with Wix**: Use a Wix Login component to allow users to login to your app using Wix Members
3. **Upload Media**: Allows users to record and upload short video reels to Wix Media

## Getting Started

1. Clone the repository
2. Run `npm install` or `yarn`
3. Create an OAuthApp in your site settings, and get the client ID
4. Copy the contents of the "backend" directory into your site's code editor in manage.wix.com, and publish the changes
5. Run `npm run start` or `yarn start` to start the development server, and run the app on your device using the Expo Go app

## Key Dependencies

This project relies on several important libraries and frameworks:

- [**@wix/sdk**](https://dev.wix.com/docs/sdk/core-modules/sdk/introduction) and [**@wix/sdk-react**](https://dev.wix.com/docs/sdk/core-modules/sdk-react/introduction): Core libraries for integrating Wix Headless services.
- [**@wix/data**](https://dev.wix.com/docs/sdk/backend-modules/data/introduction): Enables interaction with Wix's database services.
- [**@wix/http-functions**](https://dev.wix.com/docs/sdk/backend-modules/http-functions/functions/introduction): Allows the use of Wix's serverless functions.
- [**wix-login-react-native**](https://github.com/illBeRoy/wix-login-react-native): Simplifies the Wix login process in React Native.

This project showcases how to build a feature-rich, social media-style app using Wix Headless' backend services for data management, media hosting and user authentication.
