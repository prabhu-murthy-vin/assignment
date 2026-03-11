import { FunctionComponent } from "react";
import { CardModel } from "../model/card";
import styles from "./card.module.css";
import { Dayjs } from "dayjs";

const Card: FunctionComponent<CardModel> = ({ title, data }) => {

    const canRender = (val: any) => !Array.isArray(val) || typeof val !== "object"

    return <div className={styles.container}>
        <h3 className={styles.header}>{title}</h3>
        <div className={styles.body}>
            <div className={styles.values}>
                {
                    Object.entries(data).map(([key, value], index) => {
                        return canRender(value) ? <div className={styles.value_row} key={`${key}_index`}>
                            <span className={styles.value_text_title}>{key} : </span>
                            <span className={styles.value_text_val}>{value.toString()}</span>
                        </div> : null
                    })
                }
            </div>
        </div>
        <div className={styles.footer}>

        </div>
    </div>
}


export { Card }