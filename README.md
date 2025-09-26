# CreatorHub - Creator Analytics Dashboard

A comprehensive analytics dashboard for content creators to track their performance across YouTube, Instagram, and TikTok platforms.

## Features

- **Onboarding Flow**: Simple form to collect creator details and social media handles
- **Multi-Platform Analytics**: Track performance across YouTube, Instagram, and TikTok
- **Real-time Data**: Fetch fresh analytics data using Apify scrapers
- **Responsive Design**: Modern, mobile-friendly interface
- **Local Storage**: Data persistence without requiring a database

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Scraping**: Apify API
- **Deployment**: Vercel

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

The app integrates with three Apify scrapers:

- **TikTok**: `clockworks/tiktok-profile-scraper`
- **Instagram**: `apify/instagram-profile-scraper`  
- **YouTube**: `streamers/youtube-scraper`

## Environment Variables

The following environment variables are configured in the API routes:

- `APIFY_API_KEY`: Your Apify API key
- `APIFY_USER_ID`: Your Apify user ID

## Deployment

The app is configured for deployment on Vercel. Simply push to your connected GitHub repository to trigger automatic deployment.

## Usage

1. Enter your name, email, and social media handles
2. The app will fetch your analytics data from all platforms
3. View your performance metrics in the dashboard
4. Use the refresh button to get updated data

## Data Privacy

All data is stored locally in your browser's localStorage. No data is sent to external servers except for the Apify API calls to fetch your social media analytics.
