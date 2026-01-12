# Mermaid Diagram Visualizer

A modern web application for creating and visualizing diagrams using Mermaid syntax with live preview.

## ✨ Features

- **Live Preview** - See your diagrams update in real-time as you type
- **Syntax Highlighting** - Color-coded Mermaid syntax for better readability
- **6 Diagram Templates** - Flowchart, Sequence, Class, State, ER, Gantt
- **Light/Dark Theme** - Toggle between themes with system preference detection
- **Fullscreen Mode** - Focus on your diagram with distraction-free preview
- **Keyboard Shortcuts** - Boost productivity with hotkeys
- **Export Options** - Download as SVG or PNG, copy code to clipboard
- **Auto-save** - Diagrams persist in localStorage
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/arcanine525/mermaid-diagram
cd mermaid-diagram

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t mermaid-visualizer .

# Run container
docker run -d -p 8080:80 mermaid-visualizer
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/⌘ + C` | Copy code |
| `Ctrl/⌘ + Shift + F` | Toggle fullscreen |
| `Ctrl/⌘ + Shift + T` | Toggle theme |
| `Ctrl/⌘ + +` | Zoom in |
| `Ctrl/⌘ + -` | Zoom out |
| `Ctrl/⌘ + 0` | Reset zoom |
| `Esc` | Exit fullscreen |

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Mermaid.js** - Diagram rendering
- **Lucide React** - Icons

## 📁 Project Structure

```
src/
├── components/        # React components
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── App.jsx            # Main application
├── index.css          # Styles with theming
└── main.jsx           # Entry point
```

## 📄 License

MIT License
