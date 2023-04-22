import { useEffect } from 'react'

function App() {
    useEffect(() => {
        const fetchServerData = async () => {
            const url = `http://localhost:${__SERVER_PORT__}`
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
        }

        fetchServerData()
    }, [])
    return <div className="App">
        <main className='main'>
            Вот тут будет жить ваше приложение :)
        </main>
    </div>
}

export default App
