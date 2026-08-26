# KingShadP Digital Archive - Security Specification

## 1. Data Invariants

- **User Profile Invariant**: A user profile document at `/users/{userId}` can only be created, read, or updated by the authenticated user whose `request.auth.uid == userId`. Modifying the `userId` or `createdAt` timestamp post-creation is strictly forbidden.
- **Saved Artifacts Invariant**: A saved artifact document at `/users/{userId}/saved_artifacts/{artifactId}` belongs strictly to the user `{userId}`. `request.auth.uid` must match `{userId}`.
- **Favorite Tracks Invariant**: A favorite track document at `/users/{userId}/favorite_tracks/{trackId}` belongs strictly to the user `{userId}`. `request.auth.uid` must match `{userId}`.
- **Transmissions Invariant**: A transmission to `/transmissions/{transmissionId}` must have `userId == request.auth.uid`. Once created with `status: 'pending'`, normal users cannot alter the status or modify existing records.
- **Guestbook Invariant**: A public signal log at `/guestbook/{entryId}` can be created by authenticated users with `userId == request.auth.uid`. Entries are append-only; updates and deletions by non-admins are rejected.
- **Timestamp Invariant**: `createdAt` and `savedAt` / `addedAt` must strictly evaluate against `request.time` on creation.

---

## 2. The "Dirty Dozen" Payloads

1. **Payload 1 (Identity Hijack - User Profile)**: User `attacker_uid` attempts to create `/users/victim_uid` with `{ userId: 'victim_uid', email: 'victim@domain.com' }`.
   - *Expected*: PERMISSION_DENIED (UID mismatch with path).
2. **Payload 2 (Ghost Field Injection - Profile)**: User attempts to write `{ userId: uid, email: '...', isAdmin: true }` to `/users/{uid}`.
   - *Expected*: PERMISSION_DENIED (Strict keys enforcement).
3. **Payload 3 (Path Variable Poisoning)**: Attempt to create a profile at `/users/../../../etc/passwd` or an ID longer than 128 chars.
   - *Expected*: PERMISSION_DENIED (`isValidId` regex & length check).
4. **Payload 4 (Denial of Wallet - Bloated Message)**: User attempts to send a transmission with a message > 2000 characters.
   - *Expected*: PERMISSION_DENIED (`message.size() <= 2000`).
5. **Payload 5 (Cross-Tenant Saved Artifact Write)**: User `userA` attempts to write to `/users/userB/saved_artifacts/art-01`.
   - *Expected*: PERMISSION_DENIED (`request.auth.uid != userId`).
6. **Payload 6 (Unauthorized Transmission Status Mutation)**: User attempts to update `/transmissions/{transmissionId}` setting `status: 'reviewed'`.
   - *Expected*: PERMISSION_DENIED (Users cannot alter status).
7. **Payload 7 (Unauthenticated Transmission Write)**: Unauthenticated visitor attempts to write to `/transmissions/tx-01`.
   - *Expected*: PERMISSION_DENIED (`isSignedIn() == false`).
8. **Payload 8 (Guestbook Spoofing)**: User `userA` creates a guestbook entry with `userId: 'userB'`.
   - *Expected*: PERMISSION_DENIED (`incoming().userId != request.auth.uid`).
9. **Payload 9 (Guestbook Tampering/Deletion)**: User attempts to delete or overwrite another user's guestbook entry.
   - *Expected*: PERMISSION_DENIED (No updates/deletions allowed on guestbook).
10. **Payload 10 (Client-Forged Timestamp)**: User submits `createdAt: timestamp.date(1999, 1, 1)` instead of `request.time`.
    - *Expected*: PERMISSION_DENIED (`createdAt == request.time`).
11. **Payload 11 (Favorite Track Schema Poisoning)**: User submits a favorite track with a numeric `title` instead of a string.
    - *Expected*: PERMISSION_DENIED (`incoming().title is string`).
12. **Payload 12 (Blanket Collection Scrape)**: Unauthenticated user attempts a list query over `/users`.
    - *Expected*: PERMISSION_DENIED (No blanket list permission).

---

## 3. Test Runner Definition

Implemented in `firestore.rules.test.ts`.
