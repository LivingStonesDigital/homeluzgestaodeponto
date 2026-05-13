---
  Code Review Report

  Reviewed: 2026-05-13
  Branch: feature/pwa
  Files Changed: 26 files (+3432, -1351)
  Decision: REQUEST CHANGES

  Summary

  This is a substantial PWA-related update to the Home Luz time tracking application. The changes include UI redesigns, new features, and backend modifications. However, there are CRITICAL security
   issues that must be addressed before this code can be merged.

  ---
  Findings

  CRITICAL

  1. Credentials stored in localStorage - src/app/(auth)/login/page.tsx:57-67

  const saveCredentials = (email: string, password: string) => {
    const savedEmail = getStorageData<string>("email");
    const savedPassword = getStorageData<string>("password");

    if (savedEmail !== email || savedPassword !== password) {
      setStorageData("email", email);
      setStorageData("password", password);  // ⚠️  CRITICAL: Password in localStorage
    }
    toast.success("Credentials saved successfully!");
  };

  Issue: Storing passwords in localStorage is a critical security vulnerability. localStorage is accessible by any JavaScript running on the page and is not encrypted. This exposes user credentials
   to XSS attacks.

  Fix: Remove password storage entirely. If "remember me" functionality is needed, use secure HTTP-only cookies or a secure token-based approach.

  ---
  HIGH

  2. Missing input validation on password - src/app/(auth)/login/page.tsx:41-55

  const password = formData.get("password") as string;
  await signIn("password", { email, password, flow: "signIn" });

  Issue: No validation for password strength, length, or format before submission.

  Fix: Add password validation (minimum length, complexity requirements) before calling signIn.

  3. console.log in production code - src/app/(dashboard)/dashboard/funcionarios/[id]/page.tsx:28

  console.log(preloadedTasks);

  Issue: Debug statements should not be in production code.

  Fix: Remove all console.log statements.

  4. Hardcoded external URLs - src/components/navbar.tsx:14

  src="https://github.com/origin-space.png"

  Issue: Hardcoded URLs should be in configuration.

  Fix: Move to environment variables or config file.

  ---
  MEDIUM

  5. Large files (>800 lines)

  ┌───────────────────────────────────────────────────┬───────┐
  │                       File                        │ Lines │
  ├───────────────────────────────────────────────────┼───────┤
  │ src/app/(dashboard)/dashboard/historico/page.tsx  │ 786   │
  ├───────────────────────────────────────────────────┼───────┤
  │ src/app/(dashboard)/dashboard/ponto/page.tsx      │ 673   │
  ├───────────────────────────────────────────────────┼───────┤
  │ src/app/(dashboard)/dashboard/revisoes/page.tsx   │ 638   │
  ├───────────────────────────────────────────────────┼───────┤
  │ src/app/(dashboard)/dashboard/aprovacoes/page.tsx │ 491   │
  ├───────────────────────────────────────────────────┼───────┤
  │ src/app/(dashboard)/dashboard/page.tsx            │ 456   │
  ├───────────────────────────────────────────────────┼───────┤
  │ src/app/(dashboard)/dashboard/perfil/page.tsx     │ 294   │
  └───────────────────────────────────────────────────┴───────┘

  Fix: Extract components and utilities into separate files.

  6. Missing error handling - Multiple files

  Several functions lack try-catch blocks or proper error handling:
  - src/app/(dashboard)/dashboard/ponto/page.tsx:101-120 - handleRegister
  - src/app/(dashboard)/dashboard/aprovacoes/page.tsx:78-109 - handleApprove/handleReject

  Fix: Add comprehensive error handling with user-friendly error messages.

  7. Deep nesting - src/app/(dashboard)/dashboard/historico/page.tsx

  Multiple sections have nesting depth >4 levels.

  Fix: Use early returns and extract helper functions.

  8. Missing tests for new code

  No test files were added for the new functionality.

  Fix: Add unit and integration tests for new features.

  ---
  LOW

  9. Unused imports - src/app/(dashboard)/dashboard/historico/page.tsx:1

  import { ArrowDownLeft } from "lucide-react";  // Never used

  Fix: Remove unused imports.

  10. Inconsistent naming conventions

  Mixed use of camelCase, PascalCase, and kebab-case in variable names.

  Fix: Standardize naming conventions.

  11. Missing JSDoc for public APIs

  Functions in convex/employees.ts and convex/timeRecords.ts lack documentation.

  Fix: Add JSDoc comments for public APIs.

  12. Magic numbers

  // src/app/(dashboard)/dashboard/ponto/page.tsx:137
  const totalSteps = 4;

  Fix: Extract to named constants.

  ---
  Validation Results

  ┌────────────┬─────────┐
  │   Check    │ Result  │
  ├────────────┼─────────┤
  │ Type check │ Not run │
  ├────────────┼─────────┤
  │ Lint       │ Not run │
  ├────────────┼─────────┤
  │ Tests      │ Not run │
  ├────────────┼─────────┤
  │ Build      │ Not run │
  └────────────┴─────────┘

  ---
  Files Reviewed

  Modified (26 files)

  - components.json
  - convex/employees.ts
  - convex/schema.ts
  - convex/timeRecords.ts
  - next.config.ts
  - package-lock.json
  - package.json
  - src/app/(auth)/login/page.tsx
  - src/app/(dashboard)/dashboard/aprovacoes/page.tsx
  - src/app/(dashboard)/dashboard/funcionarios/[id]/page.tsx
  - src/app/(dashboard)/dashboard/funcionarios/page.tsx
  - src/app/(dashboard)/dashboard/historico/page.tsx
  - src/app/(dashboard)/dashboard/inicio/page.tsx
  - src/app/(dashboard)/dashboard/meuhistorico/page.tsx
  - src/app/(dashboard)/dashboard/page.tsx
  - src/app/(dashboard)/dashboard/perfil/page.tsx
  - src/app/(dashboard)/dashboard/ponto/page.tsx
  - src/app/(dashboard)/dashboard/revisoes/page.tsx
  - src/app/(dashboard)/layout.tsx
  - src/app/globals.css
  - src/app/layout.tsx
  - src/components/auth-guard.tsx
  - src/components/bottom-bar.tsx
  - src/components/hero.tsx
  - src/components/navbar.tsx
  - src/components/page-transition.tsx (deleted)

  ---
  Next Steps

  1. CRITICAL: Remove password storage from localStorage
  2. HIGH: Add input validation for passwords
  3. HIGH: Remove all console.log statements
  4. MEDIUM: Add error handling to all async functions
  5. MEDIUM: Split large files into smaller components
  6. MEDIUM: Add tests for new functionality
  7. LOW: Remove unused imports
  8. LOW: Add JSDoc comments for public APIs

  ---
  Recommendation: REQUEST CHANGES - Critical security issues must be fixed before merge.