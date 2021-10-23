import { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [userData, setUserData] = useState(null)
  const [headers, setHeaders] = useState(null)
  const [searchStr, setSearchStr] = useState('')

  const sort = headerName => {
    const header = headers.find(header => header.name === headerName)
    const newUserData = [...userData]
    const newHeaders = [...headers]
    if (header.sorted === null || header.sorted === 'desc')  {
      // ascending sort
      setUserData(newUserData.sort((a, b) => a[headerName] > b[headerName] ? 1 : -1))
      setHeaders(newHeaders.map(header => {
        if (header.name === headerName) {
          header.sorted = 'asc'
        }
        return header
      }))
    } else {
      // descending sort
      setUserData(newUserData.sort((a, b) => a[headerName] < b[headerName] ? 1 : -1))
      setHeaders(newHeaders.map(header => {
        if (header.name === headerName) {
          header.sorted = 'desc'
        }
        return header
      }))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://randomuser.me/api/?results=20'
        const res = await fetch(url)
        const { results } = await res.json()
        const headers = ['city', 'country', 'postcode', 'state', 'street name', 'street number', 'timezone', 'timezone offset']
        setUserData(results.map(res => {
          const l = res.location
          return {
            [headers[0]]: l.city,
            [headers[1]]: l.country,
            [headers[2]]: String(l.postcode),
            [headers[3]]: l.state,
            [headers[4]]: l.street.name,
            [headers[5]]: String(l.street.number),
            [headers[6]]: l.timezone.description,
            [headers[7]]: l.timezone.offset
          }
        }))
        setHeaders(headers.map(hName => {
          return {
            name: hName,
            sorted: null
          }
        }))
      } catch (e) {
        console.log('An error occurred:', e)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <input type='text' value={searchStr} onChange={e => setSearchStr(e.target.value.toLowerCase())} />
        { userData ? 
          <>
            <table>
              <tbody>
                <tr>
                  { headers && headers.map(header => (
                    <th key={header.name} onClick={() => sort(header.name)}>
                      {header.name}
                    </th>
                  )) }
                </tr>
                { userData.map((data, i) => {
                  if (JSON.stringify(data).toLowerCase().includes(searchStr)) {
                    return <tr key={i}>
                      <td>{data.city}</td>
                      <td>{data.country}</td>
                      <td>{data.postcode}</td>
                      <td>{data.state}</td>
                      <td>{data['street name']}</td>
                      <td>{data['street number']}</td>
                      <td>{data.timezone}</td>
                      <td>{data['timezone offset']}</td>
                    </tr>
                  } else {
                    return <tr key={i}></tr>
                  }
                }) }
              </tbody>
            </table>
            <p>thanks, have a good day</p>
          </>
        : <p>...</p> }
      </header>
    </div>
  )
}

export default App
