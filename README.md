## Frontend - Event Management System

The frontend is a web-based interface built with **Next.js (App Router), TypeScript, and ShadCN/UI**. It provides a public event listing for users and an admin dashboard for managing events.

---

### Features

- **Public User**
  - View events categorized as **Ongoing, Upcoming, or Past**.
  - Event details page with full information.
  - Time zone-aware event display.

- **Admin**
  - Secure login/logout functionality.
  - Admin dashboard with full **CRUD operations** for events.
  - Create, edit, delete, and filter events.
  - Dashboard layout with sidebar and navbar.

- **Reusable Components**
  - Buttons, modals, loaders, error messages.
  - Event cards, event forms, and filters.
  - Layout components for public and dashboard views.

- **Hooks & Utilities**
  - Custom hooks for event status, time zone conversion, and modal handling.
  - API client for REST requests.
  - Date utilities using **Day.js**.

---

### Technology Stack

- **Framework & Language:** Next.js (App Router), React 19, TypeScript  
- **UI & Styling:** ShadCN/UI, TailwindCSS, clsx  
- **State & Data Fetching:** SWR  
- **Notifications & Modals:** react-hot-toast, @radix-ui/react-dialog  
- **Cookies & Auth:** js-cookie, next-themes  
- **Utilities:** dayjs, tailwind-merge, class-variance-authority  

---


---

## Setup & Installation

1. **Clone the repository**
```bash
git clone https://github.com/mahfuzctg/Event-Management-Client.git
cd Event-Management-Client

npm install


npm run dev
```

---

## Live Demo & Repository

### Live Demo
- **Frontend:** [https://event-managements-client.vercel.app](https://event-managements-client.vercel.app)  
- **Backend:** [https://event-managements-server.vercel.app](https://event-managements-server.vercel.app)  

### GitHub Repository
- **Frontend:** [https://github.com/mahfuzctg/Event-Management-Client.git](https://github.com/mahfuzctg/Event-Management-Client.git)  
- **Backend:** [https://github.com/mahfuzctg/Event-Management-Server.git](https://github.com/mahfuzctg/Event-Management-Server.git)

---

## Thank You

Thank you for visiting the **Event Management System** client repository.  
Your feedback, contributions, and suggestions are always welcome! 🙏



