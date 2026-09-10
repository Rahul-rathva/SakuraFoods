# BlossomFoods 🌸🍙

**An AI-powered, 365-day food subscription service landing page delivering personalized Japanese-Indian fusion meals in New Delhi.**

## 🎯 Overview

BlossomFoods is a modern, responsive landing page for a premium meal subscription service. It features:
- **"Blossom & Spice" aesthetic** — Sakura pink and saffron Indian accents blended throughout
- **Fluid animations** — Falling petal effects, smooth hover transitions, and reveal effects
- **Lead-capture system** — Production-ready form integration with Formspree for email collection
- **AI-ready backend** — Node.js + Express + MongoDB foundation for meal personalization (in development)

The landing page is **fully functional as a lead-generation tool**. The backend AI infrastructure is in place but not yet connected to the frontend.

---

## ✨ Features

### Frontend (Live & Complete)
- ✅ Responsive single-page landing site (HTML5, CSS3, vanilla JS)
- ✅ Mobile-optimized design with hamburger navigation
- ✅ Animated hero section with customer testimonials
- ✅ Interactive meal showcase (2,000+ recipes available)
- ✅ Dual pricing tiers (Starter $399/mo, Complete $649/mo)
- ✅ Photo gallery with zoom hover effects
- ✅ Lead-capture form via Formspree (redirects to confirmation page)
- ✅ Falling sakura petal animation
- ✅ SEO-friendly meta tags and Open Graph support

### Backend (Foundation Ready)
- 🚀 Express.js server with CORS support
- 📦 Mongoose schemas for user profiles and meal preferences
- 🧠 OpenAI integration scaffolded (for future AI meal plan generation)
- 🔌 `/generate-plan` endpoint ready for personalized meal recommendations
- 📊 MongoDB connection configured via environment variables

---

## 📋 Current Status

### What Works Now
- Landing page is **production-ready** for capturing leads
- Email forms submit successfully to Formspree
- All styling and animations function correctly
- Backend server can be started locally
- Database schema is defined

### What's In Development
- Frontend-to-backend connection (form → /generate-plan endpoint)
- AI meal plan generation via OpenAI
- Deployment of backend to production
- User authentication & account management
- Meal plan approval workflow
- Delivery scheduling system

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, JavaScript (Ionicons) |
| **Backend** | Node.js, Express 5.x |
| **Database** | MongoDB + Mongoose 9.x |
| **AI** | OpenAI API (text-davinci-003) |
| **Form Handling** | Formspree |
| **Hosting** | GitHub Pages (frontend), TBD (backend) |

---

## 🚀 Quick Start

### View the Landing Page
```bash
# Clone the repo
git clone https://github.com/Rahul-rathva/BlossomFoods.git
cd BlossomFoods

# Open in browser
open index.html
# or navigate to: https://rahul-rathva.github.io/BlossomFoods/
```

### Run the Backend Locally (Optional)
```bash
# Install dependencies
npm install

# Create .env file with:
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/blossomfoods
OPENAI_API_KEY=sk-your-key-here

# Start the server
node server.js
# Server runs on http://localhost:3000
```

---

## 📁 Project Structure

```
BlossomFoods/
├── index.html              Main landing page
├── thanks.html             Confirmation page (post-signup)
├── server.js               Express server entry point
├── package.json            Node.js dependencies
├── package-lock.json       Dependency lock file
│
├── Css/
│   ├── general.css         Reset, typography, variables
│   ├── style.css           Component styles (14.6 KB)
│   └── queries.css         Mobile responsive breakpoints
│
├── Images/
│   ├── Meals/              Hero, meal showcase images
│   ├── Customers/          Customer testimonial avatars
│   ├── Gallery/            Food photography (12 images)
│   ├── Apps/               iPhone app UI mockups
│   └── logos/              "Featured in" publication logos
│
├── models/
│   └── user.js             Mongoose schema (name, email, diet, preferences)
│
└── routes/
    └── airoutes.js         POST /generate-plan endpoint (OpenAI integration)
```

---

## 📋 How It Works

### Landing Page Flow (Live Now)
1. **User arrives** → Sees hero section with call-to-action
2. **Browses sections** → Features, how it works, meals, testimonials, pricing
3. **Fills form** → Enters name, email, dietary preferences, referral source
4. **Submits** → Data sent to Formspree (external service)
5. **Confirmation** → Redirected to `thanks.html` with "Arigato!" message

### AI Meal Plan Generation (In Development)
1. Backend receives user diet preferences from MongoDB
2. Constructs OpenAI prompt: *"Create a 7-day [diet] meal plan for a BlossomFoods subscriber using Japanese-Indian fusion recipes"*
3. OpenAI generates personalized plan
4. Plan stored in database and returned to frontend
5. User can approve/modify meals and set delivery schedule

---

## 🌐 Live Demo

**Landing Page:** [https://rahul-rathva.github.io/BlossomFoods/](https://rahul-rathva.github.io/BlossomFoods/)

Try signing up for a free trial — the confirmation email will be sent to your inbox!

---

## 🎨 Design Highlights

- **Brand Colors:**
  - Sakura Pink: `#e8a1a6`
  - Saffron Orange: `#ff9933`
  - Zen Brown: `#5d4037`
  - Cream Background: `#fdf2e9`

- **Animations:**
  - Falling sakura petals (3-5 second cycles)
  - Meal card 3D tilt on hover
  - Gallery zoom effects
  - Section reveal animations on scroll (in CSS, not yet JS-triggered)

- **Typography:**
  - Rubik font (400, 500, 600, 700 weights)
  - 10px base font size for flexible scaling

---

## 📦 Dependencies

**Frontend:**
- Ionicons 5.4.0 (icon library)
- Google Fonts (Rubik)

**Backend:**
```json
{
  "express": "^5.2.1",
  "mongoose": "^9.1.5",
  "openai": "^6.16.0",
  "cors": "^2.8.6",
  "dotenv": "^17.2.3"
}
```

---

## 📝 Next Steps to Full Launch

| Priority | Task | Status |
|----------|------|--------|
| P0 | Deploy backend to production | ⏳ Pending |
| P0 | Connect form to `/generate-plan` endpoint | ⏳ Pending |
| P0 | Set up MongoDB Atlas cluster | ⏳ Pending |
| P1 | Add user authentication (login/signup) | ⏳ Pending |
| P1 | Implement meal plan approval workflow | ⏳ Pending |
| P2 | Add payment processing (Stripe) | ⏳ Pending |
| P2 | Delivery schedule management UI | ⏳ Pending |

---

## 🤝 Contributing

This is a personal portfolio project. Fork and customize as needed!

---

## 📄 License

ISC License — See package.json for details

---

## 👤 Author

**Rahul Rathva**
- GitHub: [@Rahul-rathva](https://github.com/Rahul-rathva)
- Portfolio: [BlossomFoods Live](https://rahul-rathva.github.io/BlossomFoods/)

---

## 📞 Contact

**Address:** Hyatt Place, 2nd Floor, New Delhi, India  
**Phone:** +91 9265-219-230  
**Email:** hello@blossomfoods.com

---

## 🌟 Acknowledgments

- Landing page design inspired by modern SaaS practices
- Japanese-Indian fusion concept celebrates culinary bridge between two cultures
- Sakura theme represents beauty, wellness, and seasonal mindfulness
