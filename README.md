# The Metropolitan Museum of Art Explorer

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

A web application for exploring artworks from The Metropolitan Museum of Art, featuring user authentication, search, favourites, and history tracking.

## Features

- Browse and search artworks from The Met collection
- View detailed information for each artwork
- User authentication (login/register)
- Save favourite artworks
- View your browsing history
- Responsive design using [React Bootstrap](https://react-bootstrap.github.io/)
- State management with [Jotai](https://jotai.org/)
- Data fetching with [SWR](https://swr.vercel.app/)

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

The project has been deployed to: 
