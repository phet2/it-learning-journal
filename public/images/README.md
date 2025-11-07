# Images Directory

## Structure

```
images/
├── projects/          # Project screenshots and images
├── lessons/           # Lesson illustrations and diagrams
├── profile/           # Profile pictures and avatars
└── screenshots/       # Website screenshots
```

## Usage

```jsx
// Regular img tag
<img src="/images/projects/ecommerce.jpg" alt="E-commerce" />

// Next.js Image component (recommended)
import Image from 'next/image'
<Image 
  src="/images/projects/ecommerce.jpg" 
  alt="E-commerce"
  width={400}
  height={300}
/>
```

## File Naming Convention

- Use lowercase with hyphens: `my-project.jpg`
- Include descriptive names: `ecommerce-homepage.jpg`
- Use appropriate extensions: `.jpg`, `.png`, `.webp`, `.svg`