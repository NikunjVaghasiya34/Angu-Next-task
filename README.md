Secure Admin Portal — Angular (Feature-based)

Overview
- A production-ready Angular scaffold for a "Secure Admin Portal" focusing on authentication, route protection, and a Users dashboard (CRUD-ready).
- Feature-based structure: `auth`, `dashboard`, `core`, `shared` modules.

Key Features
- Login with Reactive Forms and token storage (localStorage key: `sa_token`).
- `AuthGuard` to protect dashboard routes.
- `AuthInterceptor` attaches `Authorization` header only to same-origin or configured auth API and handles global errors.
- Users list (JSONPlaceholder) with debounced search, loading states, and basic CRUD stubs.
- Angular Material used for snackbars and spinner; CSS fallback spinner included.
- Strict TypeScript settings enabled.

Development notes
- Environments:
  - `src/environments/environment.ts` — development API endpoints (Reqres for auth, JSONPlaceholder for users).
  - `src/environments/environment.prod.ts` — production endpoints.

- Dev fallback tokens: For convenient local testing, `AuthService` includes a non-production fallback that returns fake tokens for known test credentials (e.g. `eve.holt@reqres.in` / `cityslicka` and `admin@example.com` / `password123`). Remove or disable this before production.

Setup
1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm start
# or
ng serve
```

3. Build for production:

```bash
npm run build
# or
ng build --configuration production
```

Git / Remote
- A `.gitignore` has been added and an initial commit created.
- To publish to GitHub (example):

```bash
git remote add origin https://github.com/<your-username>/angular-auth-dashboard.git
git branch -M main
git push -u origin main
```

Useful scripts (package.json)
- `start` / `ng serve` — run dev server
- `build` / `ng build` — build app

TODO (short)
- Replace `prompt()`/`confirm()` stubs with Angular Material dialogs and Reactive Forms for full CRUD UX.
- Implement pagination and server-side filtering.
- Add global header/sidebar and persist UI state.
- Remove dev fallback in `AuthService` before production.
- Add CI (GitHub Actions) for build & lint checks.

Where to look
- `src/app/auth` — login UI and module
- `src/app/core` — `auth.service.ts`, `auth.interceptor.ts`, `auth.guard.ts`
- `src/app/dashboard` — users list and dashboard module
- `src/app/shared` — loading component and shared models

Contact
- If you want, I can push the repo to GitHub for you — provide the remote URL or allow me to create it.
