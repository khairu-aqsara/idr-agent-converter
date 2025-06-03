
# IDR Currency Converter

![Screenshot 2025-06-03 at 11 55 37](https://github.com/user-attachments/assets/530c9294-5fef-40c7-968f-ca3b14d61179)


A Next.js web application that acts as an AI-powered currency converter, specializing in converting Indonesian Rupiah (IDR) to various global currencies. The application features a chat-based interface where users can request conversions or general IDR exchange rates.

## Features

- **AI-Powered Conversions**: Uses Genkit and a language model to understand user queries and provide currency conversions.
- **Multiple Currencies**: Converts IDR to GBP, USD, MYR, AUD, SGD, JPY, EUR, CAD, CHF, and NZD.
- **Table Format Output**: Displays conversion results in a clear, well-formatted table including currency flags, codes, names, exchange rates, and the converted amount.
- **Chat Interface**: Modern and interactive chat window for user interaction.
- **Light/Dark Mode**: User-selectable theme preference (Light: Red on White, Dark: Blue theme).
- **Responsive Design**: Adapts to various screen sizes.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: React, ShadCN UI components
- **Styling**: Tailwind CSS
- **AI**: Genkit (with Google AI)
- **Linting/Formatting**: ESLint, Prettier (implied by Next.js setup)

## Getting Started

### Prerequisites

- Node.js (version 20.x or later recommended)
- npm or yarn

### Setup

1.  **Clone the repository (if applicable) or ensure you have the project files.**

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root of your project. You may need to add API keys or other environment-specific configurations here, especially for Genkit and Google AI services.
    Example `.env` (ensure you have a `GOOGLE_API_KEY` for Genkit to work with Google AI):
    ```env
    GOOGLE_API_KEY=YOUR_GOOGLE_AI_API_KEY
    ```

### Running the Development Server

To run the Next.js development server (for the frontend):

```bash
npm run dev
```

This will typically start the application on `http://localhost:9002`.

To run the Genkit development server (for the AI flows, if you need to test/debug them separately or if you are using features that require the Genkit development flow inspector):

```bash
npm run genkit:dev
```

This will start the Genkit inspector, usually on `http://localhost:4000`. Note: For this application, the AI flows are server-side and invoked by the Next.js backend, so `npm run dev` should be sufficient for most testing.

## Available Scripts

-   `npm run dev`: Starts the Next.js development server with Turbopack.
-   `npm run genkit:dev`: Starts the Genkit development server.
-   `npm run genkit:watch`: Starts the Genkit development server with file watching.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts a Next.js production server (after building).
-   `npm run lint`: Runs ESLint to check for code quality issues.
-   `npm run typecheck`: Runs TypeScript compiler to check for type errors.

## AI Functionality

The application uses [Genkit](https://firebase.google.com/docs/genkit) to power its AI capabilities. Specifically:

-   `src/ai/flows/answer-question.ts`: Contains the main Genkit flow that interprets user requests for IDR currency conversions. It uses a language model to understand the query, determine the IDR amount (or use a default), and generate a Markdown table with conversions to the supported currencies.
-   `src/ai/flows/handle-no-answer.ts`: Provides a fallback response if the AI cannot fulfill the user's request or if the query is outside its specialization.
-   `src/ai/genkit.ts`: Configures the Genkit instance and the AI model to be used (e.g., `googleai/gemini-2.0-flash`).

The AI prompt is designed to provide plausible exchange rates. These are not live rates and are for demonstration purposes.

## Project Structure

-   `src/app/`: Main Next.js application directory (App Router).
    -   `page.tsx`: The main page component.
    -   `layout.tsx`: The root layout component.
    -   `globals.css`: Global styles and Tailwind CSS theme configuration.
-   `src/components/`: Reusable React components.
    -   `chat/`: Components specific to the chat interface (`ChatWindow`, `ChatMessage`, `ChatInput`).
    -   `ui/`: ShadCN UI components.
    -   `ThemeToggle.tsx`: Component for switching between light and dark themes.
-   `src/ai/`: Genkit related files.
    -   `flows/`: Contains the Genkit flow definitions.
    -   `genkit.ts`: Genkit AI instance configuration.
    -   `dev.ts`: Entry point for Genkit development server.
-   `src/lib/`: Utility functions.
-   `src/hooks/`: Custom React hooks.
-   `public/`: Static assets.
-   `tailwind.config.ts`: Tailwind CSS configuration.
-   `next.config.ts`: Next.js configuration.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

(This is a basic README. You can expand it further with deployment instructions, more detailed explanations of specific features, or troubleshooting tips as needed.)
