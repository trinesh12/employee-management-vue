# Employee Management System

A Vue 3 Employee Management System using Vite, Axios, MockAPI-ready REST calls, and Bootstrap.

## Features

- Add employees
- View employees in a responsive table
- Edit employee details
- Delete employees
- Bootstrap styling
- Success and error messages
- Sample data fallback when no MockAPI URL is configured

## Setup

Install dependencies:

```bash
npm install
```

Run the project:

```bash
npm run dev
```

## MockAPI Setup

1. Create a project at `https://mockapi.io`.
2. Add a resource named `employees`.
3. Add these fields:
   - `employeeId`
   - `name`
   - `designation`
   - `department`
   - `salary`
4. Copy `.env.example` to `.env`.
5. Replace the URL with your MockAPI endpoint:

```env
VITE_API_BASE_URL=https://YOUR_PROJECT_ID.mockapi.io/api/v1/employees
```

Restart `npm run dev` after changing `.env`.

## Simple Code Explanation

- `src/main.js` starts the Vue app and loads Bootstrap.
- `src/App.vue` is the main page. It stores employees, messages, loading state, and calls API methods.
- `src/components/EmployeeForm.vue` contains the add/edit form and uses `v-model`.
- `src/components/EmployeeTable.vue` displays employees and sends edit/delete events to the parent.
- `src/services/employeeService.js` contains all CRUD methods. It uses Axios when `VITE_API_BASE_URL` is set. If there is no API URL, it uses local sample data so the app still works immediately.
- `src/data/sampleEmployees.js` contains beginner-friendly sample records.

## Project Structure

```text
employee-management-system/
  src/
    components/
      EmployeeForm.vue
      EmployeeTable.vue
    data/
      sampleEmployees.js
    services/
      employeeService.js
    App.vue
    main.js
    style.css
  .env.example
  index.html
  package.json
  README.md
```
