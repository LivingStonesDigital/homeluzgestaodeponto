# Vercel React Best Practices Refactoring Plan

## Overview
This document outlines a comprehensive refactoring plan to apply Vercel React best practices to the HomeLuz project. Tasks are organized by priority based on their impact on performance and user experience.

## Priority Levels

### 🔴 CRITICAL (Immediate Action Required)
These issues have the highest impact on performance and user experience.

#### 1. async-parallel - Sequential Mutations
**File:** `src/app/(dashboard)/dashboard/aprovacoes/page.tsx`
**Task:** Fix async-parallel mutations in aprovacoes/page.tsx
**Impact:** Eliminates waterfall requests, significantly reduces wait time
**Current:**
```typescript
for (const id of recordIds) {
  await approveRecord({ recordId: id as any });
}
```
**Should be:**
```typescript
await Promise.all(recordIds.map(id => approveRecord({ recordId: id as any })));
```

#### 2. rerender-defer-reads - State Reads in Render
**File:** `src/app/(dashboard)/dashboard/aprovacoes/page.tsx`
**Task:** Optimize rerender-defer-reads in aprovacoes/page.tsx
**Impact:** Prevents unnecessary re-renders when state changes
**Current:**
```typescript
const isProcessing = (ids: string[]) =>
  ids.some((id) => processingIds.has(id));
```
**Should be:**
```typescript
const isProcessing = useMemo(
  () => (ids: string[]) => ids.some((id) => processingIds.has(id)),
  [processingIds]
);
```

#### 3. js-combine-iterations - Multiple Iterations
**File:** `src/app/(dashboard)/dashboard/aprovacoes/page.tsx`
**Task:** Optimize js-combine-iterations in grouping logic
**Impact:** Reduces O(n) operations to single pass
**Current:**
```typescript
const groupedData = pendingRecords?.reduce(...) || {};
const groups = Object.values(groupedData);
```
**Should be:**
```typescript
const groups = useMemo(() => {
  const map = new Map();
  pendingRecords?.forEach(record => {
    const key = `${record.date}-${record.userId}`;
    if (!map.has(key)) {
      map.set(key, { date: record.date, user: record.user, records: [] });
    }
    map.get(key).records.push(record);
  });
  return Array.from(map.values());
}, [pendingRecords]);
```

### 🟠 HIGH (Significant Performance Impact)

#### 4. bundle-dynamic-imports - Heavy Components
**Files:** Multiple pages with modals
**Task:** Implement bundle-dynamic-imports for modals
**Impact:** Reduces initial bundle size, improves initial load time
**Example:**
```typescript
const RegisterEmployeeModal = dynamic(
  () => import('@/components/modals/register-employee'),
  { loading: () => <Loader /> }
);
```

#### 5. rerender-memo - Expensive Computations
**Files:** `src/app/(dashboard)/dashboard/historico/page.tsx`, `src/app/(dashboard)/dashboard/funcionarios/page.tsx`
**Task:** Add rerender-memo for expensive computations
**Impact:** Prevents recalculation of expensive values on every render
**Functions to memoize:**
- `formatDate`
- `formatTime`
- `getInitials`
- `getAvatarColor`
- `parseLocalDate`

#### 6. js-cache-function-results - Repeated Function Calls
**Files:** Multiple components
**Task:** Implement js-cache-function-results
**Impact:** Caches expensive function results across renders
**Example:**
```typescript
const formatDate = useCallback((dateStr: string) => {
  try {
    return format(new Date(dateStr + "T00:00:00"), "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
  } catch {
    return dateStr;
  }
}, []);
```

#### 7. server-serialization - Minimize Data Transfer
**Files:** Convex query functions
**Task:** Optimize server-side data serialization
**Impact:** Reduces data transfer size, improves network performance
**Example:**
```typescript
// Instead of returning full user object
return { ...r, user: await ctx.db.get(r.userId) };

// Return only needed fields
return {
  ...r,
  user: {
    name: user.name,
    avatarUrl: user.avatarUrl,
    department: user.department
  }
};
```

