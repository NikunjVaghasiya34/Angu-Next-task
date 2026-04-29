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