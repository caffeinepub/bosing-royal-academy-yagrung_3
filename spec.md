# Bosing Royal Academy Yagrung

## Current State
The website is fully built with hero gallery, leadership messages, admin panel, announcements, academic highlights, photo gallery, and contact section. The colour scheme is currently using default/mixed colors (greens, grays, whites).

## Requested Changes (Diff)

### Add
- Nothing new structurally

### Modify
- Replace all primary colors with Royal Blue (#1a3a8f / #1e40af) and Golden (#d4a017 / #f59e0b) throughout the entire website
- Navigation bar: royal blue background, golden text/accents
- Hero section: overlay tint should use royal blue
- Section headings and dividers: royal blue or golden
- Buttons: royal blue background with golden hover, or golden background with royal blue text
- Cards and badges: royal blue and golden accents
- Footer: royal blue background, golden highlights
- Admin panel: royal blue and golden theme
- CSS custom properties in index.css updated to royal blue + golden palette

### Remove
- Any existing green or teal color accents

## Implementation Plan
1. Update index.css CSS variables/tokens to royal blue + golden palette
2. Update App.tsx color classes throughout all sections
3. Update AdminPanel.tsx color classes
