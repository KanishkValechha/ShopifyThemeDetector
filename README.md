# Shopify Theme Detector

A modern web application that identifies the theme being used on any Shopify store. This tool helps developers, designers, and e-commerce professionals analyze Shopify stores quickly and accurately.

![Shopify Theme Detector Demo](./Demo/ThemeDetector.mp4)

## Features

- Detect theme name, ID, and schema version from any Shopify store URL
- Modern, animated UI with smooth transitions
- Cross-origin request handling via built-in proxy server
- Copy results with a single click
- Responsive design for all device sizes

## Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Animation**: Framer Motion
- **Backend**: Bun + Hono for lightweight proxy server
- **Build Tool**: Vite

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) for running the server component

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/shopify-detector.git
   cd shopify-detector
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

3. Create a `.env` file in the project root (optional - for custom configuration):
   ```
   PORT=3001
   ```

## Usage

### Using Bun (Recommended)

Bun offers faster startup times and better performance:

1. Install dependencies:

   ```bash
   bun install
   ```

2. Start the development client:

   ```bash
   bun run dev
   ```

3. In a separate terminal, start the proxy server:

   ```bash
   bun run dev:server
   ```

4. For production:
   ```bash
   bun run build
   bun run server
   ```

### Using NPM

### Development

1. Start the development server:

   ```bash
   npm run dev
   ```

2. In a separate terminal, start the proxy server:

   ```bash
   npm run dev:server
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Production

1. Build the project:

   ```bash
   npm run build
   ```

2. Start the production server:

   ```bash
   npm run server
   ```

3. Access the application at `http://localhost:3001`

## How It Works

1. Enter a Shopify store URL (e.g., `https://shop.in-n-out.com/`)
2. The application sends the URL to the proxy server
3. The proxy server fetches the HTML content from the target site
4. The application parses the HTML to extract Shopify theme information
5. Results are displayed in a clean, intuitive interface

## API Reference

### Proxy Server

- **Endpoint**: `/api/fetch`
- **Method**: GET
- **Query Parameters**:
  - `url` (required): The Shopify store URL to analyze
- **Example**:
  ```
  GET /api/fetch?url=https://shop.in-n-out.com/
  ```

## Project Structure

```
/
├── public/
│   └── ...static assets
├── src/
│   ├── components/
│   │   ├── ErrorMessage.tsx
│   │   ├── LoadingIndicator.tsx
│   │   ├── ThemeDetectorForm.tsx
│   │   └── ThemeResultDisplay.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── server.ts
│   └── themeDetector.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure:

1. The proxy server is running
2. The URL is correctly formatted (including the protocol)

### Theme Not Detected

Some Shopify stores may:

1. Use customized themes that hide identifiable information
2. Implement security measures that block scraping attempts
3. Not include standard Shopify theme metadata in their source code

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

---

Built with ❤️ using React, TypeScript, and Bun
