# AADHIASARANA T - Portfolio

A modern, professional portfolio website with stunning 3D animations. Built with React, TypeScript, Tailwind CSS, Three.js, and modern typography.

## ✨ Features

- **3D Animated Background**: Interactive Three.js background with particles, stars, and geometric shapes
- **Modern Typography**: Professional fonts (Space Grotesk & Syne) for maximum impact
- **Smooth Animations**: Scroll-based reveal animations and 60fps 3D effects
- **Professional Design**: Inspired by contemporary design studios
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Elements**: Hover effects, typing animations, and smooth scrolling
- **Dark Theme**: Eye-friendly dark theme with gradient accents
- **Performance Optimized**: Hardware-accelerated graphics and fast loading

## 🛠️ Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics and animations
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **Framer Motion** - Smooth animations
- **Vite** - Fast build tool
- **Lucide React** - Beautiful icon library

## 🎨 Typography

- **Space Grotesk** - Modern geometric sans-serif for body text and UI
- **Syne** - Bold contemporary font for headings and display text

## 📦 Installation

1. **Navigate to the project directory:**
   ```bash
   cd portfolio-v2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🚀 Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## 📁 Project Structure

```
portfolio-v2/
├── src/
│   ├── components/
│   │   ├── Navigation.tsx      # Header navigation
│   │   ├── Hero.tsx            # Hero section with typing effect
│   │   ├── About.tsx           # About me section
│   │   ├── Projects.tsx        # Project showcase
│   │   ├── Skills.tsx          # Skills and expertise
│   │   ├── Experience.tsx      # Work experience timeline
│   │   ├── Contact.tsx         # Contact form
│   │   └── Footer.tsx          # Footer section
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Customization

### Update Personal Information

1. **Hero Section** (`src/components/Hero.tsx`):
   - Update the `roles` array with your titles
   - Modify the description text

2. **About Section** (`src/components/About.tsx`):
   - Update the bio text
   - Change the profile image URL
   - Adjust stats (projects, experience, etc.)

3. **Projects** (`src/components/Projects.tsx`):
   - Add your projects to the `projects` array
   - Include project images, descriptions, and links

4. **Skills** (`src/components/Skills.tsx`):
   - Update the `skills` and `categories` arrays
   - Adjust proficiency levels

5. **Experience** (`src/components/Experience.tsx`):
   - Add your work experience to the `experiences` array

6. **Contact** (`src/components/Contact.tsx`):
   - Update email and social links
   - Configure form submission endpoint

### Color Scheme

Modify `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  dark: {
    900: '#0a0a0a',  // Main background
    800: '#121212',  // Secondary background
    700: '#1a1a1a',  // Tertiary background
  },
}
```

## 📝 Key Features Breakdown

### 1. **Smooth Scroll Animations**
- Intersection Observer API for scroll-triggered animations
- Staggered animation delays for visual hierarchy

### 2. **Typing Effect**
- Dynamic role changing with typing/deleting animation
- Customizable speed and delay

### 3. **Interactive Project Cards**
- Hover effects with scale and shadow transitions
- Image zoom on hover
- Year badges and tag pills

### 4. **Timeline Experience**
- Alternating left/right layout on desktop
- Animated timeline dots
- Hover effects on cards

### 5. **Contact Form**
- Form validation
- Success/error states
- Loading indicators

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the `dist` folder to Netlify
```

### GitHub Pages
1. Update `vite.config.ts` with your base URL
2. Run `npm run build`
3. Deploy the `dist` folder

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Feel free to fork this project and customize it for your needs. If you find any bugs or have suggestions, please open an issue.

## 📧 Contact

AADHIASARANA T
- GitHub: [@AADHIASARANATAMIZHINIAN](https://github.com/AADHIASARANATAMIZHINIAN)
- Email: your.email@example.com

---

**Made with ❤️ and lots of coffee**
