import { useState, useEffect } from 'react'
const getData = async () => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }
    let data = null

    await fetch("http://localhost:9090/api/emporia?scale=1Y&duration=109500", requestOptions)
        .then(response => response.text()).then(result => { data = result })
        .catch(error => console.log('error', error))
    // console.log(data)
    return data
}
const Progress_bar = ({ height }) => {
    const [data, setData] = useState(null)
    const [progress, setProgress] = useState(0)

    const [textMargin, setTextMargin] = useState(0)

    const [bgcolor, setBgcolor] = useState("#61ed7f")
    const Pdiv = {
        height,
        width: '98%',
        backgroundColor: '#EBEBEB',
        borderRadius: 7,
        marginX: 20,
        marginTop: 10,
        position: "relative",
        textAlign: 'center'
    }
    const Cdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: "#61ed7f",
        borderRadius: 7
    }
    const [Parentdiv, setParentdiv] = useState(Pdiv)

    const [Childdiv, setChilddiv] = useState(Cdiv)

    const progresstext = {
        top: height / 4,
        color: 'black',
        fontWeight: 900,
        position: "absolute"
    }
    useEffect(async () => {
        const limit = 5
        let data = await getData()
        console.log(data)
        data ? setData(JSON.parse(data)) : setData([])
        data = JSON.parse(data)
        const co2Emission = data[0] ? data[0].usage * 0.000288962 : 0
        console.log(co2Emission)
        setProgress(parseInt((co2Emission * 100) / limit))
        if (parseInt((co2Emission * 100) / limit) >= 100) {
            // setBgcolor("#EB5757")
            // setProgress(100)
            const newLimit = (limit * 100) / co2Emission
            setParentdiv({ ...Parentdiv, backgroundColor: "#EB5757" })
            setChilddiv({ ...Childdiv, width: newLimit, opacity: "0.7", backgroundColor: '#EBEBEB' })
            setTextMargin(4)
        } else {
            setChilddiv({ ...Cdiv })
            setParentdiv(Pdiv)
            setTextMargin(0)
        }

    }, [])
    return (
        <div style={Parentdiv}>
            <div style={Childdiv}>
            </div>
            <span style={progresstext}>{progress >= 100 ? ` +${progress - 100}% ` : `${progress}%`}  </span>
        </div>

    )
}

export default Progress_bar