#### 8. async-cheap-condition-before-await - Early Checks
**Files:** Multiple async functions
**Task:** Add cheap condition checks before awaits
**Impact:** Avoids unnecessary async operations
**Example:**
```typescript
// Check cheap conditions first
if (!recordIds.length) return;

// Then await
await Promise.all(recordIds.map(...));
```

#### 9. async-suspense-boundaries - Streaming Content
**Files:** Multiple page components
**Task:** Add Suspense boundaries for streaming
**Impact:** Improves perceived performance by streaming content
**Example:**
```typescript
<Suspense fallback={<Loader />}>
  <DashboardContent />
</Suspense>
```

### 🟡 MEDIUM (Moderate Performance Impact)

#### 10. rerender-dependencies - Non-primitive Dependencies
**Files:** Multiple components with useEffect
**Task:** Optimize rerender-dependencies in effects
**Impact:** Prevents unnecessary effect re-runs
**Check:** All useEffect dependencies should be primitive values or stable references

#### 11. rerender-move-effect-to-event - Interaction Logic
**Files:** `src/components/auth-guard.tsx`
**Task:** Move interaction logic to event handlers
**Impact:** Improves responsiveness by avoiding effect delays
**Example:**
```typescript
// Instead of useEffect for navigation
useEffect(() => {
  if (isAuthenticated === false) {
    router.push("/login");
  }
}, [isAuthenticated, router]);

// Use event handler
const handleAuthCheck = useCallback(() => {
  if (isAuthenticated === false) {
    router.push("/login");
  }
}, [isAuthenticated, router]);
```

#### 12. rerender-functional-setState - Stable Callbacks
**Files:** Multiple components
**Task:** Use functional setState for stable callbacks
**Impact:** Prevents stale closures and unnecessary re-renders
**Example:**
```typescript
// Instead of
setProcessingIds(new Set(recordIds));

// Use functional update
setProcessingIds(prev => new Set(recordIds));
```

#### 13. js-early-exit - Early Returns
**Files:** Multiple functions
**Task:** Add early returns in functions
**Impact:** Improves readability and reduces nesting
**Example:**
```typescript
// Instead of nested conditions
if (condition) {
  if (anotherCondition) {
    // do work
  }
}

// Use early returns
if (!condition) return;
if (!anotherCondition) return;
// do work
```

#### 14. rerender-no-inline-components - Component Extraction
**Files:** Multiple components
**Task:** Remove inline components
**Impact:** Prevents unnecessary re-renders of child components
**Example:**
```typescript
// Instead of inline component
function Parent() {
  const Child = () => <div>...</div>;
  return <Child />;
}

// Extract to separate file
// child.tsx
export function Child() {
  return <div>...</div>;
}
```

#### 15. bundle-preload - Preloading on Interaction
**Files:** Navigation links and buttons
**Task:** Add preloading on hover/focus
**Impact:** Improves perceived speed by preloading resources
**Example:**
```typescript
<Link
  href="/dashboard/funcionarios/${employee._id}"
  prefetch={true}
  onMouseEnter={() => prefetch('/dashboard/funcionarios/${employee._id}')}
>
```

#### 16. server-after-nonblocking - Non-blocking Operations
**Files:** Server components
**Task:** Use after() for non-blocking operations
**Impact:** Improves server response time
**Example:**
```typescript
import { after } from "next/server";

export default function Page() {
  after(() => {
    // Non-blocking analytics
    logPageView();
  });

  return <div>...</div>;
}
```

#### 17. client-localstorage-schema - Schema Versioning
**Files:** Components using localStorage
**Task:** Implement localStorage schema versioning
**Impact:** Prevents data corruption and improves maintainability
**Example:**
```typescript
const STORAGE_VERSION = 1;
const STORAGE_KEY = 'homeluz_data';

function getStorageData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  const data = JSON.parse(raw);
  if (data.version !== STORAGE_VERSION) {
    // Migrate or clear
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
  return data;
}
```

