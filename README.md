# ProUBoard

ProUBoard is a business-themed dashboard application that helps managers track employees, monitor workloads, and prioritize daily tasks efficiently.

It is designed as a **single-page "full-stack" experience running entirely in the browser**, with a simulated backend and persistent storage using `localStorage`. The goal of this project is to showcase **architecture, code organization, and product thinking** rather than heavy infrastructure.

---

## 🚀 Overview

ProUBoard provides a centralized hub for team and work management:

- Clean, professional UI using Tailwind CSS
- Role-based views (Developer, Designer, Manager, Product, System Admin)
- Simulated backend logic (auth + CRUD) with artificial latency
- Browser persistence so data survives page refreshes

This setup lets the app behave like a full-stack system while remaining easy to run and review.

<img width="1919" height="859" alt="image" src="https://github.com/user-attachments/assets/bdb16c7a-a05c-4758-bce9-bf73af6f1317" />

<img width="1916" height="856" alt="image" src="https://github.com/user-attachments/assets/d25fab7a-2126-4ddd-a873-72af09b477d6" />

<img width="1919" height="863" alt="image" src="https://github.com/user-attachments/assets/3ffe6d45-3049-421e-b43c-4bd30f98d887" />

<img width="1919" height="856" alt="image" src="https://github.com/user-attachments/assets/8f3319fb-31f0-484e-879b-e073d536dd4f" />

<img width="1919" height="859" alt="image" src="https://github.com/user-attachments/assets/fb8bcc88-349f-47cb-859c-5e52b1cd645b" />

---

## ✨ Key Features

- **Dashboard**
  - Real-time stats for total tasks, overdue items, and upcoming deadlines
  - Highlighted “Attention Needed” section for at-risk work

- **Workload Management**
  - Visual indicators of employee capacity: `Light`, `Medium`, `Heavy`
  - Workload derived from assigned tasks and priorities

- **Risk Assessment**
  - Automatic detection of:
    - Overdue tasks
    - Unassigned tasks
    - High-priority tasks due soon (“At Risk”)

- **Employee Directory**
  - View team members, roles, and active/inactive status
  - Designed to be extendable to creation/editing in a real backend scenario

- **Task Management (CRUD)**
  - Create, read, update, and delete tasks
  - Attach tasks to employees, set due dates and priorities
  - Soft validation and instant UI feedback

- **Feedback & UX**
  - Toast notifications for success/error/info
  - Loading states and artificial delays to mimic real API interactions
  - Responsive layout and collapsible sidebar

---

## 🛠 Tech Stack

**Frontend**

- **Library:** React 19 (ES Modules)
- **Language:** TypeScript (TSX)
- **Styling:** Tailwind CSS (via CDN)
- **Icons:** Font Awesome 6
- **Typography:** Inter (Google Fonts)
- **State Management:** React Context API (Auth, App, Toast contexts)

**Persistence & “Backend”**

- **Persistence:** `window.localStorage` (Tasks, Employees, Session User)
- **Backend Simulation:** Business logic implemented in **service modules + React Contexts**, with `setTimeout` to mimic network latency.

In a real-world deployment, the service layer would be wired to an actual backend API (Node.js / Python / Java) and database (PostgreSQL / MySQL / MongoDB).

---

## 🧱 Architecture Overview

Although everything runs in the browser, the code is structured to mirror a traditional full-stack app:

- `src/contexts/AuthContext.tsx`  
  Manages login state, active user, and role information.

- `src/contexts/AppContext.tsx`  
  Holds core application data such as employees and tasks, and exposes methods that behave like API calls (e.g. `createTask`, `updateTask`, `deleteTask`).

- `src/contexts/ToastContext.tsx`  
  Centralized system for user feedback (success/error/info toasts).

- `src/services/*`  
  Service modules that encapsulate all data access:
  - Read/write from `localStorage`
  - Simulate network latency with `setTimeout`
  - Keep UI code decoupled from storage details

This layered approach means the UI talks to “services” instead of directly to `localStorage`, making it straightforward to later swap those implementations with real HTTP requests to a backend (FastAPI / Express / Spring, etc.).

---

## ⚙️ Setup & Running Locally

ProUBoard uses browser-native ES Modules and CDNs, so there is **no bundler build step required**.

1. **Download / Clone**

   Make sure at minimum you have:

   - `index.html`
   - `index.tsx`
   - `src/` (if applicable, based on how you’ve structured the repo)

