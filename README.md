# Google Calendar Clone (React 19 + Vite)

A modern, component-driven Google Calendar clone migrated from native JavaScript to **React 19**, powered by **Vite** for blistering fast builds and **Sass (SCSS)** for modular styling.

## 🔗 Live Demo
[View the Live Project](https://i1yaremechko.github.io/google-calendar-clone-react/)

## 🚀 Architecture Overview (Feature-Based)

The project follows a scalable, feature-based folder structure to keep code modular and isolated:
* `src/common/` — Houses global configuration, environment constants, reusable UI components, and date-manipulation utilities.
* `src/features/Calendar/` — A self-contained calendar module that encapsulates its own components (`Header`, `CalendarGrid`, etc.), gateways for API integration, internal state management, and specific layout styles.

## 🛠 Tech Stack

* **React 19** (Utilizing modern features like React Server Actions for form handling)
* **Vite** (Next-generation frontend tooling with lightning-fast HMR)
* **Sass (SCSS)** (Structured stylesheets utilizing explicit `@use` rules)
* **Prop-types** (Runtime type checking for component props)
* **MockAPI** (Remote REST API for cloud data persistence)

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/i1yaremechko/google-calendar-clone-react.git](https://github.com/i1yaremechko/google-calendar-js.git)
   cd google-calendar-js
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Compile SCSS styles:**
   ```bash
   npm run scss
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```