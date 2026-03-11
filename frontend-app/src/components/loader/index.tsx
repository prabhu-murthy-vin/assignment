import { FunctionComponent } from "react";
import styles from "./loader.module.css";
import { LoaderModel } from "../model/loader";

const Loader: FunctionComponent<LoaderModel> = ({ text = "" }) => {
    return <div className={styles.container} role="dialog">
        <span className={styles.status_text}>{`Loading ${text} ....`}</span>
    </div>
}

export default Loader