2. **Serve via a local web server**

   Because the app uses ES Modules (`import ... from ...`), opening `index.html` directly from the filesystem will cause CORS/module errors.

   You can use any simple static server, for example:

   - **Python**

     ```bash
     python3 -m http.server
     ```

     Then visit: `http://localhost:8000`

   - **Node**

     ```bash
     npx serve
     ```

   - **VS Code**

     - Install the **Live Server** extension
     - Right-click `index.html` → **“Open with Live Server”**

---

## 🔐 Mock Authentication

Use one of the following credentials to sign in. The app performs strict validation against these mock accounts.

| Role                | Email                  | Password   |
|---------------------|------------------------|------------|
| Developer           | alice@prouboard.com    | dev123     |
| Designer            | bob@prouboard.com      | design123  |
| Manager             | charlie@prouboard.com  | manager123 |
| Product             | diana@prouboard.com    | product123 |
| Developer (Inactive)| evan@prouboard.com     | dev123     |
| System Admin        | admin@prouboard.com    | admin123  |

- Inactive users are intentionally restricted in some flows to simulate account status checks.
- Session data is stored in `localStorage` to persist login between page refreshes.

> ⚠️ **Note:** This is a mock authentication system for demonstration. All checks happen client-side and are not secure by production standards.

---

## 💡 Design Choices, Assumptions & Bonus Features

### Assumptions

- **Backend Simulation:**  
  A real HTTP backend (Node.js / Python / Java) is intentionally **simulated** using:
  - `localStorage` for persistence
  - `setTimeout`-based artificial latency for all “API-like” operations

  This keeps the focus on **UX, state management, and architecture**, while still providing realistic behavior for reviewers.

- **Single-Browser Scope:**  
  Data is scoped to the user’s browser. Different browsers/machines will not share state.

### Bonus / UX Features

- **Toast Notification System**  
  Custom-built toast system for all key user actions: creation, updates, errors, and authentication feedback.

- **Smart Risk Algorithm**  
  Tasks automatically flagged as “At Risk” when:
  - They are high priority **and**
  - Due within the next **3 days**, or
  - Are unassigned and approaching their due date

- **Responsive Layout & Sidebar**  
  Collapsible navigation that works across desktop/laptop screen sizes, with a layout tuned for dashboard-style usage.

- **Loading / Skeleton States**  
  Artificial latency is used to show realistic spinners / loading UI during:
  - Login
  - Initial data load
  - CRUD operations

---

## ⚠️ Limitations (By Design)

This project intentionally avoids a real backend and database to reduce complexity and make review easy. As a result:

- **No true server-side security**
  - All role checks and sessions are stored client-side.
  - Users could technically modify data via DevTools.

- **No multi-user consistency**
  - Data is stored in `localStorage`.
  - Different users/browsers see different data — there is no shared central database.

- **No real database constraints**
  - There are no foreign key constraints or migrations.
  - All relationships (e.g., tasks → employees) are maintained purely in client-side logic.

---

## 🚀 Future Enhancements (Towards a Real Backend)

If this were to be evolved into a production-ready system, the next steps would be:

1. **Introduce a Real Backend**
   - Example: FastAPI / Node.js (Express / NestJS) / Java (Spring Boot)
   - Implement REST/GraphQL endpoints for:
     - Authentication & authorization
     - Employees & tasks CRUD
     - Audit logging

2. **Use a Real Database**
   - Example: PostgreSQL / MySQL
   - Define normalized schema:
     - `users`, `employees`, `tasks`, `sessions`, `audit_logs`, etc.
   - Add migrations and constraints.

3. **Secure Authentication**
   - Password hashing
   - Role-based access control (RBAC)
   - JWT or session-based auth with proper expiry

4. **Replace Service Implementations**
   - Swap current `localStorage`-based service functions with actual HTTP calls.
   - Keep the same `service` and `context` interfaces so the UI remains unchanged.

---

## 📝 Goal of the Project

This challenge is used to demonstrate:

- How I **approach a problem** (task modeling, risk logic, role separation)
- How I **organize code** (contexts, services, presentational components)
- How I **communicate design decisions** (this README, architecture and limitations)

The implementation deliberately focuses on **clarity, UX, and architecture** over heavy infrastructure, while still mirroring how a real full-stack system would be structured.

