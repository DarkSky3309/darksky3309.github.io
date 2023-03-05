import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Bar from "./component/bar";
import Chart from "./component/Chart";

export enum providers {
    backblaze = "backblaze.com",
    bunny = "bunny.net",
    scaleway = "scaleway.com",
    vulrt = "vultr.com"
}

function App() {
    const [storage, setStorage] = useState(0);
    const [transfer, setTransfer] = useState(0);
    const [isSSDEnabled, setIsSSDEnabled] = useState(false);
    const [isMulti, setIsMulti] = useState(false);
    let priceStorage: number,
        priceTransfer: number,
        sum: number;

    function calcSum(storage: number, transfer: number) {
        return Number(((priceStorage * storage) + (priceTransfer * transfer)).toFixed(2));
    }

    function calcCostOfProvider(provider: providers) {
        switch (provider) {
            case providers.backblaze:
                priceStorage = 0.005;
                priceTransfer = 0.01;
                sum = calcSum(storage, transfer);
                return (7 > sum ? 7 : sum)
            case providers.bunny:
                priceStorage = isSSDEnabled ? 0.02 : 0.01;
                priceTransfer = 0.01;
                sum = calcSum(storage, transfer);
                return (sum < 10 ? sum : 10)
            case providers.scaleway:
                priceStorage = isMulti ? 0.06 : 0.03;
                priceTransfer = 0.02;
                let amountStorageAfterDiscount = storage - 75 <= 0 ? 0 : storage - 75,
                    amountTransferAfterDiscount = transfer - 75 <= 0 ? 0 : transfer - 75;
                return calcSum(amountStorageAfterDiscount, amountTransferAfterDiscount)
            case providers.vulrt:
                priceStorage = 0.01;
                priceTransfer = 0.01;
                sum = calcSum(storage, transfer);
                return (sum > 5 ? sum : 5)
        }
    }

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () =>
            window.removeEventListener("resize", updateDimensions);
    }, [])

    function updateDimensions() {
        const width = window.innerWidth
        if (width <= 425) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    console.log(isMobile)


    return (
        <div className="App">


            <Chart calcValue={calcCostOfProvider} storage={storage} transfer={transfer} isMulti={isMulti}
                   isSSD={isSSDEnabled} isMobile={isMobile}/>
            <Bar value={storage} setValue={setStorage} name={"Storage"}/>
            <Bar value={transfer} setValue={setTransfer} name={"Transfer"}/>
            <div className="btn">
                <button onClick={() => {
                    setIsSSDEnabled(true)
                }}>SSD
                </button>
                <button onClick={() => {
                    setIsSSDEnabled(false)
                }}>HDD
                </button>
            </div>
            <div className="btn">
                <button onClick={() => {
                    setIsMulti(true)
                }}>Multi
                </button>
                <button onClick={() => {
                    setIsMulti(false)
                }}>Single
                </button>
            </div>

        </div>
    )
}

export default App
