# eCommerce API Key Setup Guide

This guide will walk you through the process of obtaining and using the API key from "https://newsapi.org/" for the "eCommerce" project using dotenv and npm.

## Prerequisites

Before you proceed, make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)

## Step 1: Clone the eCommerce Project

To get started, clone the "eCommerce" project from the GitHub repository. You can do this using the following command:

```bash
git clone https://github.com/IlyPoh/eCommerce.git
```

## Step 2: Navigate to the Project Directory

Change your working directory to the "eCommerce" project:

```bash
cd eCommerce
```

## Step 3: Install Required Dependencies

Now, install the required npm dependencies for the project:

```bash
npm install
```

## Step 4: Obtain NewsAPI.org API Key

To use the NewsAPI.org service, you need to obtain an API key. Here's how you can get one:

1. Go to "https://newsapi.org/"
2. Sign up for a free account or log in if you already have one.
3. Once you're logged in, you should see your API key on the dashboard.

## Step 5: Create a .env File

In the root directory of the "eCommerce" project, create a new file called `.env`.

```bash
touch .env
```

## Step 6: Set the API Key in the .env File

Open the `.env` file in a text editor, and add the following line:

```
VITE_NEWS_API_KEY = YOUR_API_KEY_HERE
```

Replace `YOUR_API_KEY_HERE` with the API key you obtained from NewsAPI.org in Step 4.

Save and close the file.

## Step 7: Start the Development Server

With the API key set up in the .env file, you can now start the development server and run your "eCommerce" project:

```bash
npm run dev
```

Your project should now be running, and it will be able to access the NewsAPI.org services using the provided API key from the .env file.

Remember to keep your API key secure and avoid sharing it publicly, as it grants access to your NewsAPI.org account.

That's it! You have successfully set up the NewsAPI.org API key for your "eCommerce" project using dotenv and npm.

Happy coding! 🚀
