# Art Portfolio Website

A responsive, dark-themed art portfolio website to showcase digital and traditional artwork with stunning animations and popup gallery.

## Features

- **Dark Theme**: Beautiful dark design with subtle animations
- **Responsive Design**: Looks great on all devices - mobile, tablet, and desktop
- **Art Galleries**: Separate sections for digital and traditional art
- **Popup Gallery**: Click on any artwork to view it in a larger popup with details
- **Animation Effects**: Smooth reveal animations as you scroll
- **Interactive Elements**: Hover effects, smooth scrolling, and more
- **Contact Form**: Easy way for visitors to get in touch
- **Social Media Links**: Connect with visitors on various platforms

## Project Structure

```
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Main stylesheet with dark theming
├── js/
│   └── script.js       # JavaScript functionality and animations
└── art/                # Art directories
    ├── digital/        # Upload digital art here
    └── traditional/    # Upload traditional art here
```

## How to Use

1. **Upload Your Art**:

   - Place your digital artwork in the `art/digital/` directory
   - Place your traditional artwork in the `art/traditional/` directory

2. **Customize the Website**:

   - Edit the HTML to update your personal information
   - Modify the styling in CSS if you want to change colors or animations
   - Update social media links in the HTML file

3. **View Your Portfolio**:
   - Open `index.html` in a web browser to see your portfolio
   - Click on any image to view it in a popup gallery

## Technical Details

- Built with pure HTML, CSS, and JavaScript (no frameworks)
- Uses CSS variables for easy theming
- Implements CSS animations and transitions for visual effects
- Implements Intersection Observer API for scroll animations
- Dynamically loads artwork from specified folders
- Features interactive popup gallery for viewing artwork

## Customization

You can easily customize the website by:

- Changing the color scheme in the CSS variables (in `css/style.css`)
- Updating your personal information in the About section
- Adding or removing sections as needed
- Customizing the animations and transitions

## Browser Support

This website works in all modern browsers, including:

- Chrome
- Firefox
- Safari
- Edge
