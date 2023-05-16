import React from "react";
import {DropdownProps} from "./types"
import styles from "./Dropdown.module.scss"

const Dropdown: React.FC<DropdownProps> = ({data, setCurrencyKey, setCurrencyFromValue, setIsOpenDropdown}) => {
    const onValueClick = (key: string, value: string) => {
        setCurrencyKey(key)
        setCurrencyFromValue(value)
        setIsOpenDropdown(false)
    }

    const renderDropdown = () => {
        return data.map(([key, value]) => {
            return <div className={styles.item} key={key} onClick={() => onValueClick(key, value)}>{value}</div>
        })
    }

    return (
        <div className={styles.container}>
            {renderDropdown()}
        </div>
    )
}

export {Dropdown}