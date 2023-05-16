import React, {useState} from "react";
import classnames from "classnames";
import {SelectProps} from "./types";
import Arrow from "./Arrow.svg"
import {Dropdown} from "../../Dropdown";
import styles from "./Select.module.scss"
 const Select: React.FC<SelectProps> = ({data, defaultValue, setCurrencyKey, setCurrencyFromValue}) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)

     const onArrowHandler = () => {
        setIsOpenDropdown(!isOpenDropdown)
     }

     const renderDropdown = () => {
        if(isOpenDropdown) {
            return (
                <Dropdown
                    data={data}
                    setCurrencyKey={setCurrencyKey}
                    setCurrencyFromValue={setCurrencyFromValue}
                    setIsOpenDropdown={setIsOpenDropdown}
                />
            )
        }
        return null
     }

    return (
        <div className={styles.container}>
            <div className={styles.text}> {defaultValue} </div>
            <div className={classnames(styles.icon, {[styles['icon--is_open']]: isOpenDropdown})} onClick={onArrowHandler}>
                <img src={Arrow as unknown as string} alt="React Logo"/>
            </div>
            {renderDropdown()}
        </div>
    )
}
export {Select}
