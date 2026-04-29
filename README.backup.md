Secure Admin Portal — Angular

Overview

This folder contains a ready-to-integrate `src/app` implementation for a Secure Admin Portal demonstrating:
- Login (Reactive Forms) using https://reqres.in/api/login
- JWT storage in `localStorage`
- Auth Guard and HTTP Interceptor
- Dashboard with Users list (CRUD) using https://jsonplaceholder.typicode.com/users
- Debounced search, add/edit/delete, confirmation dialog
- Angular Material for dialogs & snackbars

Quick Integration

1) Create a new Angular app:

```bash
ng new secure-admin-portal --routing --style=scss
cd secure-admin-portal
```

2) Install runtime deps:

```bash
npm install @angular/material @angular/cdk @angular/animations
```

3) Copy the `src/app` and `src/environments` folders from this workspace into your new project, replacing the existing `src/app` and adding `src/environments` files.

4) (Optional) Install Tailwind and add directives into `styles.scss` to enable Tailwind:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Add to `src/styles.scss`:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5) Run the app:

```bash
ng serve
```

What I added

- Feature modules: `auth`, `dashboard` (lazy-load ready)
- `core` services: `AuthService`, `UsersService`
- `guards`: `AuthGuard`
- `interceptors`: `AuthInterceptor`
- Shared components: `LoadingComponent`, `ConfirmDialogComponent`
- Environments for API base URLs

If you want, I can:
- Replace your current `src` fully and wire Tailwind & Material themes
- Run `ng add @angular/material` and apply a Material theme
- Commit files or create a full project scaffold here

Tell me which next step you prefer.