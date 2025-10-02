# Quickstart: Run the Contoso Bicycles frontend (MVP, mocked data)

1. Install dependencies (from repository root):

   - Install Node.js (v18+ recommended) and run:

     npm install

2. Start the dev server (Next.js):

     npm run dev

3. Open http://localhost:3000 and verify:
   - Homepage with hero and product listing
   - Product detail page opens with images and Add to Cart
   - Cart page shows items and Checkout button (checkout is simulated)

Notes:
- The app uses mocked data from `src/data/`. Replace fixtures to change displayed products.
- Run unit tests with `npm test` and E2E smoke test with Playwright (if configured).
