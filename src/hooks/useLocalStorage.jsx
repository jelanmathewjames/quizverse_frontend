export const useLocalStorage = (key) => {
    const setItem = (value) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error('Error setting item in localStorage:', error)
        }
    }

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : null
        } catch (error) {
            console.error('Error getting item from localStorage:', error)
            return null
        }
    }

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.error('Error removing item from localStorage:', error)
        }
    }

    return { setItem, getItem, removeItem }
}
