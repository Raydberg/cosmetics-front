import { DataTable } from './components/data-table'


// async function getData(): Promise<Payment[]> {
//     // Fetch data from your API here.
//     return [
//         {
//             id: "728ed52f",
//             amount: 100,
//             status: "pending",
//             email: "m@example.com",
//         },
//         // ...
//     ]
// }

export default function AdminProducts() {
    // const [data, setData] = useState<Payment[]>([])
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const result = await getData()
    //             setData(result)
    //         } catch (error) {
    //             console.error('Error fetching data:', error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     fetchData()
    // }, [])

    // if (loading) {
    //     return <div>Cargando...</div>
    // }

    return (
        <div className="container mx-auto py-2">
            <DataTable  />
        </div>
    )
}