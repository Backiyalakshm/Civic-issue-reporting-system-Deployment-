# Civic Governance System - Frontend

A modern web application for Smart Civic Governance and Public Asset Monitoring built with React and Vite.

## Prerequisites

Before running this project, ensure you have:

- **Node.js 16+** (Download from: https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **VS Code** (recommended) with extensions:
  - ES7+ React/Redux/React-Native snippets
  - ESLint
  - Prettier

## Installation

### 1. Install Node.js

Download and install from: https://nodejs.org/

Verify installation:
```bash
node --version
npm --version
```

### 2. Install Dependencies

Navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

This will install all required packages including:
- React 18
- React Router DOM
- Axios (for API calls)
- Chart.js (for data visualization)
- Tailwind CSS (for styling)
- Vite (build tool)

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on: **http://localhost:5173**

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── services/       # API service calls
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Entry point
├── public/             # Static assets
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── README.md           # This file
```

## Configuration

### API Endpoint Configuration

The frontend connects to the backend API. Update the API base URL if needed:

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8080
```

Or update the axios configuration in your service files.

### Tailwind CSS

Tailwind CSS is pre-configured. You can customize it in `tailwind.config.js`.

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Features

- **User Authentication** - Login and registration
- **Complaint Management** - Submit and track complaints
- **Asset Monitoring** - View and manage public assets
- **Dashboard** - Real-time statistics and analytics
- **Feedback System** - Rate and provide feedback on resolutions
- **Responsive Design** - Works on desktop, tablet, and mobile

## Using VS Code

### 1. Open Project

```bash
code .
```

Or use File → Open Folder in VS Code

### 2. Install Recommended Extensions

VS Code will prompt you to install recommended extensions. Click "Install All".

### 3. Run from VS Code

- Open the integrated terminal (Ctrl + `)
- Run `npm install` if you haven't already
- Run `npm run dev`
- Click the localhost link in the terminal to open in browser

## Connecting to Backend

**Important:** Make sure the backend is running before starting the frontend!

The frontend expects the backend to be running on `http://localhost:8080`

To verify backend connection:
1. Start the backend application first
2. Start the frontend
3. Check browser console for any API errors

## Default Routes

- `/` - Home/Dashboard
- `/login` - Login page
- `/register` - Registration page
- `/complaints` - Complaints list
- `/complaints/create` - Create new complaint
- `/assets` - Assets list
- `/profile` - User profile

## Troubleshooting

### Common Issues:

1. **Port 5173 already in use**
   - Vite will automatically try the next available port
   - Or kill the process using port 5173

2. **Dependencies not installing**
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again
   - Try `npm install --legacy-peer-deps`

3. **Module not found errors**
   - Ensure all imports use correct paths
   - Check for typos in import statements
   - Restart the dev server

4. **API connection errors**
   - Verify backend is running on port 8080
   - Check CORS configuration in backend
   - Check browser console for detailed errors

5. **Blank page on load**
   - Check browser console for errors
   - Verify all routes are properly configured
   - Clear browser cache

### Enable Debug Mode

Open browser DevTools (F12) and check the Console tab for error messages.

## Styling

This project uses Tailwind CSS for styling. Common utility classes:

```jsx
// Example component
<div className="bg-blue-500 text-white p-4 rounded-lg">
  <h1 className="text-2xl font-bold">Title</h1>
  <p className="mt-2">Description</p>
</div>
```

## API Integration

The frontend uses Axios for API calls. Example:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

## User Roles

The frontend adapts based on user roles:
- **CITIZEN** - Can submit and view their complaints
- **OFFICER** - Can view assigned complaints and update status
- **ADMIN** - Full access to all features

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tips

1. **Use React DevTools** - Install the React Developer Tools browser extension
2. **Hot Reload** - Vite provides instant hot module replacement
3. **Component Structure** - Keep components small and reusable
4. **State Management** - Use React hooks (useState, useEffect)

## Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=Civic Governance System
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Production Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. The `dist` folder contains the production-ready files

3. Deploy to any static hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - Firebase Hosting

## Testing

```bash
# Run tests (if configured)
npm test
```

## Performance Optimization

- Code splitting is handled automatically by Vite
- Images are optimized during build
- CSS is minified and purged
- JavaScript is bundled and minified

## Support

For issues:
1. Check browser console for errors
2. Verify backend API is running
3. Ensure all dependencies are installed
4. Check network tab in DevTools for API failures

## License

This project is part of a Smart Civic Governance System.
