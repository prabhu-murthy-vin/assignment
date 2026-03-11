"use client"

import { FunctionComponent } from "react";
import { CellModel } from "../model";
import styles from "./cell.module.css"
import clsx from "clsx";
import { isArray, isString } from "@/lib/utils";
import dayjs, { Dayjs } from "dayjs";

const CellView: FunctionComponent<CellModel> = ({ type, value, isDateColumn }) => {

    const classes = clsx([styles.cell])

    let cellValue = isArray(value) ? null : value as string;

    let _dayjs = dayjs(value);

    let isDate = isString(cellValue) && _dayjs.isValid() && isDateColumn

    cellValue = isDate ? _dayjs.format("DD/MM/YYYY") : cellValue;

    return <>
        <span className={classes}>{cellValue}</span>
    </>
}

export { CellView }