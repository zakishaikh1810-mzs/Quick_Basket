# QuickBasket – grocery delivery (MERN)

## Run
Requires Node 18+ and MongoDB (local or Atlas).

```bash
# backend
cd backend && npm install
cp .env.example .env      # set MONGO_URI and JWT_SECRET
npm start                 # http://localhost:5000 (auto-seeds 24 products)

# frontend (new terminal)
cd frontend && npm install
npm run dev               # http://localhost:5173
```
Features: browse/search/filter, product details, persistent cart, register/login (JWT), checkout that saves orders.
Product photos load by keyword from loremflickr.com; an emoji tile shows if a photo fails. Free delivery above ₹499.
