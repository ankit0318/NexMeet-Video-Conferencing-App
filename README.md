# <img src="./public/icons/yoom-logo.svg" alt="NexMeet Logo" width="30" height="30" style="vertical-align: middle;"> NexMeet

<div align="center">
  
  ![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black?style=flat-square&logo=next.js)
  ![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-06B6D4?style=flat-square&logo=tailwind-css)
  
  **A modern, secure video conferencing platform built with Next.js and Stream.io**
  
  [Features](#features) • [Live Demo](#live-demo) • [Installation](#installation) • [Usage](#usage) • [Tech Stack](#tech-stack)
  
  ![NexMeet Preview](./public/images/hero-background.png)
</div>

## 🚀 Features

- **🔒 Secure Authentication** - Powered by Clerk
- **🎯 Personal Meeting Rooms** - Every user gets their dedicated room
- **📅 Meeting Scheduling** - Plan meetings with convenient scheduling tools
- **🎥 High-Quality Video** - Crystal-clear video and audio experience
- **🔄 Meeting History** - Access previous and upcoming meetings
- **📱 Responsive Design** - Seamless experience across all devices
- **🎭 Screen Sharing** - Share your screen with participants
- **💾 Meeting Recordings** - Record and access past meetings

## 🌐 Live Demo

[Visit NexMeet](https://nexmeet.yourdomain.com)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/nexmeet.git
   cd nexmeet
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add the following:

   ```env
   # Stream Video API
   NEXT_PUBLIC_STREAM_KEY=your_stream_key
   STREAM_SECRET=your_stream_secret

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # App URL
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🖥️ Usage

1. **Sign in/Sign up** using your credentials
2. **Create a meeting** - Schedule a meeting or start an instant one
3. **Share the meeting link** with participants
4. **Join a meeting** - Enter a meeting ID or use a shared link
5. **Manage your personal room** - Host recurring meetings with your personal link

## 🧰 Tech Stack

- **Frontend**: Next.js, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Clerk
- **Video API**: Stream.io Video SDK
- **Deployment**: Vercel (recommended)

## 📊 Project Structure

```
nexmeet/
├── actions/ - Server actions
├── app/ - Next.js app router
├── components/ - Reusable UI components
├── hooks/ - Custom React hooks
├── lib/ - Utility functions
├── provider/ - Context providers
└── public/ - Static assets
```

## 📦 Dependencies

- Next.js 15.3.0
- React 19.0.0
- Stream.io Video SDK
- Clerk Auth
- Tailwind CSS
- Radix UI Components
- Sonner (Toast notifications)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  Made with ❤️ by Your Name
</div>
