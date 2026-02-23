# Angular v20 GameVerse Practice Repository

A comprehensive **learning-focused Angular v20 practice project** demonstrating modern patterns, state management, reactive programming, and real-world integrations. This repository serves as a showcase for advanced Angular concepts and best practices.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Current Features](#current-features)
- [Architecture & Technology Stack](#architecture--technology-stack)
- [Angular v20 Patterns Practiced](#angular-v20-patterns-practiced)
- [Project Structure](#project-structure)
- [Key Integrations](#key-integrations)
- [Testing Infrastructure](#testing-infrastructure)
- [Angular Features TODO (Not Yet Practiced)](#angular-features-todo-not-yet-practiced)
- [Learning Notes & Resources](#learning-notes--resources)
- [Project Notes](#project-notes)

---

## 🎯 Project Overview

**Purpose**: A learning-focused Angular application built to practice and demonstrate modern Angular v20 patterns, state management strategies, and real-world integration scenarios.

**Primary Domain**: Gaming platform with sideline finance tracking and inventory management features.

**Learning Focus Areas**:
- Signal-based reactive state management
- NgRx store integration with Angular v20 signals
- Firebase real-world integration patterns
- Standalone components & lazy routing
- Functional dependency injection
- Advanced RxJS & signal interop
- Service Worker PWA capabilities
- OpenAPI code generation workflows

**Status**: Active learning project with ongoing feature implementation.

---

## ✨ Current Features

### 🎮 Games Module
- **Games List** (`/games`): Browse RAWG video games database with pagination and filtering
- **Game Details** (`/games/:id`): Individual game information with ratings, genres, platforms, and media gallery
- **My Favorites** (`/my-page`): Personalized favorites list with Firebase Firestore persistence

**Pattern Focus**: 
- Signals for pagination and local state
- NgRx store for global game state
- HTTP interceptors for API key injection
- OpenAPI-generated API client integration

---

### 🔐 Authentication Module
- **Login** (`/auth/login`): Firebase authentication with email/password
- **Register** (`/auth/register`): New user registration with profile setup
- **Auth State**: Persistent user session with Redux-style state management

**Pattern Focus**:
- Firebase Authentication integration
- NgRx auth reducer + selectors
- Route guards protecting authenticated routes
- Facade pattern abstracting Firebase complexity
- Signals for reactive UI state

---

### 🎨 Utility Features

#### Color Picker (`/color-picker`)
A lazy-loaded tool for interactive color selection and manipulation.

#### Image Playground (`/images`)
Lazy-loaded image manipulation and gallery exploration.

#### Inventory Items (`/inventory`)
Lazy-loaded inventory management system with CRUD operations.

**Pattern Focus**: 
- Lazy-loaded standalone routes
- Signals for component state
- Dialog-based forms

---

### 📊 Finance Dashboard (`/finance`) - **IN PROGRESS**

#### Completed:
- **Dashboard Page** (`/finance/dashboard-page`): Overview with totals, summary charts, and quick statistics
- **Transactions List** (`/finance/transactions-page`): Full transaction history with filtering and sorting
- **Transaction Dialog**: Add/edit transaction form with validation

#### TODO for Finance Module:
- [ ] **Reports Page** - Analytics and export functionality
- [ ] **Budget Management** - Set and track budget limits
- [ ] **Charts Enhancement** - Advanced data visualization with ng-apexcharts
- [ ] **Transaction Import** - CSV/Excel file upload capability
- [ ] **Category Management** - Custom transaction categories
- [ ] **Recurring Transactions** - Automated recurring entry support
- [ ] **Financial Goals** - Save/investment goal tracking

**Pattern Focus**: 
- Child routes within lazy-loaded feature module
- Material Dialog integration with forms
- Signal-based form state management
- Mock data for development and testing

---

### 🧪 NgRx Demo (`/ngrx`)
Demonstration page for NgRx store patterns and signal integration testing.

---

## 🏗️ Architecture & Technology Stack

### Core Framework
- **Angular v20.3.16** - Latest LTS with native signals
- **TypeScript v5.9.2** - Strict mode enabled
- **RxJS ~7.8.0** - Reactive extensions

### State Management
- **NgRx v20.1.0** - Redux-style global state
  - `@ngrx/store` - Store setup
  - `@ngrx/effects` - Side effects handling
  - `@ngrx/entity` - Entity adapters for normalization
  - `@ngrx/signals` - Signal integration (Angular v20 native)
  - `@ngrx/store-devtools` - Redux DevTools integration (dev mode)

### Backend & Data
- **Firebase v20.0.1**
  - Firebase Authentication
  - Cloud Firestore database
- **RAWG API** - Video games database (OpenAPI-generated client)

### UI & Styling
- **Angular Material v20.2.9** - Pre-built components (Dialog, Form, Input, Select, Icon, SnackBar)
- **Tailwind CSS v4.1.17** - Utility-first CSS framework
- **SCSS** - Component-scoped styling

### Code Generation
- **@openapitools/openapi-generator-cli v2.23.1** - Auto-generates API client from OpenAPI/Swagger specs

### Development Tools
- **Angular CLI v20.3.14** - Build & development tooling
- **ESLint** - Code linting with Angular plugin
- **Prettier v3.6.2** - Code formatting
- **Karma v6.4.0** - Test runner
- **Jasmine v5.9.0** - Testing framework

### PWA & Performance
- **Angular Service Worker** - Offline support and asset caching
- **Workbox** - Service Worker strategies (prefetch & lazy caching)

---

## 🎓 Angular v20 Patterns Practiced

### ✅ Signals & Reactive Primitives
**What**: Angular v20 native reactive state without RxJS observables

**Practiced In**:
- [src/app/pages/games/games.component.ts](src/app/pages/games/games.component.ts) - Pagination state (`pageNumber`, `isLoading`)
- [src/app/core/services/auth.service.ts](src/app/core/services/auth.service.ts) - `user()` signal for auth state
- [src/app/components/game-card/game-card.component.ts](src/app/components/game-card/game-card.component.ts) - Component input signals

**Key Techniques**:
```typescript
// Basic signal
const count = signal(0);

// Signal computed from other signals
const doubled = computed(() => count() * 2);

// Update signal imperatively
count.set(5);
count.update(v => v + 1);
```

---

### ✅ Effects (Angular v20)
**What**: Automatic side-effect tracking when signal dependencies change

**Practiced In**:
- [src/app/app.ts](src/app/app.ts) - `syncUserEffect` watches Firebase auth changes and syncs to NgRx store
- [src/app/pages/my-page/my-page.component.ts](src/app/pages/my-page/my-page.component.ts) - Watches `uid` signal and loads favorites
- [src/app/pages/finance/transactions-page/transactions-page.component.ts](src/app/pages/finance/transactions-page/transactions-page.component.ts) - Watches filter signals and updates transaction list

**Key Techniques**:
```typescript
// Effect that runs when dependencies change
effect(() => {
  const user = authService.user();
  if (user) {
    loadUserFavorites(user.uid);
  }
});
```

---

### ✅ Standalone Components
**What**: Components without NgModule dependencies, self-contained with imports

**Practiced In**:
- All page components are standalone
- [src/app/pages/games/games.component.ts](src/app/pages/games/games.component.ts)
- [src/app/pages/login/login.component.ts](src/app/pages/login/login.component.ts)
- [src/app/components/game-card/game-card.component.ts](src/app/components/game-card/game-card.component.ts)

**Key Techniques**:
```typescript
@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, MatDialog, GameCardComponent],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent { }
```

---

### ✅ Lazy-Loaded Routes with Standalone Components
**What**: Load feature modules on-demand without upfront parsing

**Practiced In**:
- [src/app/app.routes.ts](src/app/app.routes.ts) - Routes configuration with lazy loading:
  - `/color-picker` - ColorPickerComponent
  - `/images` - ImagePlaygroundComponent
  - `/inventory` - InventoryItemsComponent
  - `/finance` - Finance feature with child routes
  - `/ngrx` - NgRx demo

**Key Techniques**:
```typescript
const routes: Routes = [
  {
    path: 'color-picker',
    loadComponent: () => import('./pages/color-picker/color-picker.component')
      .then(m => m.ColorPickerComponent)
  },
  {
    path: 'finance',
    loadChildren: () => import('./pages/finance/finance.routes')
      .then(m => m.FINANCE_ROUTES)
  }
];
```

---

### ✅ Route Guards
**What**: Protect routes based on authentication state before navigation

**Practiced In**:
- [src/app/core/guards/auth.guard.ts](src/app/core/guards/auth.guard.ts) - Prevents authenticated users from accessing login/register pages

**Key Techniques**:
```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const isAuthenticated$ = store.select(selectIsAuthenticated);
  return isAuthenticated$.pipe(
    map(isAuth => isAuth ? router.parseUrl('/games') : true)
  );
};
```

---

### ✅ NgRx Store Integration
**What**: Redux-style global state management with actions, reducers, selectors

**Practiced In**:
- [src/app/store/auth.actions.ts](src/app/store/auth.actions.ts) - Auth actions (loginSuccess, logout)
- [src/app/store/auth.reducer.ts](src/app/store/auth.reducer.ts) - Auth state reducer
- [src/app/store/auth.selector.ts](src/app/store/auth.selector.ts) - Auth selectors (selectIsAuthenticated, selectUser)
- [src/app/app.config.ts](src/app/app.config.ts) - Store configuration with reducers

**Key Techniques**:
```typescript
// Store dispatch
store.dispatch(authActions.loginSuccess({ user }));

// Selectors
const isAuth$ = store.select(selectIsAuthenticated);
const user$ = store.select(selectUser);

// State structure
{
  auth: { isAuthenticated: true, user: User | null },
  ngrxTestItems: { items: [], selected: null }
}
```

---

### ✅ HTTP Interceptors (Functional)
**What**: Intercept and modify HTTP requests/responses globally

**Practiced In**:
- [src/app/core/interceptors/api-key.interceptor.ts](src/app/core/interceptors/api-key.interceptor.ts) - Adds RAWG API key to outgoing requests

**Key Techniques**:
```typescript
export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('rawg.io')) {
    req = req.clone({
      params: req.params.set('key', environment.rawgApiKey)
    });
  }
  return next(req);
};
```

---

### ✅ Dependency Injection with `inject()`
**What**: Functional approach to DI, retrieving services imperatively

**Practiced In**:
- Every component and service uses `inject()` instead of constructor parameters
- [src/app/core/services/auth.service.ts](src/app/core/services/auth.service.ts)
- [src/app/pages/games/games.component.ts](src/app/pages/games/games.component.ts)

**Key Techniques**:
```typescript
// Functional DI
const authService = inject(AuthService);
const store = inject(Store);
const router = inject(Router);
const http = inject(HttpClient);
```

---

### ✅ RxJS to Signal Interop
**What**: Convert observables to signals for reactive component state

**Practiced In**:
- [src/app/pages/games/games.component.ts](src/app/pages/games/games.component.ts) - `toSignal()` converts HTTP response to signal
- [src/app/pages/login/login.component.ts](src/app/pages/login/login.component.ts) - `toSignal()` for auth state

**Key Techniques**:
```typescript
// Convert Observable to Signal
const games = toSignal(gamesService.getGames$(), {
  initialValue: [],
  injector: this.injector
});

// Automatic unsubscription when component destroys
```

---

### ✅ Computed Signals (Derived State)
**What**: Create reactive derived values that update automatically

**Practiced In**:
- [src/app/pages/games/games.component.ts](src/app/pages/games/games.component.ts) - `pageTitle` computed from loadType
- [src/app/pages/my-page/my-page.component.ts](src/app/pages/my-page/my-page.component.ts) - `displayName` computed from user signal

**Key Techniques**:
```typescript
const displayName = computed(() => {
  const user = userSignal();
  return user?.displayName || 'Guest';
});
```

---

### ✅ Facade Pattern
**What**: Abstract service complexity behind simplified API

**Practiced In**:
- [src/app/core/facades/auth.facade.ts](src/app/core/facades/auth.facade.ts) - Abstracts Firebase Auth + Firestore operations:
  - `signup()` - User registration with profile creation
  - `login()` - Email/password authentication
  - `logout()` - Sign out and cleanup
  - `updateProfile()` - User profile updates
  - `addFavoriteGame()` - Firestore document updates
  - `removeFavoriteGame()` - Firestore document cleanup

---

### ✅ Material Design Components Integration
**What**: Pre-built Material components for consistent UI

**Practiced In**:
- **MatDialog** - Transaction forms, modals
- **MatFormField** - Form input containers
- **MatSelect** - Dropdown selections
- **MatInput** - Text inputs
- **MatIcon** - Icon rendering
- **MatSnackBar** - Toast notifications

---

### ✅ OpenAPI Code Generation
**What**: Auto-generate type-safe API client from OpenAPI/Swagger specification

**Practiced In**:
- [src/app/api-client/](src/app/api-client/) - RAWG API client generated from OpenAPI spec
- Generated models, API service, configuration endpoints
- Demonstrates CI/CD workflow for API spec changes

---

## 📁 Project Structure

```
src/app/
├── app.config.ts              # NgRx store, providers setup
├── app.routes.ts              # Routing configuration with lazy loading
├── app.ts                      # Root component with sync effect
│
├── api-client/                # Generated OpenAPI client
│   ├── api.base.service.ts
│   ├── configuration.ts
│   ├── model/                 # Generated DTOs
│   └── api/                   # Generated API services
│
├── core/
│   ├── facades/
│   │   └── auth.facade.ts    # Firebase Auth + Firestore abstraction
│   ├── guards/
│   │   └── auth.guard.ts     # Route guard for auth pages
│   ├── interceptors/
│   │   └── api-key.interceptor.ts  # RAWG API key injection
│   ├── services/
│   │   ├── auth.service.ts         # Firebase Auth integration
│   │   ├── games.service.ts        # RAWG API client wrapper
│   │   ├── user-data.service.ts    # Firestore user data
│   │   └── [finance-services]/     # Finance utilities
│   └── utils/                      # Helper utilities
│
├── components/                # Reusable UI components
│   ├── header/               # Main navigation header
│   ├── game-card/            # Game preview card
│   ├── sidebar/              # Sidebar navigation
│   ├── media-gallery/        # Image gallery viewer
│   ├── ratings/              # Game ratings display
│   ├── tag/                  # Categorical tags
│   ├── color-picker/         # Color selection tool
│   ├── finance/              # Finance UI components
│   ├── inventory/            # Inventory management UI
│   └── header-text/          # Header typography
│
├── pages/                    # Feature pages (routes)
│   ├── games/               # Games list & layout
│   ├── game-detail/         # Individual game view
│   ├── login/               # Authentication page
│   ├── register/            # Registration page
│   ├── my-page/             # Favorites page
│   ├── color-picker/        # Lazy-loaded color tool
│   ├── image-playground/    # Lazy-loaded image tool
│   ├── inventory-items/     # Lazy-loaded inventory
│   ├── ngrx-test-items/     # Lazy-loaded NgRx demo
│   ├── finance/             # Lazy-loaded finance module
│   │   ├── finance.routes.ts
│   │   ├── dashboard-page/
│   │   ├── transactions-page/
│   │   └── transaction-detail/
│   └── not-found/           # 404 fallback
│
├── models/                  # TypeScript interfaces & types
│   ├── user.model.ts
│   ├── ratings.model.ts
│   ├── error.model.ts
│   ├── user-role.ts
│   ├── user-gender.ts
│   ├── finance/             # Finance domain models
│   └── inventory/           # Inventory domain models
│
├── store/                   # NgRx state management
│   ├── auth.actions.ts
│   ├── auth.reducer.ts
│   └── auth.selector.ts
│
├── services/                # Domain-specific services
│   └── finance/
│       ├── transaction.service.ts
│       ├── formatting.service.ts
│       └── validation.service.ts
│
├── data/                    # Mock data for development
│   ├── mock-games.ts
│   ├── mock-games.json
│   └── mock-inventory-items.ts
│
├── testing/                 # Test utilities & fixtures
│   ├── mock-game.json
│   └── mock-games.json
│
├── environments/            # Environment configuration
│   ├── environment.ts       # Production config
│   └── environment.development.ts  # Development config
│
└── assets/                  # Static assets
    └── images/
```

---

## 🔗 Key Integrations

### Firebase Authentication & Firestore
- Real-time user authentication
- Persistent user profiles with favorites tracking
- Cloud Firestore for user-specific data

**Files**: [src/app/core/services/auth.service.ts](src/app/core/services/auth.service.ts), [src/app/core/facades/auth.facade.ts](src/app/core/facades/auth.facade.ts)

---

### RAWG Video Games API
- 500K+ video game database
- OpenAPI specification for auto-generated client
- Images, reviews, platforms, genres

**Files**: [src/app/api-client/](src/app/api-client/), [src/app/core/services/games.service.ts](src/app/core/services/games.service.ts)

---

### Angular Material
- Pre-styled components (Dialog, Form, Input, Icon)
- Accessibility built-in
- Theming support

**Used In**: Transaction forms, game cards, navigation headers

---

### Tailwind CSS
- Utility-first styling framework
- Responsive design utilities
- Custom component definitions

**Integration**: Combined with SCSS for component scoping

---

### Service Worker & PWA
- Offline support with prefetch strategy
- Asset caching for improved performance
- Workbox integration configured

**Config**: [ngsw-config.json](ngsw-config.json)

---

## 🧪 Testing Infrastructure

### Test Framework
- **Jasmine v5.9.0** - Testing framework
- **Karma v6.4.0** - Test runner
- **Chrome Launcher** - Browser for tests
- **Coverage Reporter** - Code coverage analysis

### Mock Data
- [src/app/data/mock-games.ts](src/app/data/mock-games.ts) - Mock game objects
- [src/app/data/mock-inventory-items.ts](src/app/data/mock-inventory-items.ts) - Mock inventory
- [src/app/testing/](src/app/testing/) - JSON fixtures

### NgRx Testing
- `provideMockStore()` - Testing store state
- Mock selectors and effects

### Test Commands
```bash
ng test                    # Run tests once
ng test --watch           # Watch mode
ng test --code-coverage   # Generate coverage report
```

---

## ✅ What Needs to Be Done - Finance Module

### 📊 Finance Dashboard Enhancement TODO

**Current Status**: Dashboard page and transactions list are implemented. The following features need completion:

| Priority | Feature | Complexity | Estimated Work | Notes |
|----------|---------|-----------|-----------------|-------|
| **HIGH** | Reports Page | Medium | 3-4 days | Analytics dashboard with expense breakdowns by category, date range filtering |
| **HIGH** | Budget Management | Medium | 2-3 days | Set monthly budgets per category, alert when approaching limit, comparison with actual spending |
| **HIGH** | Category Management | Low | 1-2 days | Allow custom transaction categories, categorize existing transactions, edit/delete categories |
| **MEDIUM** | Charts Enhancement | Medium | 2-3 days | Integrate ng-apexcharts for advanced visualizations (pie, bar, line, area charts) |
| **MEDIUM** | Recurring Transactions | Medium | 3-4 days | Schedule recurring payments/income, auto-generate entries on specified dates |
| **MEDIUM** | Transaction Import | Medium | 2-3 days | CSV/Excel upload for bulk transaction import with mapping UI |
| **LOW** | Financial Goals | Low | 2-3 days | Set savings/investment goals, track progress, milestone notifications |
| **LOW** | Export Functionality | Low | 1 day | Export transactions/reports to PDF or CSV |
| **FUTURE** | Multi-currency Support | High | 4-5 days | Support multiple currencies with conversion rates, category-based currency tracking |
| **FUTURE** | Forecasting | High | 5+ days | Predictive spending forecasts based on historical data, trend analysis |

---

## 🎓 Angular v20 & Frontend Features to Practice

### Priority 1: Core Angular Patterns (Immediate)

#### 🔮 **Advanced Routing & Navigation** (5 Techniques)

**1. Dynamic Route Parameters with Signals**
- [ ] Create utility function to sync route params to signals
  - [ ] Extract param from ActivatedRoute.paramMap
  - [ ] Convert to signal using `toSignal()`
  - [ ] Auto-update when route changes
- [ ] Implementation steps:
  - File: `src/app/core/utils/route-params.util.ts`
  - Export: `routeParamAsSignal(paramName: string): Signal<string | null>`
  - Test: Create util spec with mock ActivatedRoute
- [ ] Use case: Game detail page loads game ID from `/games/:id`
  - Current: Calls service in ngOnInit
  - Enhanced: Sync ID to signal, auto-load on change

**2. Route Resolvers for Data Pre-loading**
- [ ] Create resolver for GameDetailComponent
  - [ ] Fetch game data before route activation
  - [ ] Handle errors with fallback routes
  - [ ] Cancel requests if route changes
- [ ] Implementation:
  - File: `src/app/core/resolvers/game.resolver.ts`
  - Interface: `export const gameResolver: ResolveFn<Game>`
  - Inject in route: `resolve: { game: gameResolver }`
- [ ] Benefits: No loading spinner, better UX
- [ ] Error handling: Navigate to 404 on failed resolve

**3. Query Parameter Synchronization with Signals**
- [ ] Sync URL query params to reactive state
  - [ ] Finance filters: `?category=food&startDate=2025-01-01`
  - [ ] Games sorting: `?sort=rating&order=desc&page=1`
  - [ ] Favorites search: `?search=zelda`
- [ ] Implementation:
  - File: `src/app/pages/games/games.component.ts` (extend)
  - Watch `ActivatedRoute.queryParams`
  - Update signals on param changes
  - Navigate with updated params when signals change
- [ ] Benefits: Shareable URLs, browser back/forward support

**4. Custom Route Matchers**
- [ ] Match complex URL patterns
  - [ ] `/game/the-legend-of-zelda-123` instead of `/game/123`
  - [ ] Slug-based routing for SEO
- [ ] Implementation:
  - File: `src/app/app.routes.ts` (extend)
  - Create matcher function with regex
  - Extract ID from slug in component
  - Resolve full game data from ID
- [ ] Test cases:
  - Valid slug: Match and extract ID
  - Invalid slug: No match, fall through
  - Duplicate slugs: Verify unique routing

**5. Router State Management Integration**
- [ ] Store router state in NgRx for debugging
  - [ ] Install: `@ngrx/router-store`
  - [ ] Track navigation events
  - [ ] Enable time-travel debugging
- [ ] Implementation:
  - File: `src/app/app.config.ts` (extend)
  - Add `StoreRouterConnectingModule`
  - Configure `routerState` serialization
  - Create selectors for route state
- [ ] Benefits: Debug route changes, replay navigation history

---

#### 🎯 **Signal-Based Component Communication** (4 Techniques)

**1. Signal Inputs with `input()` and `input.required`**
- [ ] Replace `@Input()` with signal-based inputs
  - [ ] File: `src/app/components/game-card/game-card.component.ts`
  - [ ] Old: `@Input() game: Game;`
  - [ ] New: `readonly game = input.required<Game>();`
- [ ] Implementation steps:
  - [ ] Step 1: Import `input, input.required` from `@angular/core`
  - [ ] Step 2: Replace all @Input() decorators
  - [ ] Step 3: Update template: `{{ game().name }}` with parens
  - [ ] Step 4: Update tests to pass signal values
- [ ] Type safety benefits:
  - [ ] Compile-time guarantee: game is always provided
  - [ ] No undefined checks needed
  - [ ] Better IDE autocomplete
- [ ] Apply to: GameCardComponent, HeaderComponent, RatingsComponent, TagComponent

**2. Signal Outputs with `output()`**
- [ ] Replace `@Output() EventEmitter` with signal outputs
  - [ ] File: `src/app/components/game-card/game-card.component.ts`
  - [ ] Old: `@Output() favoriteToggled = new EventEmitter<boolean>();`
  - [ ] New: `onFavoriteToggle = output<boolean>();`
- [ ] Implementation:
  - [ ] Import `output` from `@angular/core`
  - [ ] Create output emitters for all user actions
  - [ ] Emit: `this.onFavoriteToggle.emit(true);`
  - [ ] Parent listen: `(onFavoriteToggle)="handleFavorite($event)"`
- [ ] Apply to: All interactive components (cards, buttons, forms)

**3. Two-Way Binding with Signals**
- [ ] Implement `[(value)]` binding with signals
  - [ ] File: Create `src/app/components/transaction-input/transaction-input.component.ts`
  - [ ] Input signal: `value = input<string>();`
  - [ ] Output: `onValueChange = output<string>();`
  - [ ] Template: Listen to input change events, emit updated value
- [ ] Usage in parent:
  - [ ] `[(value)]="transactionAmount"` binds to signal
  - [ ] Automatic sync both directions
- [ ] Benefits: Cleaner template syntax, less boilerplate

**4. Transform Functions in Signal Inputs**
- [ ] Auto-transform input values
  - [ ] File: `src/app/components/tag/tag.component.ts`
  - [ ] Example 1: `label = input('', { transform: (val) => val.toLowerCase() })`
  - [ ] Example 2: `count = input(0, { transform: (val) => Math.max(0, val) })`
  - [ ] Example 3: `name = input('', { transform: (val) => val?.trim() })`
- [ ] Implementation:
  - [ ] Define transform function
  - [ ] Pass in input options
  - [ ] Value automatically transformed on every update
- [ ] Use cases:
  - [ ] Sanitize strings (trim, lowercase)
  - [ ] Clamp numbers (min/max bounds)
  - [ ] Parse dates/numbers
  - [ ] Validate enum values

---

#### ⚙️ **Change Detection Optimization** (4 Strategies)

**1. OnPush Change Detection Strategy**
- [ ] Apply to high-frequency components
  - [ ] Files: `GamesComponent`, `TransactionsComponent`, `GameCardComponent`
  - [ ] Add: `changeDetection: ChangeDetectionStrategy.OnPush`
- [ ] Implementation steps:
  - [ ] Step 1: Import `ChangeDetectionStrategy` from `@angular/core`
  - [ ] Step 2: Add to `@Component` decorator
  - [ ] Step 3: Verify all inputs are signals or observables
  - [ ] Step 4: Update change detection manually if needed: `markForCheck()`
- [ ] Benefits:
  - [ ] Only check when inputs change
  - [ ] Skip checks during unrelated events
  - [ ] ~40% improvement for large lists
- [ ] Verification:
  - [ ] No `ExpressionChangedAfterCheckError` errors
  - [ ] Component still updates correctly
  - [ ] Profile before/after with DevTools

**2. Signal-Based Change Detection Benefits**
- [ ] Understand signals improve change detection
  - [ ] Signals notify Angular only when value actually changes
  - [ ] No need to manually trigger `markForCheck()`
  - [ ] Works seamlessly with OnPush strategy
- [ ] Implementation:
  - [ ] Convert local state from BehaviorSubject to signal
  - [ ] Verify no extra change detection cycles
  - [ ] Measure with Angular DevTools
- [ ] Components to optimize:
  - [ ] `GamesComponent`: Convert `pageNumber$` to signal
  - [ ] `TransactionsComponent`: Convert `filters$` to signal

**3. Performance Monitoring with DevTools**
- [ ] Setup Angular DevTools profiling
  - [ ] Install: Chrome extension "Angular DevTools"
  - [ ] Open: Chrome DevTools → "Angular" tab
- [ ] Profiling steps:
  - [ ] Open Profiler tab
  - [ ] Click "Record"
  - [ ] Perform action (pagination, filtering)
  - [ ] Stop recording
  - [ ] Analyze:
    - [ ] Which components updated?
    - [ ] How many change detection cycles?
    - [ ] What triggered each cycle?
- [ ] Benchmarking:
  - [ ] Before optimization: Baseline metrics
  - [ ] After optimization: Compare metrics
  - [ ] Target: <16ms per frame (60fps)

**4. Avoiding Change Detection Cycles**
- [ ] Understand and prevent `ExpressionChangedAfterCheckError`
  - [ ] Cause: Property changes after check phase
  - [ ] Example: Setting signal in ngAfterViewInit
  - [ ] Fix: Set values in ngOnInit or constructor instead
- [ ] Common pitfalls & fixes:
  - [ ] ❌ Updating state in `ngAfterViewInit`
  - [ ] ✅ Update in `ngOnInit` or use effects
  - [ ] ❌ Modifying arrays/objects directly
  - [ ] ✅ Use immutable updates (new array, spread operator)
  - [ ] ❌ Calling service methods in template getters
  - [ ] ✅ Pre-compute values in component
- [ ] Testing:
  - [ ] Enable: `ng serve --error-on-performance-budget-exceeded`
  - [ ] Run tests with `--watch` to catch issues early

---

### Priority 2: Testing & Quality (Week 1-2)

#### 🧪 **Advanced Testing Patterns** (6 Types)

**1. Component Integration Tests with Material Dialogs**
- [ ] Test TransactionDialogComponent open/close/submit
  - [ ] File: `src/app/pages/finance/transaction-detail/transaction-detail.component.spec.ts`
- [ ] Test setup:
  - [ ] Setup: `TestBed.configureTestingModule()` with MatDialogModule, ReactiveFormsModule
  - [ ] Create: Mock MatDialogRef with `jasmine.createSpyObj()`
  - [ ] Provide: MAT_DIALOG_DATA with test transaction object
- [ ] Test cases:
  - [ ] Dialog opens with correct data
  - [ ] Form validates correctly
  - [ ] Submit emits result
  - [ ] Close without saving dismisses
  - [ ] Form errors display (required fields, invalid amounts)
- [ ] Code example structure:
  ```typescript
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: testTransaction }
      ]
    }).compileComponents();
  });
  ```

**2. Service Testing with HttpClientTestingModule**
- [ ] Test GamesService with mock HTTP
  - [ ] File: `src/app/core/services/games.service.spec.ts`
- [ ] Setup:
  - [ ] Import: `HttpClientTestingModule`
  - [ ] Inject: `HttpTestingController`
  - [ ] Create service with mock HTTP backend
- [ ] Test cases:
  - [ ] `getGames()` - Successful response with pagination
  - [ ] `getGameById()` - Returns single game
  - [ ] `searchGames()` - Filter results
  - [ ] Error handling - 404, 500, timeout scenarios
  - [ ] Interceptor integration - API key added to requests
- [ ] Mock response verification:
  ```typescript
  it('should fetch games', () => {
    service.getGames().subscribe(games => {
      expect(games.length).toBe(2);
    });
    const req = httpMock.expectOne(`/api/games`);
    expect(req.request.method).toBe('GET');
    req.flush([mockGame1, mockGame2]);
  });
  ```

**3. NgRx Store Effects Testing**
- [ ] Test side effects with mock store
  - [ ] File: Create `src/app/store/auth.effects.spec.ts`
  - [ ] File: Create `src/app/pages/finance/store/transactions.effects.spec.ts`
- [ ] Setup:
  - [ ] Import: `provideMockStore()`
  - [ ] Inject: Store with mock state
  - [ ] Use: `hot()` and `cold()` for marble testing
- [ ] Test cases:
  - [ ] Action dispatched → Effect runs
  - [ ] Service call completes → Success action emitted
  - [ ] Service call fails → Error action emitted
  - [ ] Multiple effects don't interfere
- [ ] Example structure:
  ```typescript
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState: mockState }),
        TransactionEffects
      ]
    });
  });
  ```

**4. Async Component Testing (fakeAsync/tick)**
- [ ] Test components with async operations
  - [ ] File: `src/app/pages/games/games.component.spec.ts`
- [ ] Test scenarios:
  - [ ] `fakeAsync()` - Simulate passing time
  - [ ] `tick()` - Advance time by milliseconds
  - [ ] `flush()` - Complete all pending async
- [ ] Example test:
  ```typescript
  it('should load games after delay', fakeAsync(() => {
    component.loadGames();
    expect(component.isLoading()).toBe(true);
    tick(1000); // Simulate 1 second passing
    expect(component.isLoading()).toBe(false);
    expect(component.games().length).toBeGreaterThan(0);
  }));
  ```
- [ ] Use cases:
  - [ ] Debounced search input
  - [ ] Delayed navigation
  - [ ] Timeout handling

**5. E2E Testing Setup (Cypress/Playwright)**
- [ ] Setup E2E test framework
  - [ ] Install: `npm install --save-dev cypress` or `playwright`
  - [ ] Generate: `ng e2e` or create cypress.config.ts
- [ ] Critical user flows to test:
  - [ ] Flow 1: Auth → Login → Games list
  - [ ] Flow 2: Browse game → View details → Add to favorites
  - [ ] Flow 3: Finance → Add transaction → View in list
- [ ] Cypress example structure:
  ```typescript
  describe('Auth Flow', () => {
    it('should login and navigate to games', () => {
      cy.visit('/auth/login');
      cy.get('input[name=email]').type('test@example.com');
      cy.get('input[name=password]').type('password123');
      cy.get('button[type=submit]').click();
      cy.url().should('include', '/games');
    });
  });
  ```
- [ ] Run tests:
  - [ ] Interactive: `npx cypress open`
  - [ ] Headless: `npx cypress run`

**6. Accessibility Testing (a11y)**
- [ ] Setup accessibility testing
  - [ ] Install: `npm install --save-dev axe-core @axe-core/jasmine`
  - [ ] Or use Pa11y: `npm install --save-dev pa11y`
- [ ] Test implementation:
  - [ ] File: `src/app/components/game-card/game-card.component.a11y.spec.ts`
  - [ ] Check: ARIA labels, keyboard navigation, color contrast
- [ ] Checklist:
  - [ ] All buttons have aria-label or visible text
  - [ ] Forms have labels associated with inputs
  - [ ] Images have alt text
  - [ ] Color contrast meets WCAG AA standard
  - [ ] Tab order is logical
  - [ ] Dialogs trap focus
  - [ ] Landmarks (nav, main, region) are used
- [ ] Automated test example:
  ```typescript
  it('should have no a11y violations', () => {
    cy.injectAxe();
    cy.checkA11y();
  });
  ```

---

#### 📡 **Advanced HTTP Layer** (6 Patterns)

**1. Request Retry Logic with Exponential Backoff**
- [ ] Create retry interceptor for failed requests
  - [ ] File: `src/app/core/interceptors/retry.interceptor.ts`
  - [ ] Config: 3 retries with exponential backoff (100ms, 200ms, 400ms)
- [ ] Implementation steps:
  - [ ] Import: `retry`, `delay` from `rxjs/operators`
  - [ ] Calculate: Next retry delay = baseDelay * Math.pow(2, attemptNumber)
  - [ ] Only retry on: 408, 429, 5xx status codes
  - [ ] Don't retry: 4xx errors except 408, POST/PUT with body (idempotency concern)
- [ ] Code pattern:
  ```typescript
  return next.handle(request).pipe(
    retry({
      count: 3,
      delay: (error, retryCount) => 
        timer(100 * Math.pow(2, retryCount - 1))
    }),
    catchError(err => throwError(() => err))
  );
  ```
- [ ] Test cases:
  - [ ] Successful retry after 1 failure
  - [ ] Max retries exceeded → error thrown
  - [ ] Non-retryable errors skip retry logic

**2. Request Deduplication**
- [ ] Prevent duplicate simultaneous requests
  - [ ] File: `src/app/core/interceptors/request-dedup.interceptor.ts`
  - [ ] Use case: Rapid pagination clicks shouldn't trigger multiple requests
- [ ] Implementation:
  - [ ] Map key: `method + url + serialized body`
  - [ ] Store pending request subjects in Map
  - [ ] If request in-flight: return existing subject with `shareReplay()`
  - [ ] When request completes: remove from map
- [ ] Benefits:
  - [ ] Reduce server load
  - [ ] Better performance for slow networks
  - [ ] Transparent to components (interceptor handles it)
- [ ] Code pattern:
  ```typescript
  const key = `${req.method}:${req.url}`;
  if (this.pending.has(key)) {
    return this.pending.get(key)!;
  }
  const request$ = next.handle(req).pipe(
    shareReplay(1),
    finalize(() => this.pending.delete(key))
  );
  this.pending.set(key, request$);
  return request$;
  ```

**3. Response Caching with Signals**
- [ ] Implement HTTP cache with TTL
  - [ ] File: `src/app/core/interceptors/cache.interceptor.ts`
  - [ ] Cache game details for 10 minutes
  - [ ] Cache game list for 5 minutes
- [ ] Implementation:
  - [ ] Store: `Map<string, { data: any, timestamp: number }>`
  - [ ] On cache hit: Compare `Date.now() - timestamp < ttl`
  - [ ] Return cached data without HTTP request
  - [ ] Conditionally cache (GET only, skip POST/PUT/DELETE)
- [ ] Cache invalidation:
  - [ ] Expire after TTL
  - [ ] Manual invalidation: Signal to clear cache on mutation
  - [ ] File: `src/app/core/services/cache.service.ts` (create)
- [ ] Code pattern:
  ```typescript
  if (req.method === 'GET' && this.cache.has(cacheKey)) {
    const { data, timestamp } = this.cache.get(cacheKey)!;
    if (Date.now() - timestamp < this.ttl) {
      return of(new HttpResponse({ body: data, status: 200 }));
    }
  }
  ```

**4. Error Transformation with Typed Errors**
- [ ] Create custom error types
  - [ ] File: `src/app/models/error.model.ts` (expand)
  - [ ] Types: `ApiError`, `ValidationError`, `NotFoundError`, `NetworkError`
  - [ ] Base: `ErrorResponse { code: string; message: string; details?: any; }`
- [ ] Implementation:
  - [ ] File: `src/app/core/interceptors/error.interceptor.ts`
  - [ ] Parse HTTP error status → custom error type
  - [ ] Extract error message from response body
  - [ ] Transform to domain model
- [ ] Error handling:
  - [ ] 404 → `NotFoundError('Game not found')`
  - [ ] 400 → `ValidationError` with field details
  - [ ] 500 → `ApiError('Server error')`
  - [ ] Network → `NetworkError('No connection')`
- [ ] Benefits:
  - [ ] Type-safe error handling in components
  - [ ] Consistent error display
  - [ ] Better logging/debugging

**5. Upload/Download Progress Tracking**
- [ ] Track file upload progress
  - [ ] File: `src/app/pages/finance/transaction-import/transaction-import.component.ts`
  - [ ] Use case: Import transactions from CSV
- [ ] Implementation:
  - [ ] HttpClient option: `{ reportProgress: true, responseType: 'json' }`
  - [ ] Listen to: `HttpProgressEvent` and `HttpResponse`
  - [ ] Calculate: `progress = (loaded / total) * 100`
- [ ] Component template:
  ```typescript
  <mat-progress-bar 
    *ngIf="uploadProgress() > 0"
    mode="determinate" 
    [value]="uploadProgress()">
  </mat-progress-bar>
  ```
- [ ] Service method:
  ```typescript
  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('/api/import', formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }
  ```
- [ ] Download progress: Similar pattern for file downloads

**6. Timeout & Request Cancellation**
- [ ] Implement request timeout
  - [ ] File: `src/app/core/interceptors/timeout.interceptor.ts`
  - [ ] Default timeout: 30 seconds
  - [ ] Per-request override: Inject via headers or custom token
- [ ] Implementation:
  - [ ] Import: `timeout()` from `rxjs/operators`
  - [ ] Chain: `pipe(timeout(30000), catchError(...))`
  - [ ] Error: `TimeoutError` → show user-friendly message
- [ ] Cancel pending requests:
  - [ ] Use `AbortController` (modern approach)
  - [ ] Or store subscription, `unsubscribe()` on destroy
  - [ ] Inject `DestroyRef` from `@angular/core`
- [ ] Code pattern:
  ```typescript
  constructor(private destroyRef: DestroyRef) {}
  
  loadData(): void {
    this.service.getData()
      .pipe(
        timeout(30000),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(...);
  }
  ```
- [ ] Benefits:
  - [ ] Prevent hanging requests
  - [ ] Better UX (show error after timeout)
  - [ ] Free up resources

---

### Priority 3: Advanced State & Architecture (Week 2-3)

#### 🏗️ **Advanced State Management** (5 Patterns)

**1. NgRx Entity Adapters for Normalized State**
- [ ] Normalize games list state with entity adapter
  - [ ] File: Create `src/app/store/games/games.state.ts`
  - [ ] Define entity: `export interface Game { id: number; name: string; ... }`
- [ ] Implementation steps:
  - [ ] Import: `createEntityAdapter` from `@ngrx/entity`
  - [ ] Create: `const adapter = createEntityAdapter<Game>()`
  - [ ] Use methods: `adapter.getInitialState()`, `adapter.addOne()`, `adapter.updateMany()`
  - [ ] Build selectors: `adapter.getSelectors()` → `selectAll`, `selectById`, `selectIds`
- [ ] Benefits:
  - [ ] O(1) lookup by ID instead of O(n) array search
  - [ ] Efficient updates: Only update changed items
  - [ ] Built-in memoized selectors
  - [ ] Automatic sort/pagination helpers
- [ ] Use case: Games list state management

**2. Feature Store Architecture**
- [ ] Create separate store for finance module
  - [ ] File structure: `src/app/pages/finance/store/`
  - [ ] Implement: `transactions.actions.ts`, `transactions.reducer.ts`, `transactions.selector.ts`
- [ ] Folder structure:
  - [ ] `src/app/pages/finance/store/transactions.actions.ts`
  - [ ] `src/app/pages/finance/store/transactions.reducer.ts`
  - [ ] `src/app/pages/finance/store/transactions.selector.ts`
  - [ ] `src/app/pages/finance/store/transactions.effects.ts`
  - [ ] `src/app/pages/finance/store/index.ts` (barrel export)
- [ ] Implementation:
  - [ ] Actions: `loadTransactions`, `loadTransactionsSuccess`, `loadTransactionsError`
  - [ ] State: `interface FinanceState { transactions: Transaction[] }`
  - [ ] Selectors: `selectTransactions`, `selectTransactionById`
  - [ ] Effects: Load data on route enter, handle errors
- [ ] Benefits: Modular state organization, easy to test, feature-scoped

**3. Complex Selector Composition**
- [ ] Create selectors that combine multiple slices
  - [ ] File: `src/app/store/transactions/transactions.selector.ts`
  - [ ] Example: `selectTransactionsByCategory$` combines category filter + transactions list
- [ ] Advanced selectors:
  - [ ] `selectExpensiveTransactions` (filters > $100)
  - [ ] `selectTransactionTotals` (sums by category)
  - [ ] `selectMonthlyBudgetStatus` (budget vs spent)
  - [ ] `selectCategoryBreakdown` (grouped data for chart)
- [ ] Performance optimization:
  - [ ] Use `selectSignal()` to convert to signals
  - [ ] Combine selectors with `combineLatestWith()`
  - [ ] Memoization: Built-in via `createSelector()`
- [ ] Code pattern:
  ```typescript
  export const selectExpensiveTransactions = createSelector(
    selectAllTransactions,
    selectCategoryFilter,
    (transactions, category) => transactions.filter(
      t => t.amount > 100 && (!category || t.category === category)
    )
  );
  ```

**4. Time-Travel Debugging with Redux DevTools**
- [ ] Enable Redux DevTools in development
  - [ ] Install: Chrome extension "Redux DevTools"
  - [ ] Already configured in `src/app/app.config.ts` (ngrx/store-devtools)
- [ ] Features to explore:
  - [ ] Replay state changes step-by-step
  - [ ] Jump to specific action in history
  - [ ] Dispatch actions manually for testing
  - [ ] Export/import state snapshots
  - [ ] Time-travel debugging: Go backward/forward in time
- [ ] Workflow:
  - [ ] Open Chrome DevTools → "Redux" tab
  - [ ] Perform app actions
  - [ ] Watch state updates in real-time
  - [ ] Click any action to see before/after state
  - [ ] Use "Diff" tab to see only changed properties
- [ ] Production considerations:
  - [ ] Add config guard: Only enable in development
  - [ ] Performance: DevTools adds memory overhead
  - [ ] Security: Don't enable with sensitive data

**5. State Hydration & Persistence**
- [ ] Save auth state to localStorage
  - [ ] File: `src/app/app.config.ts` (extend)
  - [ ] File: Create `src/app/core/store/persistence.ts`
- [ ] Implementation:
  - [ ] On logout/success: Serialize auth state to JSON
  - [ ] Save to localStorage with key: `angular-game-verse/auth`
  - [ ] On app init: Load stored state, dispatch hydration action
  - [ ] Merge hydrated state into initial state
- [ ] Persistence pattern:
  - [ ] What to persist: Auth token, user ID, preferences
  - [ ] What NOT to persist: Loading states, transient UI state, sensitive data
  - [ ] TTL: Set expiration (e.g., 24 hours)
  - [ ] Encryption: Consider for sensitive data
- [ ] Code structure:
  ```typescript
  // 1. Subscribe to store changes
  this.store.select(selectAuthState)
    .pipe(debounceTime(500))
    .subscribe(auth => localStorage.setItem('auth', JSON.stringify(auth)));
  
  // 2. On init, restore
  const savedAuth = localStorage.getItem('auth');
  if (savedAuth) {
    this.store.dispatch(hydrateAuthState({ auth: JSON.parse(savedAuth) }));
  }
  ```
- [ ] Benefits: Persistent login across browser sessions, better UX

---

#### 🔧 **Custom Directives & Attributes** (4 Types)

**1. Custom Attribute Directives**
- [ ] Create utility directives
  - [ ] File: Create `src/app/core/directives/` folder
  - [ ] Create `highlight.directive.ts` - Highlight expensive transactions
  - [ ] Create `currency-format.directive.ts` - Format currency display
  - [ ] Create `tooltip.directive.ts` - Custom tooltip
- [ ] `appHighlight` directive:
  - [ ] Apply to expensive transactions (>$100)
  - [ ] Usage: `<div [appHighlight]="transaction.amount > 100">`
  - [ ] Implementation: `@HostBinding('style.backgroundColor')` to change color
  - [ ] Test: Verify color changes based on condition
- [ ] `appCurrencyFormat` directive:
  - [ ] Auto-format numbers as currency
  - [ ] Usage: `<span appCurrencyFormat [appCurrencyFormatValue]="500">`
  - [ ] Display: "$500.00"
  - [ ] Support: Multiple locales (USD, EUR, GBP)
- [ ] `appTooltip` directive:
  - [ ] Show tooltip on hover
  - [ ] Usage: `<button [appTooltip]="'Help text'">`
  - [ ] Implementation: Create/destroy tooltip on mouse enter/leave

**2. Structural Directives**
- [ ] Create conditional rendering directives
  - [ ] File: `src/app/core/directives/if-role.directive.ts`
  - [ ] File: `src/app/core/directives/if-logged-in.directive.ts`
- [ ] `*appIfRole` directive:
  - [ ] Show content based on user role
  - [ ] Usage: `<button *appIfRole="'admin'">Delete</button>`
  - [ ] Implementation: Get user role from store, render/destroy view
  - [ ] Supports: Single role or array of roles
- [ ] `*appIfLoggedIn` directive:
  - [ ] Show content only if user authenticated
  - [ ] Usage: `<div *appIfLoggedIn>Welcome, {{ user().name }}!</div>`
  - [ ] Implementation: Check auth state from store
- [ ] Benefits:
  - [ ] Cleaner templates (vs `*ngIf="(isAdmin$ | async)"`)
  - [ ] Type-safe role checks
  - [ ] Centralized authorization logic

**3. Host Bindings & Event Listeners**
- [ ] Respond to keyboard events
  - [ ] File: `src/app/core/directives/close-on-escape.directive.ts`
  - [ ] File: `src/app/core/directives/click-outside.directive.ts`
- [ ] `appCloseOnEscape` directive:
  - [ ] Close modal on ESC key
  - [ ] Usage: `<dialog [appCloseOnEscape]="onClose">`
  - [ ] Implementation: `@HostListener('keydown.escape')` → emit close event
- [ ] `appClickOutside` directive:
  - [ ] Detect clicks outside element (for dropdown close)
  - [ ] Usage: `<div [appClickOutside]="onClickOutside">`
  - [ ] Implementation: Listen to document click, check target
- [ ] Code pattern:
  ```typescript
  @HostListener('keydown.escape') onEscape() {
    this.closeEvent.emit();
  }
  ```

**4. Directive Composition API**
- [ ] Combine multiple directives
  - [ ] File: `src/app/core/directives/form-field.directive.ts`
  - [ ] Combine: Required marker + Error display + Validation state
- [ ] Implementation:
  - [ ] Create host directive with `hostDirectives: [...]`
  - [ ] Compose smaller directives into larger one
  - [ ] Single import for multiple features
  - [ ] Example: FormField = Required + Error + Focus management
- [ ] Benefits:
  - [ ] Reduce prop drilling
  - [ ] DRY - Don't repeat directive imports
  - [ ] Semantic grouping of related behaviors

---

#### 📦 **Advanced Service Patterns** (4 Patterns)

**1. Service Factory Functions**
- [ ] Create factory for API service configuration
  - [ ] File: `src/app/core/services/service.factory.ts`
  - [ ] Configuration: Different base URLs for dev/prod/staging
- [ ] Factory implementation:
  - [ ] Function: `createGamesService(baseUrl: string, apiKey: string): GamesService`
  - [ ] Injected via providers: Different config per environment
  - [ ] Supports: Multiple API sources, different auth headers
- [ ] Environment-specific config:
  - [ ] Development: Local mock server
  - [ ] Production: RAWG API endpoint
  - [ ] Staging: Test API server
- [ ] Usage in `app.config.ts`:
  ```typescript
  providers: [
    {
      provide: GamesService,
      useFactory: () => createGamesService(
        environment.apiUrl,
        environment.apiKey
      )
    }
  ]
  ```

**2. Multi-Level Service Composition**
- [ ] Layer pattern: AuthFacade → AuthService → Firebase → Store
  - [ ] File: `src/app/core/facades/auth.facade.ts` (exists)
  - [ ] File: `src/app/core/services/auth.service.ts` (exists)
  - [ ] Integration: Firebase (exists), NgRx store (exists)
- [ ] Each layer responsibility:
  - [ ] **Facade**: High-level public API, coordinates multiple services
  - [ ] **Service**: Business logic, HTTP calls, data transformation
  - [ ] **Backend**: Firebase auth, API calls
  - [ ] **Store**: Centralized state, debugging
- [ ] Benefits:
  - [ ] Separation of concerns
  - [ ] Easier testing (mock each layer)
  - [ ] Reusable services across features

**3. Provider Scoping Strategies**
- [ ] Root scope vs Component scope
  - [ ] **Root scope**: `providedIn: 'root'` - Singleton, shared across app
  - [ ] **Component scope**: Provided in component - New instance per component
  - [ ] **Feature module scope**: Provided in feature - Scope to feature
- [ ] When to use each:
  - [ ] Root: AuthService, GamesService, Store (global state)
  - [ ] Component: DialogService instance (dialog-specific state)
  - [ ] Feature: FinanceService (finance feature only)
- [ ] Implementation:
  - [ ] Root: `@Injectable({ providedIn: 'root' })`
  - [ ] Component: No `providedIn`, inject via component providers
  - [ ] Feature: `@Injectable({ providedIn: TransactionsFeature })`
- [ ] Benefits:
  - [ ] Memory efficiency (don't create unneeded instances)
  - [ ] Data isolation (component-scoped services don't share state)
  - [ ] Dependency management

**4. Testing Service Factories & Composition**
- [ ] Mock factory for different environments
  - [ ] File: `src/app/core/services/games.service.spec.ts`
  - [ ] Create mock factory that returns mock service
- [ ] Testing patterns:
  - [ ] Unit test: Mock dependencies (HTTP, Firebase)
  - [ ] Integration test: Real factory, mock outer dependencies
  - [ ] E2E test: Real services, real backend
- [ ] Factory testing:
  - [ ] Verify correct service instance created
  - [ ] Verify configuration passed correctly
  - [ ] Verify services work in composition
- [ ] Code pattern:
  ```typescript
  it('should create service with correct config', () => {
    const service = createGamesService('http://mock-api', 'mock-key');
    expect(service).toBeDefined();
    expect(service.apiKey).toBe('mock-key');
  });
  ```

---

### Priority 4: Advanced Features (Week 3-4)

#### 🎨 **Advanced Form Patterns** (4 Techniques)

**1. Reactive Forms with Custom Validators**
- [ ] Transaction form with cross-field validation
  - [ ] Constraint: Start date must be before end date
  - [ ] File: `src/app/pages/finance/transactions-page/transactions-page.component.ts` (extend)
  - [ ] File: Create `src/app/core/validators/date-range.validator.ts`
- [ ] Implementation steps:
  - [ ] Create custom validator function:
    ```typescript
    export function dateRangeValidator(): ValidatorFn {
      return (group: AbstractControl): ValidationErrors | null => {
        const startDate = group.get('startDate')?.value;
        const endDate = group.get('endDate')?.value;
        if (startDate && endDate && startDate >= endDate) {
          return { invalidDateRange: true };
        }
        return null;
      };
    }
    ```
  - [ ] Apply to FormGroup: `new FormGroup({...}, { validators: dateRangeValidator() })`
  - [ ] Access error in template: `form.getError('invalidDateRange')`
  - [ ] Show error message: `<mat-error>End date must be after start date</mat-error>`
- [ ] Benefits:
  - [ ] Type-safe form validation
  - [ ] Reusable across forms
  - [ ] Clear error messaging

**2. Dynamic Form Arrays**
- [ ] Allow user to add/remove transaction items
  - [ ] File: `src/app/pages/finance/transactions-page/transaction-form.component.ts`
  - [ ] Feature: Invoice with multiple line items
- [ ] Implementation:
  - [ ] Create FormArray: `items = new FormArray([this.createItemControl()])`
  - [ ] Method: `createItemControl(): FormGroup { ... }`
  - [ ] Add item: `this.items.push(this.createItemControl())`
  - [ ] Remove item: `this.items.removeAt(index)`
  - [ ] Template: `<div *ngFor="let item of items.controls; let i = index">`
- [ ] Advanced features:
  - [ ] Mark as touched on focus
  - [ ] Disable add button if form invalid
  - [ ] Show validation errors per item
  - [ ] Min/max array length validation
- [ ] Code pattern:
  ```typescript
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }
  
  addItem(): void {
    if (this.items.valid) {
      this.items.push(this.createItemControl());
    }
  }
  
  removeItem(index: number): void {
    this.items.removeAt(index);
  }
  ```

**3. Custom Form Controls (ControlValueAccessor)**
- [ ] Create custom date range picker component
  - [ ] File: Create `src/app/components/date-range-picker/date-range-picker.component.ts`
  - [ ] Implements: `ControlValueAccessor` interface
  - [ ] Integrates with reactive forms
- [ ] Implementation requirements:
  - [ ] Implement 5 methods: `writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState`, `validate`
  - [ ] Internal state: Two separate date inputs (start, end)
  - [ ] External interface: Single { start, end } object
- [ ] Usage in parent form:
  ```typescript
  <app-date-range-picker formControlName="dateRange"></app-date-range-picker>
  
  // Form value: { dateRange: { start: Date, end: Date } }
  ```
- [ ] Benefits:
  - [ ] Encapsulation: Date range logic hidden in component
  - [ ] Reusability: Use in multiple forms
  - [ ] Type-safe: Validates before updating parent form

**4. Typed FormGroups with Generics**
- [ ] Use `FormGroup<T>` for type safety
  - [ ] Old: `new FormGroup({...})` → `any` form value type
  - [ ] New: `new FormGroup<TransactionFormModel>({...})` → type-safe
  - [ ] File: `src/app/pages/finance/transactions-page/transaction-form.component.ts`
- [ ] Define form model interface:
  ```typescript
  interface TransactionFormModel {
    amount: FormControl<number>;
    category: FormControl<string>;
    date: FormControl<Date>;
    description: FormControl<string>;
    items: FormArray<FormGroup<ItemModel>>;
  }
  ```
- [ ] Benefits:
  - [ ] IDE autocomplete: `form.get('invalidField')` → error!
  - [ ] Type checking: `form.value.amount` is `number | null`
  - [ ] Compile-time safety: Catch typos early
- [ ] Implementation:
  - [ ] Create interface for form structure
  - [ ] Use generics: `new FormGroup<TransactionFormModel>({...})`
  - [ ] Result: `form.value` is correctly typed

---

#### 📊 **RxJS Advanced Operators** (5 Operators)

**1. SwitchMap vs MergeMap vs ConcatMap vs ExhaustMap**
- [ ] Understand each operator's use case
  - [ ] File: Create `src/app/core/utils/rxjs-patterns.doc.md`
  - [ ] Detailed comparison with examples
- [ ] **SwitchMap**: Cancel previous, take newest
  - [ ] Use case: Search input → API calls (abandon old searches)
  - [ ] Example: `input$.pipe(switchMap(term => this.search(term)))`
  - [ ] Benefit: Prevents race conditions
  - [ ] Code pattern: User types → cancel old search → start new
- [ ] **MergeMap**: All concurrent requests
  - [ ] Use case: Parallel file uploads
  - [ ] Example: `file$.pipe(mergeMap(f => this.upload(f), 4))`
  - [ ] Benefit: Concurrency control (maxConcurrent)
  - [ ] Performance: Fast but order not guaranteed
- [ ] **ConcatMap**: Sequential, one at a time
  - [ ] Use case: Batch form submissions in order
  - [ ] Example: `formSubmit$.pipe(concatMap(form => this.save(form)))`
  - [ ] Benefit: Preserves order, completes in sequence
  - [ ] Drawback: Slow if each request takes time
- [ ] **ExhaustMap**: Ignore requests while one pending
  - [ ] Use case: Prevent double-submit on button click
  - [ ] Example: `submit$.pipe(exhaustMap(form => this.save(form)))`
  - [ ] Benefit: Simple debounce without creating timers
  - [ ] Drawback: User can't retry while loading
- [ ] Comparison table:
  - | Operator | When | Concurrent | Order | Use Case |
    |----------|------|-----------|-------|----------|
    | SwitchMap | New arrives | No (1) | Latest | Search/filter |
    | MergeMap | Process all | Yes (N) | Any | Parallel uploads |
    | ConcatMap | Sequential | No (1) | Preserved | Batch operations |
    | ExhaustMap | Ignore new | No (1) | Current | Double-click guard |

**2. Higher-Order Observables Flattening**
- [ ] Understand nested observables
  - [ ] Observable<Observable<T>> → Need to flatten to Observable<T>
  - [ ] Example: Route params change → Load game (Observable<Game>)
- [ ] Flattening operators:
  - [ ] mergeAll: Flatten all at once
  - [ ] switchAll: Switch to latest
  - [ ] concatAll: Concat all in order
  - [ ] exhaustAll: Ignore while processing
- [ ] Practical example:
  ```typescript
  // Without flattening: Observable<Observable<Game>>
  const games$ = routeParams$.pipe(
    map(params => this.service.getGame(params.id))
    // games$ is Observable<Observable<Game>>
  );
  
  // With flattening: Observable<Game>
  const games$ = routeParams$.pipe(
    switchMap(params => this.service.getGame(params.id))
    // games$ is Observable<Game>
  );
  ```

**3. Subject Variants Deep Dive**
- [ ] **Subject**: Plain subject, no initial value
  - [ ] Subscribers only get future emissions
  - [ ] Use case: Event emitter pattern
  - [ ] Example: `@Output() click = new Subject<void>()`
- [ ] **BehaviorSubject**: Always has value
  - [ ] New subscribers get latest value immediately
  - [ ] Use case: Current state (auth, filters)
  - [ ] Example: `private state$ = new BehaviorSubject<GameState>(initial)`
  - [ ] Access value: `state$.value` or `state$.asObservable()`
- [ ] **ReplaySubject**: Buffer N emissions
  - [ ] New subscribers get last N values
  - [ ] Use case: Replay events, command history
  - [ ] Example: `new ReplaySubject<Action>(5)` - Remember last 5 actions
- [ ] **AsyncSubject**: Only last value on complete
  - [ ] Ignores all values until complete()
  - [ ] Use case: Final result of async operation
  - [ ] Example: `forkJoin()` internally uses AsyncSubject behavior
- [ ] Choosing the right subject:
  ```
  Need immediate value? → BehaviorSubject
  Need buffered history? → ReplaySubject
  Just future events? → Subject
  Only final value? → AsyncSubject
  ```

**4. Custom RxJS Operators**
- [ ] Create reusable operators
  - [ ] File: `src/app/core/utils/custom-operators.ts`
  - [ ] Example 1: `filterEmpty<T>()` - Skip empty arrays
  - [ ] Example 2: `mapToSignal<T>()` - Convert to signal
  - [ ] Example 3: `retryWithBackoff()` - Retry with delay
- [ ] `filterEmpty<T>()` implementation:
  ```typescript
  export function filterEmpty<T extends any[]>() {
    return filter<T>(items => items && items.length > 0);
  }
  
  // Usage: games$.pipe(filterEmpty())
  ```
- [ ] `mapToSignal<T>()` implementation:
  ```typescript
  export function mapToSignal<T>(initialValue: T) {
    return (source: Observable<T>) => {
      const sig = signal(initialValue);
      source.subscribe(value => sig.set(value));
      return sig;
    };
  }
  ```
- [ ] Benefits:
  - [ ] DRY: Reuse across components
  - [ ] Composable: Chain with other operators
  - [ ] Type-safe: Full TypeScript support

**5. RxJS Testing with Marble Diagrams**
- [ ] Install marble testing library
  - [ ] Package: `rxjs/testing` (included)
  - [ ] File: `src/app/core/utils/custom-operators.spec.ts`
- [ ] Marble testing syntax:
  - [ ] `-`: Frame (time unit)
  - [ ] `a`, `b`, `c`: Emitted values
  - [ ] `|`: Complete
  - [ ] `#`: Error
  - [ ] `^`: Subscribe point
- [ ] Example test:
  ```typescript
  it('should filter empty arrays', () => {
    const source$ =   cold('a-b-c|', { a: [], b: [1], c: [] });
    const expected =  cold('--b--|', { b: [1] });
    
    const result$ = source$.pipe(filterEmpty());
    expect(result$).toBeObservable(expected);
  });
  ```
- [ ] Benefits:
  - [ ] Time-independent tests (don't use setTimeout)
  - [ ] Easy to read logic flow
  - [ ] Deterministic (no flakiness)
  - [ ] Fast execution

---

#### 🔐 **Advanced Security Patterns** (5 Patterns)

**1. XSS Prevention with Sanitization**
- [ ] Use Angular's built-in sanitization
  - [ ] File: `src/app/core/services/sanitizer.service.ts`
  - [ ] Inject: `DomSanitizer` from `@angular/platform-browser`
- [ ] Sanitization methods:
  - [ ] `sanitize(SecurityContext, value)` - Context-aware
  - [ ] `sanitizeHtml(value)` - For HTML content
  - [ ] `sanitizeStyle(value)` - For CSS styles
  - [ ] `sanitizeResourceUrl(value)` - For URLs in resources
- [ ] Never use `innerHTML` without sanitizing:
  - [ ] ❌ Bad: `<div [innerHTML]="userNote"></div>`
  - [ ] ✅ Good: `<div [innerHTML]="sanitizer.sanitize(SecurityContext.HTML, userNote)"></div>`
  - [ ] Or: `<div [innerHTML]="userNote | sanitizeHtml"></div>` (with pipe)
- [ ] Apply to user-generated content:
  - [ ] Finance transaction notes
  - [ ] User comments/reviews
  - [ ] Dynamic HTML from API
- [ ] Benefits:
  - [ ] Prevents script injection attacks
  - [ ] Still allows safe HTML (links, formatting)
  - [ ] Automatic by Angular for property binding

**2. CSRF Protection Setup**
- [ ] Understand CSRF (Cross-Site Request Forgery)
  - [ ] Attack: Malicious site makes request on user's behalf
  - [ ] Defense: CSRF token in request
- [ ] Angular's built-in CSRF protection:
  - [ ] Reads token from cookie: `X-CSRF-TOKEN` or custom name
  - [ ] Adds to header: `X-CSRF-TOKEN` (default)
  - [ ] File: `src/app/app.config.ts`
  - [ ] Provider: `withXsrfConfiguration()` if using custom names
- [ ] Configuration:
  ```typescript
  withXsrfConfiguration({
    cookieName: 'X-CSRF-TOKEN',
    headerName: 'X-CSRF-TOKEN'
  })
  ```
- [ ] Backend requirement:
  - [ ] Generate CSRF token
  - [ ] Send in cookie: `Set-Cookie: X-CSRF-TOKEN=...`
  - [ ] Validate token on state-changing requests (POST, PUT, DELETE)

**3. Content Security Policy (CSP) Headers**
- [ ] Configure CSP in headers
  - [ ] File: `ngsw-config.json` (for service worker)
  - [ ] Or: Server-side headers (nginx, express)
- [ ] CSP directives:
  - [ ] `default-src 'self'` - Only from same origin
  - [ ] `script-src 'self' https://trusted-cdn.com` - Scripts from these sources
  - [ ] `style-src 'self' 'unsafe-inline'` - Styles (unsafe-inline for Angular)
  - [ ] `img-src 'self' data: https:` - Images from sources
- [ ] Benefits:
  - [ ] Prevents inline script execution
  - [ ] Limits data exfiltration
  - [ ] Browser enforces restrictions
- [ ] Testing:
  - [ ] Chrome DevTools → Security tab
  - [ ] Check CSP violations in console

**4. Authentication Token Refresh Cycles**
- [ ] Implement JWT refresh token flow
  - [ ] File: `src/app/core/interceptors/auth.interceptor.ts`
  - [ ] Tokens: Access token (short-lived) + Refresh token (long-lived)
- [ ] Flow:
  1. User logs in → Get access + refresh token
  2. API call with access token
  3. If 401: Try refresh token
  4. If refresh succeeds: Retry original request
  5. If refresh fails: Redirect to login
- [ ] Implementation:
  - [ ] Store refresh token securely (httpOnly cookie)
  - [ ] Store access token in memory or signal
  - [ ] On 401: Call refresh endpoint
  - [ ] Retry with new access token
  - [ ] Queue requests during refresh
- [ ] Code pattern:
  ```typescript
  if (error.status === 401) {
    return this.authService.refreshToken().pipe(
      switchMap(newToken => {
        // Add new token to request
        return next.handle(this.addToken(request, newToken));
      }),
      catchError(() => this.router.navigate(['/login']))
    );
  }
  ```
- [ ] Benefits:
  - [ ] Security: Short-lived access token limits exposure
  - [ ] UX: Users stay logged in longer
  - [ ] Transparency: Refresh happens silently

**5. Role-Based Access Control (RBAC)**
- [ ] Implement role checking
  - [ ] File: `src/app/core/directives/if-role.directive.ts` (exists)
  - [ ] File: `src/app/core/guards/role.guard.ts`
  - [ ] Store roles in NgRx state
- [ ] Multiple protection layers:
  - [ ] **Route level**: `canActivate: [roleGuard({ requiredRoles: ['admin'] })]`
  - [ ] **Component level**: `<button *appIfRole="'admin'">`
  - [ ] **API level**: Backend validates user role
- [ ] Role hierarchy:
  - [ ] User: View own data
  - [ ] Admin: Manage all data
  - [ ] SuperAdmin: Manage users + data
- [ ] Implementation:
  ```typescript
  export const roleGuard: (config: RoleGuardConfig) => CanActivateFn = 
    (config) => () => {
      const store = inject(Store);
      const userRole$ = store.select(selectUserRole);
      return userRole$.pipe(
        map(role => config.requiredRoles.includes(role) || navigateToUnauthorized())
      );
    };
  ```

---

#### 🎬 **Animation Patterns** (5 Approaches)

**1. Angular Animations API**
- [ ] Install and setup animations
  - [ ] Already imported: `BrowserAnimationsModule` in standalone config
  - [ ] Import: `trigger`, `state`, `style`, `animate` from `@angular/animations`
  - [ ] File: `src/app/core/animations/fade.animation.ts`
- [ ] Create fade animation:
  ```typescript
  export const fadeAnimation = trigger('fade', [
    state('in', style({ opacity: 1 })),
    state('out', style({ opacity: 0 })),
    transition('in <=> out', animate('300ms ease-in-out'))
  ]);
  ```
- [ ] Apply to component:
  - [ ] File: `src/app/pages/finance/transaction-detail/transaction-detail.component.ts`
  - [ ] Template: `<dialog [@fade]="isOpen ? 'in' : 'out'">`
  - [ ] Track state: `isOpen = signal(false)`
- [ ] Common animations:
  - [ ] Fade: opacity change
  - [ ] Slide: transform translate
  - [ ] Scale: transform scale
  - [ ] Rotate: transform rotate

**2. Stagger Animations for Lists**
- [ ] Stagger items as they appear
  - [ ] File: `src/app/core/animations/stagger.animation.ts`
  - [ ] Use: `stagger()` and `query()` functions
- [ ] Stagger implementation:
  ```typescript
  export const listStagger = trigger('listStagger', [
    transition('* <=> *', [
      query(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        stagger('50ms', [
          animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ], { optional: true })
    ])
  ]);
  ```
- [ ] Apply to game cards or transaction rows:
  - [ ] `<div [@listStagger]="games().length">`
  - [ ] Each card animates with 50ms delay
- [ ] Benefits:
  - [ ] Visual appeal: Smooth list entry
  - [ ] User focus: Draws attention to new content
  - [ ] Performance: Stagger prevents animation jank

**3. Transition States & Timing**
- [ ] Create smooth page transitions
  - [ ] File: `src/app/core/animations/page-transition.animation.ts`
  - [ ] Timing: duration, delay, easing
- [ ] Easing functions:
  - [ ] `ease-in`: Slow start, fast end (accelerate)
  - [ ] `ease-out`: Fast start, slow end (decelerate)
  - [ ] `ease-in-out`: Slow start and end (smooth)
  - [ ] `cubic-bezier()`: Custom timing
- [ ] Example: Page navigation animation
  ```typescript
  transition(':enter', [
    style({ opacity: 0 }),
    animate('400ms ease-out', style({ opacity: 1 }))
  ])
  ```
- [ ] Benefits:
  - [ ] Professional appearance
  - [ ] Better UX: Visual feedback of navigation
  - [ ] Predictable: Consistent timing across app

**4. Animation Callbacks**
- [ ] Execute code when animation completes
  - [ ] File: `src/app/pages/finance/transaction-detail/transaction-detail.component.ts`
  - [ ] Use: `(@animationName.done)` event
- [ ] Implementation:
  ```typescript
  export class TransactionDetailComponent {
    onAnimationComplete(event: AnimationEvent) {
      if (event.fromState === 'out' && event.toState === 'in') {
        // Animation complete, trigger next action
        this.focusFirstInput();
      }
    }
  }
  ```
- [ ] Template:
  ```html
  <dialog 
    [@fade]="isOpen ? 'in' : 'out'"
    (@fade.done)="onAnimationComplete($event)">
  </dialog>
  ```
- [ ] Use cases:
  - [ ] Set focus after modal opens
  - [ ] Start next animation in sequence
  - [ ] Log analytics

**5. Advanced Animation Choreography**
- [ ] Coordinate multiple animations
  - [ ] File: `src/app/core/animations/choreography.animation.ts`
  - [ ] Example: Dialog open → content fade → form focus
- [ ] Sequence animations:
  - [ ] Parallel: Multiple animations at once
  - [ ] Sequential: Wait for previous to complete
  - [ ] Use: `group()` and timing
- [ ] Complex example:
  ```typescript
  transition(':enter', [
    group([
      animate('300ms ease-out', style({ opacity: 1 })),
      animate('400ms ease-out', style({ transform: 'translateY(0)' }))
    ])
  ])
  ```

---

#### 📱 **PWA Advanced Features** (4 Features)

**1. Push Notifications**
- [ ] Request notification permission
  - [ ] File: `src/app/core/services/notification.service.ts`
  - [ ] Check support: `'Notification' in window && 'serviceWorker' in navigator`
- [ ] Implementation steps:
  - [ ] Step 1: Request permission: `Notification.requestPermission()`
  - [ ] Step 2: Create notification: `new Notification(title, options)`
  - [ ] Step 3: Handle click: `.addEventListener('click', handler)`
  - [ ] Step 4: Show in service worker if not focused
- [ ] Use case: Transaction alerts
  - [ ] "Large expense detected: $250 in Dining"
  - [ ] "Budget exceeded: Food category at 125%"
- [ ] Code pattern:
  ```typescript
  showNotification(title: string, options?: NotificationOptions) {
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, options);
        }
      });
    }
  }
  ```

**2. Background Sync**
- [ ] Queue transactions while offline
  - [ ] File: Extend `src/app/core/services/sync.service.ts`
  - [ ] Store pending requests in IndexedDB
  - [ ] Retry when connection restored
- [ ] Implementation:
  - [ ] On offline: Save request to queue
  - [ ] Listen to online event
  - [ ] Retry all queued requests
  - [ ] Update UI: "Synced X transactions"
- [ ] Service Worker background sync:
  - [ ] Register sync event: `registration.sync.register('sync-transactions')`
  - [ ] Handle: `self.addEventListener('sync', event => { ... })`
  - [ ] Browser retries if sync fails (with backoff)

**3. Web App Manifest Enhancement**
- [ ] Update manifest with full configuration
  - [ ] File: [public/manifest.webmanifest](public/manifest.webmanifest)
  - [ ] File already exists with basic config
- [ ] Enhanced manifest fields:
  - [ ] `icons`: App icons (192x192, 512x512)
  - [ ] `screenshots`: App screenshots for install prompt
  - [ ] `categories`: App category (finance, productivity)
  - [ ] `shortcuts`: Quick action links
  - [ ] `display_override`: Preferred display mode
- [ ] Enhanced manifest example:
  ```json
  {
    "name": "Game Verse Finance",
    "short_name": "GameVerse",
    "icons": [
      { "src": "/icons/192.png", "sizes": "192x192", "type": "image/png" },
      { "src": "/icons/512.png", "sizes": "512x512", "type": "image/png" }
    ],
    "screenshots": [
      { "src": "/screenshots/1.png", "sizes": "540x720", "type": "image/png" }
    ],
    "categories": ["finance"],
    "display_override": ["window-controls-overlay", "standalone", "browser"]
  }
  ```

**4. Workbox Strategies Optimization**
- [ ] Configure caching strategies
  - [ ] File: `ngsw-config.json` (already configured)
  - [ ] Review strategies for API responses
- [ ] Caching strategies:
  - [ ] **Network-first**: Try network, fallback to cache
    - For: API responses, game data (fresh is important)
  - [ ] **Cache-first**: Use cache, fallback to network
    - For: Assets, images (rarely change)
  - [ ] **Stale-while-revalidate**: Serve cache, update in background
    - For: Non-critical data (genres, categories)
- [ ] Implementation in ngsw-config.json:
  ```json
  {
    "apiUrl": "https://rawg.io/api/games",
    "strategy": "network-first",
    "maxAge": "1h",
    "maxSize": 5
  }
  ```
- [ ] Benefits:
  - [ ] Offline capability
  - [ ] Better performance (cached responses)
  - [ ] Reduced server load
  - [ ] Better UX on slow networks

---

---

### Priority 5: Enterprise Patterns (Week 4+)

#### 🌍 **Internationalization (i18n)** (3 Techniques)

**1. Multi-Language Setup**
- [ ] Install and configure translation library
  - [ ] Install: `npm install @ngx-translate/core @ngx-translate/http-loader`
  - [ ] Create folder: `src/assets/i18n/`
  - [ ] Create files: `en.json`, `es.json`, `fr.json`
- [ ] File structure:
  - [ ] `src/assets/i18n/en.json` - English translations
  - [ ] `src/assets/i18n/es.json` - Spanish translations
  - [ ] `src/assets/i18n/fr.json` - French translations
- [ ] Translation file example (en.json):
  ```json
  {
    "navigation": {
      "games": "Games",
      "finance": "Finance",
      "settings": "Settings"
    },
    "finance": {
      "totalSpent": "Total Spent: {{ amount | currency }}",
      "categoryName": "Category"
    }
  }
  ```
- [ ] Setup in app config:
  - [ ] Provide: `TranslateModule.forRoot()`
  - [ ] Configure loader: `TranslateHttpLoader`
  - [ ] Set default language: `'en'`
- [ ] Usage in components:
  - [ ] Template: `{{ 'finance.totalSpent' | translate: { amount: total() } }}`
  - [ ] TypeScript: `this.translate.get('finance.totalSpent').subscribe(...)`

**2. Dynamic Locale Switching**
- [ ] Language selector in header
  - [ ] File: `src/app/components/header/header.component.ts`
  - [ ] Add dropdown: English / Español / Français
- [ ] Implementation:
  - [ ] Store current language in signal: `currentLanguage = signal('en')`
  - [ ] On select: `this.translate.use(newLanguage)`
  - [ ] Update signal: `this.currentLanguage.set(newLanguage)`
  - [ ] Persist to localStorage: `localStorage.setItem('language', newLanguage)`
- [ ] On app init:
  - [ ] Check localStorage for saved language
  - [ ] Fallback to browser language detection
  - [ ] Set default to 'en'
- [ ] Code pattern:
  ```typescript
  selectLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLanguage.set(lang);
    localStorage.setItem('app-language', lang);
  }
  
  ngOnInit(): void {
    const savedLang = localStorage.getItem('app-language') || 'en';
    this.selectLanguage(savedLang);
  }
  ```
- [ ] Benefits:
  - [ ] User choice: Remember preference across sessions
  - [ ] Seamless: No page reload needed
  - [ ] Accessible: Multiple language support

**3. Pluralization & Date Formatting**
- [ ] Handle plurals correctly
  - [ ] File: `src/assets/i18n/en.json` (extend)
  - [ ] Example: "1 transaction" vs "2 transactions"
- [ ] Translation with pluralization:
  ```json
  {
    "finance": {
      "transactionCount": "{count, plural, =1 {1 transaction} other {# transactions}}"
    }
  }
  ```
- [ ] Format dates/numbers by locale:
  - [ ] Angular pipes: `date:'medium'`, `number:'1.2-2'`
  - [ ] Locale support: Automatically uses locale from `LOCALE_ID`
  - [ ] Set locale: `import { registerLocaleData } from '@angular/common'`
- [ ] Implementation:
  ```typescript
  import { registerLocaleData } from '@angular/common';
  import localeEs from '@angular/common/locales/es';
  
  // Register Spanish locale
  registerLocaleData(localeEs);
  
  // In component: LOCALE_ID is now 'es'
  ```
- [ ] Template formatting:
  - [ ] `{{ date | date: 'fullDate' }}` - Formatted by locale
  - [ ] `{{ amount | currency }}` - Currency symbol by locale
  - [ ] `{{ count | number: '1.0-0' }}` - Number formatting by locale

---

#### 🎯 **Micro-Frontend Architecture** (2 Techniques)

**1. Module Federation Setup**
- [ ] Configure Webpack Module Federation
  - [ ] File: `webpack.config.js` (create)
  - [ ] Allows: Loading micro-frontend apps at runtime
  - [ ] Use case: Separate teams building features independently
- [ ] Federation configuration:
  ```typescript
  const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
  
  module.exports = {
    plugins: [
      new ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',
        remotes: {
          '@finance-app': 'financeApp@http://localhost:4201/remoteEntry.js',
          '@games-app': 'gamesApp@http://localhost:4202/remoteEntry.js'
        },
        shared: ['@angular/core', '@angular/common', 'rxjs']
      })
    ]
  };
  ```
- [ ] Shared libraries:
  - [ ] Share: `@angular/core`, `@angular/common`, `rxjs`, `@ngrx/store`
  - [ ] Avoid: Large duplicates of shared deps
  - [ ] Reduces: Bundle size, load time
- [ ] Use cases:
  - [ ] Finance team: Owns finance micro-frontend
  - [ ] Games team: Owns games micro-frontend
  - [ ] Host: Orchestrates shell application
- [ ] Benefits:
  - [ ] Independent deployment
  - [ ] Team autonomy
  - [ ] Scalability

**2. Cross-App Communication**
- [ ] Shared state between federated apps
  - [ ] Method 1: Shared store (NgRx)
  - [ ] Method 2: Event-based communication
  - [ ] Method 3: Shared service through DI
- [ ] Event-based approach (loosely coupled):
  - [ ] File: `src/app/core/services/event-bus.service.ts`
  - [ ] Pub/Sub pattern: Apps emit and listen to events
  - [ ] Example: Finance app → "Transaction Created" → Games app updates store
- [ ] Implementation:
  ```typescript
  // EventBusService (shared dependency)
  export class EventBusService {
    private events$ = new Subject<AppEvent>();
    
    emit(event: AppEvent): void {
      this.events$.next(event);
    }
    
    on(eventType: string): Observable<AppEvent> {
      return this.events$.pipe(
        filter(event => event.type === eventType)
      );
    }
  }
  
  // In finance app
  this.eventBus.emit({ type: 'TRANSACTION_CREATED', data: transaction });
  
  // In games app
  this.eventBus.on('TRANSACTION_CREATED').subscribe(event => {
    this.store.dispatch(updateUserBalance({ amount: event.data.amount }));
  });
  ```
- [ ] Benefits:
  - [ ] Loose coupling: Apps don't depend on each other's internals
  - [ ] Flexibility: Easy to add/remove features
  - [ ] Scalability: Add new apps without modifying existing ones

---

#### 📈 **Performance Optimization** (6 Techniques)

**1. Bundle Analysis**
- [ ] Analyze bundle size
  - [ ] Install: `npm install --save-dev webpack-bundle-analyzer`
  - [ ] Generates: Visual breakdown of bundle contents
- [ ] Usage:
  - [ ] Build production: `ng build --configuration production --stats-json`
  - [ ] Analyze: `webpack-bundle-analyzer dist/angular-game-verse/stats.json`
  - [ ] Visualize: Interactive treemap showing bundle composition
- [ ] Identify issues:
  - [ ] Large dependencies: RxJS, Material, Moment.js
  - [ ] Duplicate code: Multiple versions of same library
  - [ ] Unused code: Not tree-shaken (see next)
- [ ] Optimization targets:
  - [ ] Replace: Moment.js → date-fns or native Date
  - [ ] Lazy-load: Non-critical dependencies
  - [ ] Audit: Remove unused Material modules

**2. Tree-Shaking Verification**
- [ ] Ensure unused code removed
  - [ ] Check: Production bundle only includes used code
  - [ ] Tool: Chrome DevTools Coverage tab
  - [ ] View: Analyze coverage of loaded scripts
- [ ] Tree-shaking requirements:
  - [ ] ES6 modules (not CommonJS)
  - [ ] No circular dependencies
  - [ ] Side-effect-free imports
  - [ ] `"sideEffects": false` in package.json
- [ ] Check production bundle:
  - [ ] Build: `ng build --configuration production`
  - [ ] Compare sizes: Dev (~5MB) vs Prod (~1-2MB)
  - [ ] Minified: Should be ~50-60% of dev size
- [ ] Verify specific feature:
  - [ ] Search bundle: DevTools → Search (Ctrl+F)
  - [ ] Look for: Unused helper functions, polyfills
  - [ ] Profile: Coverage tab shows what's actually used

**3. Image Optimization**
- [ ] Use WebP format with fallbacks
  - [ ] Convert images: `ffmpeg -i image.jpg image.webp`
  - [ ] Or use online tool: https://cloudconvert.com
  - [ ] Savings: ~25-35% smaller than JPEG
- [ ] Responsive images with srcset:
  ```html
  <img 
    src="image-600.webp"
    srcset="
      image-300.webp 300w,
      image-600.webp 600w,
      image-1200.webp 1200w"
    alt="Game screenshot"
  />
  ```
- [ ] Lazy loading:
  - [ ] Add: `loading="lazy"` attribute
  - [ ] Delays: Image load until near viewport
  - [ ] Savings: Faster initial page load
- [ ] Compression:
  - [ ] Lossless: TinyPNG, Squoosh
  - [ ] Aggressive: Lower quality for thumbnails
- [ ] Example optimization:
  - [ ] Original: 2MB PNG
  - [ ] Optimized WebP: 500KB
  - [ ] Thumbnails WebP: 50KB
  - [ ] Total savings: 75%

**4. Memory Profiling**
- [ ] Chrome DevTools Memory tab
  - [ ] Open: DevTools → Memory tab
  - [ ] Take snapshot: Before and after action
  - [ ] Compare: Identify memory leaks
- [ ] Common memory leaks:
  - [ ] Unsubscribed observables: Use `takeUntilDestroyed()`
  - [ ] Global state not cleared: Reset on component destroy
  - [ ] Event listeners not removed: Use `@HostListener` with cleanup
  - [ ] Timers not cleared: `clearInterval()` in `ngOnDestroy`
- [ ] Testing procedure:
  - [ ] Action 1: Open dialog (snapshot 1)
  - [ ] Action 2: Close dialog (snapshot 2)
  - [ ] Compare: Memory should return to ~baseline
  - [ ] If grows: Memory leak detected
- [ ] Fix pattern:
  ```typescript
  export class MyComponent implements OnDestroy {
    private destroy$ = new Subject<void>();
    
    ngOnInit() {
      this.service.data$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(...);
    }
    
    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
  ```

**5. Lighthouse Audit Optimization**
- [ ] Target: 90+ score across all categories
  - [ ] Performance: Loading speed, runtime performance
  - [ ] Accessibility: WCAG compliance, a11y
  - [ ] Best Practices: Security, standards compliance
  - [ ] SEO: Discoverability, indexing
- [ ] Run Lighthouse:
  - [ ] Chrome DevTools → Lighthouse tab
  - [ ] Select categories to audit
  - [ ] Click "Generate Report"
  - [ ] Review suggestions
- [ ] Common issues and fixes:
  - [ ] **Performance**:
    - [ ] ❌ Large bundle → ✅ Lazy load routes
    - [ ] ❌ Render-blocking JS → ✅ Defer non-critical scripts
    - [ ] ❌ Missing cache headers → ✅ Configure Service Worker
  - [ ] **Accessibility**:
    - [ ] ❌ Missing alt text → ✅ Add alt attributes
    - [ ] ❌ Poor contrast → ✅ Use WCAG AA colors
    - [ ] ❌ Non-keyboard accessible → ✅ Test keyboard nav
  - [ ] **Best Practices**:
    - [ ] ❌ No manifest → ✅ Add manifest.webmanifest
    - [ ] ❌ Deprecated APIs → ✅ Update to modern APIs
    - [ ] ❌ Insecure dependencies → ✅ Run `npm audit fix`

**6. Runtime Performance Tuning**
- [ ] Optimize component rendering
  - [ ] Profile: Angular DevTools Profiler
  - [ ] Identify: Slow components, excessive change detection
  - [ ] Fix: OnPush strategy, signal optimization
- [ ] Minimize re-renders:
  - [ ] Use OnPush everywhere possible
  - [ ] Break components into smaller ones
  - [ ] Memoize expensive computations
- [ ] Measure frame rate:
  - [ ] Chrome DevTools → Performance tab
  - [ ] Record: User interaction (scroll, click)
  - [ ] Target: 60fps (16.67ms per frame)
  - [ ] Fix: Reduce main thread work
- [ ] Code-splitting:
  - [ ] Lazy load: Routes, features, components
  - [ ] Pre-load: Critical routes when possible
  - [ ] Monitor: Network tab for load timing
- [ ] Example optimization:
  - [ ] Before: 40fps scrolling (janky)
  - [ ] After: 60fps with OnPush + signals
  - [ ] Result: Smooth, responsive UI

---

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Angular Version** | v20.3.16 |
| **TypeScript Version** | v5.9.2 |
| **Total Pages** | 10 (8 implemented, 1 WIP) |
| **Reusable Components** | 9+ |
| **Services** | 8+ |
| **Store Modules** | Auth + NgRx Test |
| **Lazy Routes** | 5 |
| **Test Framework** | Jasmine + Karma |
| **CSS Framework** | Tailwind CSS + SCSS |

---

## 🎓 How to Use This Repository for Learning

### For Beginners to Angular v20
1. Start with [src/app/pages/games/games.component.ts](src/app/pages/games/games.component.ts) - Simple signals and component structure
2. Move to [src/app/core/services/auth.service.ts](src/app/core/services/auth.service.ts) - Service and signal patterns
3. Explore [src/app/store/](src/app/store/) - NgRx basics
4. Study [src/app/app.routes.ts](src/app/app.routes.ts) - Routing and lazy loading

### For Intermediate Developers
1. Analyze [src/app/core/facades/auth.facade.ts](src/app/core/facades/auth.facade.ts) - Facade pattern implementation
2. Study [src/app/app.ts](src/app/app.ts) - Effects and signal synchronization
3. Explore [src/app/pages/finance/](src/app/pages/finance/) - Complex feature organization
4. Review [src/app/core/interceptors/api-key.interceptor.ts](src/app/core/interceptors/api-key.interceptor.ts) - HTTP layer

### For Advanced Developers
1. Implement Priority 1 features for foundational improvements
2. Add comprehensive test coverage (Priority 2)
3. Refactor state management with entity adapters (Priority 3)
4. Build animations and advanced features (Priority 4)
5. Explore enterprise patterns (Priority 5)

---

**Happy Learning! 🚀**
