"use client"
import { CSSProperties, FunctionComponent } from "react"
import { GridModel, RowModel } from "../model"
import { RowView } from "./row"
import clsx from "clsx";
import styles from './row.module.css';
import { nanoid } from "nanoid";
import Link from "next/link";


const Grid: FunctionComponent<GridModel> = ({ table, config }) => {
    const classes = clsx([styles.row])

    const headerClasses = clsx([styles.row, styles.header_row])

    const style = {
        "--columns-count": config?.columns
    } as CSSProperties

    const headers = config?.headers || Object.keys(table.slice(0, 1).map(record => record[Object.keys(record)[0]])[0]);

    return <div role="table" style={style} className={styles.table}>
        <div role="" className={styles.table_body}>
            {table.map((record, index) => record ? <div key={`outer_record_wrap_${index}_${record["id"]}`}>
                {index === 0 ? <div role="row" className={headerClasses}>{
                    headers.map((header, index) => <div key={`index_${header}`} className={styles.header_cell}>{header}</div>)
                }</div> : null}
                {
                    config?.hyperlinkRow ? <Link href={`${config.hyperlinkRow.url}/${Object.keys(record)[0]}`} style={{ textDecoration: "none" }} scroll>
                        <div key={(record["id"] || nanoid()) + "_row"} role="row" className={classes} style={style}>
                            <RowView {...record} /> <span className={styles.row_arrow}>&gt;</span>
                        </div>
                    </Link> :
                        <div key={(record["id"] || nanoid()) + "_row"} role="row" className={classes} style={style}>
                            <RowView {...record} />
                        </div>
                }
            </div> : null)}
        </div>
    </div>
}


export { Grid }