#### 18. rerender-derived-state-no-effect - Derive During Render
**Files:** Multiple components
**Task:** Derive state during render instead of effects
**Impact:** Reduces effect dependencies and improves performance
**Example:**
```typescript
// Instead of useEffect for derived state
useEffect(() => {
  setDerivedValue(computeFromState(state));
}, [state]);

// Derive during render
const derivedValue = useMemo(() => computeFromState(state), [state]);
```

#### 19. rerender-use-deferred-value - Expensive Renders
**Files:** Components with expensive renders
**Task:** Use useDeferredValue for expensive renders
**Impact:** Keeps input responsive during expensive updates
**Example:**
```typescript
const deferredSearchQuery = useDeferredValue(searchQuery);
const filteredEmployees = useMemo(() =>
  employees?.filter(e =>
    e.name.toLowerCase().includes(deferredSearchQuery.toLowerCase())
  ) || [],
  [employees, deferredSearchQuery]
);
```

#### 20. rendering-content-visibility - Long Lists
**Files:** Components with long lists
**Task:** Add content-visibility for long lists
**Impact:** Improves rendering performance for long lists
**Example:**
```css
.long-list-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 200px;
}
```

### 🟢 LOW (Minor Performance Impact)

#### 21. js-index-maps - Repeated Lookups
**Files:** Components with repeated lookups
**Task:** Use Map for repeated lookups
**Impact:** Improves lookup performance from O(n) to O(1)

#### 22. js-cache-storage - Storage Caching
**Files:** Components using localStorage/sessionStorage
**Task:** Cache localStorage/sessionStorage reads
**Impact:** Reduces synchronous I/O operations

#### 23. js-hoist-regexp - RegExp in Loops
**Files:** Components with regex operations
**Task:** Hoist RegExp creation outside loops
**Impact:** Avoids repeated RegExp instantiation

#### 24. js-set-map-lookups - Array Lookups
**Files:** Components with array.includes() in hot paths
**Task:** Use Set/Map for O(1) lookups
**Impact:** Improves lookup performance

#### 25. js-flatmap-filter - Separate Operations
**Files:** Components with map + filter chains
**Task:** Use flatMap to map and filter in one pass
**Impact:** Reduces iterations

#### 26. rendering-hoist-jsx - Static JSX
**Files:** `src/components/hero.tsx`, `src/components/navbar.tsx`
**Task:** Hoist static JSX in components
**Impact:** Reduces JSX creation overhead

#### 27. rendering-conditional-render - && vs Ternary
**Files:** Multiple components
**Task:** Use ternary instead of && for conditionals
**Impact:** Prevents falsey rendering issues

#### 28. bundle-barrel-imports - Barrel Files
**Files:** Import statements
**Task:** Check for barrel imports
**Impact:** Reduces bundle size

#### 29. server-cache-react - Deduplication
**Files:** Convex query functions
**Task:** Implement React.cache() for deduplication
**Impact:** Reduces duplicate queries

#### 30. async-defer-await - Early Awaits
**Files:** Multiple async functions
**Task:** Defer awaits to branches
**Impact:** Improves async performance

#### 31. bundle-defer-third-party - Third-party Scripts
**Files:** Analytics/logging scripts
**Task:** Defer third-party scripts loading
**Impact:** Improves initial load time

#### 32. server-hoist-static-io - Static I/O
**Files:** Server components
**Task:** Hoist static I/O operations
**Impact:** Improves server performance

#### 33. client-passive-event-listeners - Passive Listeners
**Files:** Scroll event listeners
**Task:** Use passive event listeners
**Impact:** Improves scroll performance

#### 34. rerender-derived-state - Derived State
**Files:** Multiple components
**Task:** Optimize derived state calculations
**Impact:** Reduces re-renders

