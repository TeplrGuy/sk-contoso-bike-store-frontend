# Phase 1: Data Model

## Entities

- Product
  - id: string
  - title: string
  - shortDescription: string
  - price: number (in cents or smallest currency unit)
  - images: string[] (relative paths or URLs)
  - category: string (e.g., mountain, road, electric, kids, accessories)
  - badges?: string[] (e.g., ["New","13% Off"]) 

- Cart
  - items: [{ productId: string, quantity: number }]
  - subtotal: number

- Order (MVP stub)
  - orderId: string
  - items: same structure as Cart
  - shipping: { name, addressLine1, addressLine2?, city, postalCode, country }
  - total: number
  - status: string (e.g., pending, paid, failed)

## Validation rules
- Product.price MUST be >= 0
- Cart.quantity MUST be >= 1
- Shipping postalCode and country MUST be present for checkout

## Fixtures location
- Place sample JSON fixtures at `src/data/products.json` and `src/data/sample-cart.json`
