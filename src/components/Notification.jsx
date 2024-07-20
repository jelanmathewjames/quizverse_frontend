import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { toast } from 'react-hot-toast'

const Notification = () => {
    const axiosPrivate = useAxiosPrivate()
    const [data, setData] = useState([])

    useEffect(() => {
        try {
            const response = axiosPrivate.get('/auth/role-requests')
            setData(response.data)
        } catch (e) {
            toast.error(e)
        }
    }, [axiosPrivate])
}

export default Notification
