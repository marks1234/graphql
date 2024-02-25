# GraphQL Profile Project

## Overview

This project is a SvelteKit application designed to showcase user profiles using GraphQL to fetch and display data. It features a login system and interactive statistic graphs created with SVG to visualize user progress and achievements.

## Features

- User authentication with JWT via GraphQL.
- Dynamic profile page that displays user information including basic identification, XP amount, audit ratio, and skill progress.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- Access to the GraphQL endpoint provided by the platform.

### Installation

1. Clone the repository:

   ```bash
   git clone https://01.kood.tech/git/mkuzmina/graphql
   ```

2. Navigate to the project directory:
   ```bash
   cd graphql
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Project

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5173`.

### Hosting

The application is hosted on [your chosen platform], accessible at [your deployed URL].

## Usage

### Login Page

- The login page supports authentication using either username:password or email:password.
- Upon successful login, a JWT is obtained and used for subsequent GraphQL queries.

### Profile Page

- Displays selected user information fetched from the GraphQL API.
- Incorporates SVG graphs to visualize data, which are interactive and responsive.

## GraphQL Queries

The project utilizes various GraphQL queries to fetch data, including normal, nested, and argument-based queries.
