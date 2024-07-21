import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
        <Toaster
            toastOptions={{
                style: {
                    padding: '7px',
                    border: '2px solid #E1C6E6',
                    duration: 5000,
                    zIndex: 9999,
                },
            }}
        />
    </BrowserRouter>
)