#### 35. rerender-transitions - Non-urgent Updates
**Files:** Components with non-urgent updates
**Task:** Implement useTransition for non-urgent updates
**Impact:** Keeps input responsive

#### 36. rerender-use-ref-transient-values - Transient Values
**Files:** Components with frequent value changes
**Task:** Use refs for transient frequent values
**Impact:** Prevents unnecessary re-renders

#### 37. rendering-activity - Show/hide Patterns
**Files:** Components with show/hide logic
**Task:** Use Activity component for show/hide
**Impact:** Improves animation performance

#### 38. js-cache-property-access - Property Caching
**Files:** Components with property access in loops
**Task:** Cache object properties in loops
**Impact:** Reduces property lookups

#### 39. js-length-check-first - Length Checks
**Files:** Filtering operations
**Task:** Check array length before expensive comparisons
**Impact:** Early exit for empty arrays

#### 40. js-min-max-loop - Min/Max Calculations
**Files:** Components with min/max operations
**Task:** Use loop for min/max instead of sort
**Impact:** O(n) instead of O(n log n)

#### 41. js-tosorted-immutable - Immutable Sorting
**Files:** Components with sorting operations
**Task:** Use toSorted() for immutability
**Impact:** Cleaner immutable operations

## Implementation Strategy

### Phase 1: Critical Issues (Week 1)
1. Fix async-parallel mutations in `aprovacoes/page.tsx`
2. Optimize rerender-defer-reads in `aprovacoes/page.tsx`
3. Optimize js-combine-iterations in grouping logic

### Phase 2: High Impact (Week 2)
4. Implement bundle-dynamic-imports for modals
5. Add rerender-memo for expensive computations
6. Implement js-cache-function-results
7. Optimize server-side data serialization
8. Add cheap condition checks before awaits
9. Add Suspense boundaries for streaming

### Phase 3: Medium Impact (Week 3-4)
10. Optimize rerender-dependencies in effects
11. Move interaction logic to event handlers
12. Use functional setState for stable callbacks
13. Add early returns in functions
14. Remove inline components
15. Add preloading on hover/focus
16. Use after() for non-blocking operations
17. Implement localStorage schema versioning
18. Derive state during render instead of effects
19. Use useDeferredValue for expensive renders
20. Add content-visibility for long lists

### Phase 4: Low Impact (Week 5-6)
21-41. Address remaining low-priority issues

## Testing Strategy

### Performance Testing
- Use Lighthouse to measure performance improvements
- Monitor bundle size changes
- Track Time to Interactive (TTI)
- Measure First Contentful Paint (FCP)

### Regression Testing
- Ensure all existing functionality works correctly
- Test edge cases for each optimization
- Verify no visual regressions

### Monitoring
- Set up performance monitoring
- Track key metrics over time
- Monitor for performance regressions

## Success Metrics

### Target Improvements
- **Bundle Size:** Reduce by 20-30%
- **Time to Interactive:** Improve by 30-40%
- **First Contentful Paint:** Improve by 25-35%
- **Lighthouse Score:** Achieve 90+ in all categories

### Code Quality
- Reduce re-renders by 40-50%
- Improve code maintainability
- Reduce technical debt

## Notes

### React Compiler
The project already has `reactCompiler: true` in `next.config.ts`, which will automatically handle many re-render optimizations. However, manual optimizations are still valuable for:
- Explicit control over performance
- Better understanding of performance patterns
- Edge cases that the compiler might miss

### Convex Integration
Many optimizations relate to Convex queries and mutations. Consider:
- Using React.cache() for query deduplication
- Optimizing data serialization
- Implementing proper error handling

### PWA Support
The project is on the `feature/pwa` branch. Consider PWA-specific optimizations:
- Service worker caching strategies
- Offline-first data handling
- Background sync for mutations

## References

- [Vercel React Best Practices](https://vercel.com/docs/react-best-practices)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Convex Performance](https://docs.convex.dev/optimization)
