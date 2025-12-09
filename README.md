# AI Nutritionist - RAG-Powered Fitness Chatbot

A production-ready, intelligent nutritionist chatbot for athletes that combines RAG (Retrieval Augmented Generation) with comprehensive fitness tracking.

## Features

- **AI-Powered Chat**: Personalized nutrition advice using Groq's Llama 3.3 70B with RAG
- **Fitness Metrics Tracking**: Weight, body fat, muscle mass, workout performance, and recovery scores
- **Nutrition Logging**: Track calories and macronutrients (protein, carbs, fats)
- **Progress Visualization**: Beautiful charts showing trends over time
- **Knowledge Base**: Upload nutrition guidelines, meal plans, and fitness protocols
- **Smart Retrieval**: Keyword-based retrieval of relevant information from knowledge base
- **User Authentication**: Secure login and signup with Supabase Auth
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS + Vite
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **AI**: Groq API with Llama 3.3 70B Versatile model
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## Setup Instructions

### 1. Groq API Key

The application uses Groq API for ultra-fast AI chat responses. The API key is already configured:

- **Secret Name**: `chatbot`
- **API Key**: Pre-configured in the edge functions
- **Model**: Llama 3.3 70B Versatile (lightning-fast inference)

The Supabase environment variables are already configured in the `.env` file.

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

### 4. Build for Production

\`\`\`bash
npm run build
\`\`\`

## Usage Guide

### Getting Started

1. **Sign Up**: Create an account with your email, name, and fitness profile
2. **Log Metrics**: Click "Log Metrics" to enter your weight, body composition, and performance scores
3. **Log Nutrition**: Click "Log Nutrition" to track your meals and macros
4. **Chat with AI**: Ask questions about nutrition, meal plans, or your progress
5. **Upload Knowledge**: Add nutrition guidelines and fitness protocols to enhance AI responses

### Example Chat Prompts

- "Based on my current weight and body fat, what should my daily protein intake be?"
- "Create a meal plan for me to support muscle building"
- "How am I progressing towards my fitness goal?"
- "What adjustments should I make to my nutrition based on my recent recovery scores?"

### Knowledge Base

The AI nutritionist learns from documents you upload:

1. Go to the "Knowledge Base" tab
2. Enter a title and select document type
3. Paste your content (nutrition guidelines, meal plans, protocols)
4. Click "Upload Document"

The system will:
- Chunk the document for optimal processing
- Store content in Supabase database
- Use keyword-based search for retrieval
- Automatically retrieve relevant information during chat

## Database Schema

- **athletes**: User profiles with fitness goals and dietary restrictions
- **fitness_metrics**: Body composition and performance data
- **nutrition_logs**: Daily meal and macro tracking
- **chat_messages**: Conversation history
- **knowledge_base**: Document chunks for RAG retrieval

## Security

- Row Level Security (RLS) enabled on all tables
- Athletes can only access their own data
- Authentication required for all operations
- Secure API key management via Supabase secrets

## Cost Estimates

For 100 active athletes with Groq API:

- Groq API: **FREE** (generous free tier)
- Supabase: Free tier (up to 500MB database)

**Total: $0/month** (within free tiers)

Groq offers ultra-fast inference with their free tier, making this an extremely cost-effective solution for MVPs and small to medium deployments.

## License

MIT
