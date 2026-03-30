# Walkthrough: Google OAuth Implementation

This update introduces Google OAuth 2.0 authentication to the Kasir UMKM backend, allowing users to sign in using their Google accounts.

## Changes Overview

### 1. Database Schema Update
Modified the `user` model in [schema.prisma](file:///c:/PROJECT/Umkm/umkm-be/prisma/schema.prisma) to support OAuth providers.
- Added `provider` (e.g., "google") and `providerId` (Google's unique ID) fields.
- Added `image` field to store the user's Google profile picture.
- Made `password` field optional to allow OAuth-only accounts.

### 2. Passport Configuration
Created [passport.ts](file:///c:/PROJECT/Umkm/umkm-be/src/middleware/passport.ts) to manage the Google Strategy.
- Configured with `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
- Uses `findOrCreateGoogleUser` service to sync Google profiles with the local database.

### 3. Auth Service Logic
Updated [authService.ts](file:///c:/PROJECT/Umkm/umkm-be/src/service/authService.ts) with `findOrCreateGoogleUser`.
- **Search by Provider ID**: First attempt to find the user by their Google ID.
- **Search by Email**: If not found by ID, search by email. If an existing account is found, it "links" the Google profile to that account.
- **Account Creation**: If no account exists, a new user is created with the Google profile information.

### 4. API Routes & Controller
Added OAuth endpoints in [authRoutes.ts](file:///c:/PROJECT/Umkm/umkm-be/src/route/authRoutes.ts) and [authController.ts](file:///c:/PROJECT/Umkm/umkm-be/src/controller/authController.ts).
- `GET /api/auth/google`: Initiates the Google login flow.
- `GET /api/auth/google/callback`: Handles the redirect from Google, generates a JWT for the user, and redirects back to the frontend with the token.

### 5. Server Initialization
Updated [index.ts](file:///c:/PROJECT/Umkm/umkm-be/src/index.ts):
- Initialized Passport middleware.
- Configured CORS to allow the frontend URL and credentials.

## Verification

### OAuth Flow Test
1. Access `http://localhost:3001/api/auth/google` (backend).
2. User is redirected to Google sign-in.
3. Upon success, Google redirects back to `/api/auth/google/callback`.
4. Backend finds/creates the user and generates a JWT.
5. Backend redirects to `${FRONTEND_URL}/auth-success?token=...`.

> [!NOTE]
> Make sure to set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `FRONTEND_URL` in your `.env` file for this to work in production.
