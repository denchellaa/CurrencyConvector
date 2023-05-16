import {useEffect, useState} from "react";
import { Dna } from 'react-loader-spinner'
import classNames from "classnames";
import {Select} from "../UI";
import EqualIcon from "./EqualIcon.svg";
import ArrowDownIcon from "./ArrowDownIcon.svg"
import styles from "./CurrencyConvector.module.scss"

const requestOptions: any = {
    method: 'GET',
    redirect: 'follow',
    headers: {"apikey": "953wOenGpyUKNJUexI9Ad4c1kGIf90I6"}
};
const CurrencyConvector = () => {
    const [currencyFrom, setCurrencyFrom] = useState("RUB")
    const [currencyFromValue, setCurrencyFromValue] = useState("Russian Ruble")
    const [currencyTo, setCurrencyTo] = useState("USD")
    const [currencyToValue, setCurrencyToValue] = useState("United State Dollar")
    const [value, setValue] = useState("")
    const [currencyResponse, setCurrencyResponse] = useState(null)
    const [isLoader, setIsLoader] = useState(false)
    const [currencyList, setCurrencyList] = useState(null)

    useEffect(() => {
        if(currencyResponse?.success) {
            setIsLoader(false)
        }
    }, [currencyResponse])

    const getCurrencyList = async() => {
        const response = await fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
        const list = await response.json()
        setCurrencyList(list)
    }

    useEffect(() => {
        getCurrencyList()
    }, [])

    const getCurrencyResult = async() => {
        setIsLoader(true)
        setCurrencyResponse(null)
        const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${currencyTo}&from=${currencyFrom}&amount=${value}`, requestOptions)
        const currency = await response.json()
        setCurrencyResponse(currency)
    }

    const onValueChange = (event: any) => {
        setValue(event.target.value)
    }

    const renderResult = () => {
        if(currencyResponse?.success) {
            return (
                <>
                    <div className={styles.result}>
                        <div className={classNames(styles.arrowDownWrapper, {[styles.arrowDownWrapper__From]: true})}>
                            <img className={styles.arrowDown} src={ArrowDownIcon as unknown as string} alt="ArrowDown Logo"/>
                        </div>
                        <div className={styles.currencyResult}>
                            <div className={styles.currencyName}>
                                <span className={styles.resultShort}>{currencyFrom}</span>
                                <span className={styles.resultFull}>{currencyFromValue}</span>
                            </div>
                            <span className={styles.resultShort}>{value}</span>
                        </div>
                    </div>
                    <img className={styles.equal} src={EqualIcon as unknown as string} alt="Equal logo"/>
                    <div className={styles.result}>
                        <div className={classNames(styles.arrowDownWrapper, {[styles.arrowDownWrapper__To]: true})}>
                            <img className={styles.arrowDown} src={ArrowDownIcon as unknown as string} alt="ArrowDown Logo"/>
                        </div>
                        <div className={styles.currencyResult}>
                            <div className={styles.currencyName}>
                                <span className={styles.resultShort}>{currencyTo}</span>
                                <span className={styles.resultFull}>{currencyToValue}</span>
                            </div>
                            <span className={styles.resultShort}>{currencyResponse?.result}</span>
                        </div>
                    </div>
                </>
            )
        }
        return null
    }

    const data = currencyList ? Object.entries(currencyList.symbols) : []

    return (
        <div className={styles.container}>
            <Dna
                visible={isLoader}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />

            <div className={styles.convert}>
                <div className={styles.controls}>
                    <span className={styles.label}>Amount</span>
                    <input className={styles.input} onChange={onValueChange} type="text"/>
                </div>
                <div className={styles.controls}>
                    <span className={styles.label}>From</span>
                    <Select data={data} defaultValue={currencyFromValue} setCurrencyKey={setCurrencyFrom} setCurrencyFromValue={setCurrencyFromValue}/>
                </div>
                <div className={styles.controls}>
                    <span className={styles.label}>To</span>
                    <Select data={data} defaultValue={currencyToValue} setCurrencyKey={setCurrencyTo} setCurrencyFromValue={setCurrencyToValue}/>
                </div>
            </div>
            <div className={styles.info}>
                {renderResult()}
                <button onClick={getCurrencyResult} className={styles.btn}>CONVERT</button>
            </div>
        </div>
    )
}
export {CurrencyConvector}

