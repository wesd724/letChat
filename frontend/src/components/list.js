import React from "react";
import styles from "./css/list.module.css";

const List = ({ list }) => {
    return (
        <ul className={styles.mul}>
            {list.map((value, index) =>
                <li className={styles.mli} key={index}>{value}</li>
            )}
        </ul>
    )
}

export default React.memo(List);
