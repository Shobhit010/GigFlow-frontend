# GigFlow Frontend 🎨

The frontend for **GigFlow** is a modern, high-performance "mini freelance marketplace" built with React and Vite. It focuses on a premium, "dark-mode first" aesthetic inspired by top-tier SaaS products (Linear, Raycast), utilizing **Aceternity UI** and **Framer Motion** for world-class interactions.

## 🚀 Project Overview

The frontend serves as the interface for both Clients and Freelancers. It provides a seamless experience for posting gigs, searching for work, placing bids, and managing the hiring process.

**Key Goals:**
- **Performance:** Blazing fast load times using Vite.
- **Visuals:** A deep charcoal theme with glassmorphism and gradient accents.
- **Interactivity:** Immediate feedback via toasts, micro-animations, and real-time updates.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [TailwindCSS v4](https://tailwindcss.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **UI Components:** Start primitives from [Aceternity UI](https://ui.aceternity.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Real-time:** [Socket.io Client](https://socket.io/)

## 📂 Folder Structure

```
frontend/src
├── components
│   ├── layout       # Navbar and structural elements
│   ├── ui           # Reusable primitives (Button, Input, Modal, Toast)
│   ├── BidCard.jsx  # Complex card for displaying bids
│   └── GigCard.jsx  # Card component for the gig feed
├── context          # SocketContext for real-time connection
├── pages
│   ├── Auth         # Login and Signup pages with gradient backgrounds
│   ├── Gigs         # GigFeed, GigDetails, and CreateGig pages
│   └── Dashboard    # User dashboard
├── store            # Redux slices (auth, gig, bid)
├── utils            # Helper functions (cn for class merging)
├── App.jsx          # Main router configuration
└── main.jsx         # Entry point with Providers (Redux, Socket, Router)
```

## ✨ Key Features

### 1. Authentication Flow
- **Visuals:** Auth pages (`Login.jsx`, `Signup.jsx`) are wrapped in a premium `BackgroundGradient` container.
- **Logic:** Uses HttpOnly cookies for session management (handled automatically by the browser).
- **Feedback:** Loading spinners on buttons and error/success alerts.

### 2. Gig Marketplace
- **Grid Layout:** Responsive grid displaying `GigCard` components.
- **Search:** Animated search bar with debounce (implied UI).
- **Animations:** Staggered entrance animations for cards using Framer Motion.

### 3. Bidding & Hiring
- **BidCards:** Display status (Pending, Hired, Rejected) with distinct visual badges.
- **Atomic Hiring:** Gig owners can view bids and "Hire" a freelancer via a smooth modal.
- **Real-time:** Freelancers receive an instant **Toast Notification** when they are hired, powered by Socket.io.

### 4. Interactive Forms
- **Post Gig:** Custom `Input` and `TextArea` components with focus-glow effects.
- **Validation:** Client-side validation for required fields.

## 📱 UI / UX Decisions

- **Dark Theme:** The app uses a strict `slate-950` / `zinc-900` background palette with `indigo-500` accents to convey professionalism.
- **Motion:** Interactions are intentional. Hover states lift cards (`y: -5`), and modals scale in (`scale: 0.95 -> 1`).
- **Glassmorphism:** Navbars and toasts use `backdrop-blur` to maintain context while scrolling.

## 🌐 State Management

We use **Redux Toolkit** to manage global server state and auth interactions:
- **authSlice:** Manages user info (`userInfo`) and login status.
- **gigSlice:** Caches gig data to reduce prop drilling.
- **bidSlice:** Manages the state of bids for the current view.

**Real-time State:**
- Managed via `SocketContext`, which maintains the active socket connection and listens for global events like `notification` to trigger Toasts.

## 🔧 Environment Variables

Create a `.env` file in the root of `frontend`:

```env
# URL of the backend API
VITE_API_URL=http://localhost:5000
```

## 🏃‍♂️ Running Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Open Browser:**
   Visit `http://localhost:5173` to view the app.

## 📦 Build & Deployment

To build for production:

```bash
npm run build
```

This generates a `dist` folder containing static assets ready for hosting on Vercel, Netlify, or any static site provider.
