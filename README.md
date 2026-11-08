# 🍽️ One More Restaurant - Frontend

A **production-ready restaurant website** built with modern technologies. Features a complete ordering system, user authentication, menu browsing, cart management, and beautiful animations.

**Tagline:** _"Khmer Heritage, Asian Flavors, Western Favorites"_

---

## ✨ Key Features

### 📄 Pages (10)

- 🏠 **Home** - Hero section, featured dishes, testimonials, CTAs
- 📋 **Menu** - Browse with category filters and search
- 🍽️ **Food Details** - Detailed view with ingredients & quantity selector
- 🛒 **Cart** - Shopping management with order summary
- ℹ️ **About** - Company story, team, values
- 📞 **Contact** - Contact form, location, hours
- 🔐 **Login** - User authentication with validation
- ✍️ **Register** - Account creation with password strength meter
- 👤 **Profile** - User info, favorites, order history
- ❌ **404** - Custom not found page

### 🎨 Components (15+)

- **Layout:** Navbar, Footer, responsive mobile menu
- **Food:** FoodCard, FoodGrid, CategoryFilter, SearchBar, RatingDisplay
- **Common:** Button (4 variants), Input, Loader, SectionTitle

### ⚙️ Technology Stack

```
Frontend Framework:    React 19 + TypeScript
Routing:              React Router v6
State Management:     Context API + TanStack Query
Styling:              Tailwind CSS 3
Animations:           Framer Motion
HTTP Client:          Axios
Development:          Vite
```

### 🎯 Features

✅ Full TypeScript support  
✅ Responsive mobile-first design  
✅ TanStack Query for caching & data management  
✅ Framer Motion animations & transitions  
✅ Form validation & error handling  
✅ Password strength indicator  
✅ Shopping cart with tax calculation  
✅ Mock data ready for API integration

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js 18+
npm or yarn
```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── assets/              # Images and icons
├── components/
│   ├── common/         # Button, Input, Loader, SectionTitle
│   ├── layout/         # Navbar, Footer
│   └── food/           # FoodCard, FoodGrid, CategoryFilter, etc.
├── pages/              # 10 page components
├── routes/             # Route configuration
├── context/            # CartContext, AuthContext
├── hooks/              # Custom React hooks (useFoodQueries)
├── services/           # API/mock service layer (foodService)
├── types/              # TypeScript interfaces
├── utils/              # Helpers, constants, mock data
├── styles/             # Global CSS & Tailwind setup
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

---

## 🎨 Design System

### Color Palette

```
Primary Green:    #1F4D3A
Gold Accent:      #D4A017
Background:       #FAFAFA
Text:             #1A1A1A
```

### Typography

```
Headings:  Playfair Display (serif)
Body:      Inter (sans-serif)
```

### Responsive Breakpoints

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
```

---

## 🔌 API Integration

### Mock Data Setup

Currently using `src/utils/mockData.ts` with:

- 12 food items (Khmer, Asian, Western)
- 4 testimonials
- Restaurant info

### To Integrate Backend:

Update `src/services/foodService.ts`:

```typescript
async getAllFoods(): Promise<Food[]> {
  const response = await axios.get('/api/foods')
  return response.data
}
```

### Required Endpoints

```
GET    /api/foods                    # All foods
GET    /api/foods/:id               # Food details
GET    /api/foods?category=khmer    # By category
GET    /api/foods/search?q=query    # Search
POST   /api/users/login             # Authentication
POST   /api/users/register          # Registration
POST   /api/orders                  # Create order
```

---

## 🧩 Component Usage

### Button Component

```tsx
<Button variant="primary" size="lg">
  Explore Menu
</Button>
```

Variants: `primary`, `secondary`, `outline`, `ghost`  
Sizes: `sm`, `md`, `lg`

### Input Component

```tsx
<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  error={errors.email}
  helperText="Enter a valid email"
/>
```

### FoodCard Component

```tsx
<FoodCard food={food} onAddToCart={handleAdd} />
```

