order-analytics :
Accepts an observable of Order[] as input.

Filters only completed orders.

Groups revenue by date.

Sorts the dates by revenue descending.

Exposes an observable dailyRevenue$ for the template to consume using async.


order-details :
Accepts a single order object.

Shows a message if no order is selected.

If an order is selected, displays a table of items with their quantities, prices, and totals.


orders-filters :
Uses Reactive Forms (FormBuilder + FormGroup).

Emits filter changes via an @Output() EventEmitter called filtersChange.

Debounces input changes by 300ms to avoid emitting too frequently (debounceTime(300)).

Exposes form controls: search, from, to, payment, status.


orders-list:
Accepts an array of Order objects via @Input().

Emits selected orders via @Output().

Implements pagination (next/previous page, subset of orders).

Tracks items by id for performance.

Reacts to changes in the orders array.


order-page: 
Fetches all orders from OrdersService.

Maintains completed orders stream.

Maintains filtered orders based on user-applied filters.

Tracks selected order for showing details.


orders.service:
Provides a reactive stream of orders (orders$) to the rest of the app.

Fetches data from a local JSON file (assets/mockdata.json).

Maps raw API order objects to your internal Order model, including calculating totals.

Uses shareReplay to cache the result for multiple subscribers, preventing multiple HTTP requests.
