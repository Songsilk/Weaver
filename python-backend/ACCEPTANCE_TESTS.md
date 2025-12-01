# Acceptance Tests Status

This document tracks the implementation status of acceptance tests for the Weaver User Stories (WEA).

## Summary
- **Implemented & Tested**: WEA1, WEA2, WEA3, WEA13/14 (Self-Deletion)

## Detailed Status

### ✅ Implemented & Tested

These stories are covered by `src/tests/acceptance/test_user_stories.py`.

#### WEA1: User Registration
- **Story**: As a new user, I need to register on the platform so that I can access my personal page.
- **Status**: ✅ **PASSING**
- **Test**: `test_story_complete_user_lifecycle` (Registration step)

#### WEA2: User Login
- **Story**: As a registered user, I need to log in to the system so that I can access my account.
- **Status**: ✅ **PASSING**
- **Test**: `test_story_complete_user_lifecycle` (Login step)

#### WEA3: Card Creation and Editing
- **Story**: As an authenticated user, I need to create and edit my personal content card.
- **Status**: ✅ **PASSING** (Mapped to User Profile Update)
- **Test**: `test_story_complete_user_lifecycle` (Update profile step)

#### WEA13/14: User Self-Deletion
- **Story**: As a user, I need to delete my account.
- **Status**: ✅ **PASSING**
- **Test**: `test_story_complete_user_lifecycle` (Delete account step)

---

### 🚧 Pending Backend Implementation

These stories require new backend features (routes, models, or logic) before they can be tested.

#### WEA4: Profile Customization
- **Requirement**: Change colors, layout, link order.
- **Gap**: `UserModel` only supports basic fields (avatar, username). No fields for theme/layout.

#### WEA5: View Public Profiles
- **Requirement**: View other users' public profiles via link.
- **Gap**: No public endpoint (e.g., `GET /user/{username}`) exists.

#### WEA6 - WEA9: Contacts System
- **Requirement**: Save, note, edit, delete, and search contacts.
- **Gap**: `ContactListModel` exists in DB, but no API routes (`/contacts`) are implemented.

#### WEA10 - WEA12: Admin System
- **Requirement**: View all users, block users, delete users (admin).
- **Gap**: No Admin API routes or role-based access control implemented.

## How to Run Tests

```bash
cd python-backend
PYTHONPATH=src ./venv/bin/pytest src/tests/acceptance
```