---

## 🛒 Shopping Cart

### Features

- Add/remove items
- Quantity adjustment
- Order summary with tax
- Delivery fee calculation
- Persistent cart state

### Price Calculation

```
Subtotal:     Sum of (price × quantity)
Tax (10%):    Subtotal × 0.10
Delivery:     $2.99 (if items > 0)
Total:        Subtotal + Tax + Delivery
```

---

## 🔐 Authentication

### Current Implementation

- Mock authentication via Context API
- LocalStorage user persistence
- Password strength validation

### Integration Steps

1. Replace `AuthContext` login/register with API calls
2. Store JWT tokens securely
3. Add token refresh logic
4. Implement logout on token expiry

### Password Requirements

```
✓ Minimum 8 characters
✓ Uppercase letter
✓ Lowercase letter
✓ Number
✓ Special character (!@#$%^&*)
```

---

## 📱 Responsive Design

### Mobile-First Approach

```
Base: Mobile (320px)
sm:   Small devices (640px)
md:   Tablets (768px)
lg:   Desktops (1024px)
xl:   Large screens (1280px)
```

### Responsive Components

- Navbar: Hamburger menu on mobile
- Grid: 1 col (mobile) → 3 cols (desktop)
- Cart: Stacked (mobile) → Side-by-side (desktop)

---

## 🎬 Animations

### Framer Motion

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Built-in Animations

- Page transitions
- Hover effects
- Scroll reveals
- Button interactions
- Loading spinner

---

## 📊 Mock Data Examples

### Food Item

```typescript
{
  id: '1',
  name: 'Fish Amok',
  price: 12.99,
  category: 'khmer',
  rating: 4.8,
  reviews: 324,
  isVegetarian: false,
  isSpicy: true,
  spicyLevel: 2,
}
```

### User

```typescript
{
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date(),
}
```

---

## 🚀 Deployment

### Vercel

```bash
vercel deploy
```

### Netlify

```bash
netlify deploy --prod --dir=dist
```

### Docker

```bash
docker build -t restaurant-frontend .
docker run -p 5173:5173 restaurant-frontend
```

---

## 🐛 Troubleshooting

### Tailwind CSS not working?

```bash
# Rebuild Tailwind
npm run build
```

### Port 5173 already in use?

```bash
npm run dev -- --port 3000
```

### Type errors?

```bash
npx tsc --noEmit
```

---

## 📦 Dependencies

### Core (6)

- react
- react-dom
- react-router-dom
- @tanstack/react-query
- axios
- framer-motion

### UI (1)

- tailwindcss
- react-icons

### Dev (8)

- typescript
- vite
- @tailwindcss/forms
- @tailwindcss/typography
- autoprefixer
- postcss
- And more...

**Total:** ~15 production dependencies

---

## 💡 Best Practices

### Code Organization

✅ Components by feature (food, auth, etc.)  
✅ Services for external data  
✅ Contexts for global state  
✅ Hooks for reusable logic

### Performance

✅ TanStack Query caching  
✅ Code splitting with React.lazy  
✅ Image optimization  
✅ Debounced search

### TypeScript

✅ Strict mode enabled  
✅ Interfaces for all types  
✅ No `any` types  
✅ Error handling

---

## 🤝 Contributing

1. Clone repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📄 License

MIT License - Use freely for your projects

---

## 🎯 Future Enhancements

- [ ] Admin dashboard
- [ ] Real-time order tracking
- [ ] User reviews & ratings
- [ ] Loyalty program
- [ ] Payment integration (Stripe)
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Email notifications
- [ ] Push notifications
- [ ] Analytics dashboard

---

## 📞 Support

- 📧 Email: hello@onemorerestaurant.com
- 📱 Phone: +1 (555) 123-4567
- 🌐 Website: www.onemorerestaurant.com

---

**Made with ❤️ for food lovers** 🍽️✨

_One More Restaurant - Where Flavors Meet Tradition_
