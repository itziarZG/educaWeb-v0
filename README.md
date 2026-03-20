# 🎓 TutorAI - Aprendizaje Personalizado con IA

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth_%26_DB-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)

**TutorAI** is a modern, AI-powered educational platform designed to bridge the gap between digital personalization and physical learning. It generates customized worksheets (fichas) for children based on their specific grade level, school curriculum, and personal interests.

---

## 🌟 Key Features

- **🎯 Total Personalization:** Generates activities that connect school topics with your child's hobbies (e.g., math problems themed around Minecraft or space).
- **📄 Digital to Physical:** Focused on "off-screen" time. Generates high-quality PDF worksheets ready to print.
- **📊 Smart Dashboard:** Track progress, manage multiple child profiles, and view learning analytics.
- **🎮 Physical Gamification:** Includes a reinforcement system to celebrate achievements and visible progress.
- **🔐 Secure Auth:** Integrated with Supabase for secure Google and Email authentication.
- **🤖 Multi-AI Support:** Flexible backend supporting OpenAI, Google Gemini, DeepSeek, and Local LLMs (via Ollama).

---

## 🚀 Tech Stack

- **Frontend:** [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/) (using the latest `@tailwindcss/postcss`)
- **Backend/BaaS:** [Supabase](https://supabase.com/) (Auth, Database, SSR)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/), OpenAI, Google Gemini, DeepSeek, Ollama (local LLMs)
- **UI Components:** Lucide Icons, Recharts, Sonner Toasts, Embla Carousel
- **Forms:** React Hook Form + Zod
- **Utilities:** `html2pdf.js` for worksheet generation

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (preferred) or npm
- Supabase project
- AI Provider API Key (OpenAI, Google Gemini, DeepSeek, etc.) or local Ollama setup

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/itziarZG/educaWeb-v0.git
    cd educaWeb-v0
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    AI_API_KEY=your_ai_provider_key

    # Optional AI Selection
    AI_PROVIDER=openai # or 'gemini', 'deepseek', 'ollama'
    AI_MODEL=gpt-4o # or your preferred model for the chosen provider
    ```

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 📂 Project Structure

- `/app`: Next.js App Router (Pages, Layouts, API routes)
- `/components`: Reusable UI components (Buttons, Forms, Dashboard cards)
- `/context`: React Context providers (Auth, Theme)
- `/hooks`: Custom React hooks
- `/services`: API and external service logic (Supabase client, AI providers)
- `/styles`: Global CSS and Tailwind configuration
- `/types`: TypeScript definitions
- `/utils`: Helper functions and constants

---

## 📄 License

This project is private and intended for educational purposes.

---

Built with ❤️ for better learning.
