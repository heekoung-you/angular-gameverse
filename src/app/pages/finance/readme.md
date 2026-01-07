Project Structure Overview
🔹 Pages (Top‑Level Views)
DashboardPage → overview of totals (income, expenses, balance), charts, quick stats.

TransactionsPage → list of all transactions with filters, sorting, and search.

AddTransactionPage → form to add new income/expense.

ReportsPage (optional) → category breakdowns, monthly summaries, charts.

🔹 Components (Reusable UI Pieces)
TransactionListComponent → displays transactions in a table or card view.

TransactionItemComponent → single transaction card/row.

TransactionFormComponent → form for adding/editing transactions.

TotalsCardComponent → shows total income, expenses, and balance.

FilterBarComponent → filter by category, type, date, tags.

ValidationResultComponent → shows regex validation results (IBAN, card, email, etc.).

🔹 Services (Logic & Data)
TransactionService

Holds the array of transactions (mock data).

Provides methods: getAll(), add(), update(), delete().

MockDataService

Seeds the app with your 20–50 mock transactions.

ValidationService

Regex checks for payment details (IBAN, card numbers, emails, crypto wallets).

FormattingService

Currency formatting, date formatting, string utilities.

ReportService (optional)

Aggregates data for charts (group by category, monthly totals).

Utilities (Helper Functions)
ArrayUtils → shuffle, flatten, groupBy.

StringUtils → capitalize, check palindrome, regex helpers.

DateUtils → format dates, calculate relative times.

Styles
Angular Material → for forms, tables, dialogs.

Tailwind CSS → for layout, spacing, colors, responsive design.

-Big Picture Flow
Mock Data → seeded by MockDataService.

TransactionService → manages state (add, update, delete).

Components → display data (list, totals, filters).

ValidationService → checks payment details with regex.

FormattingService → formats currency & dates for UI.

Pages → combine components into full views (Dashboard, Transactions, Add Transaction).

-Be Building
A Dashboard with totals and charts.

A Transactions list with filters and sorting.

A Form to add/edit transactions.

Validation & formatting utilities to practice regex and modern JS.

A service layer to manage mock data and simulate async operations.