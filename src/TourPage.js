import React, { useState, useEffect } from 'react';
import Tour from "./Tour";


const url = 'https://course-api.com/react-tours-project'

const TourPage = () => {


    const [isError, setIsError] = useState(false)
    const [tours, setTours] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const removeItem = (id) => {
        const newToursList = tours.filter(tour => id !== tour.id)
        setTours(newToursList)
    }

    const fetchData = () => {
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    return res.json()
                } else {
                    setIsLoading(false)
                    setIsError(true)
                    throw new Error(res.statusText)
                }
            }).then(res => {
            setTours(res)
            console.log(res)
            setIsLoading(false)
        })
            .catch(e => console.log(e))

    }

    useEffect(() => {
        fetchData()

    }, [])

    if (isLoading) {
        return (
            <div>
                <h1>...Loading</h1>
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                <h1>Error...</h1>
            </div>
        )
    }
    return (
        <>
            <div className="title">
                <h2>our tours</h2>
            </div>
            <section>

                {tours.length ? tours.map(tour => {
                    const { id, name, info, price, image } = tour
                    return <Tour key={id} id={id} title={name} description={info} price={price} img={image}
                                 removeItem={removeItem}/>
                }) : <div>
                    No tours available
                    <button onClick={fetchData}>refresh</button>
                </div>}

            </section>
        </>
    );
};

export default TourPage;