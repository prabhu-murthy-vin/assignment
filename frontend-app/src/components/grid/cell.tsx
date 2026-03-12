"use client"

import type { CellModel } from "../model";
import type { FunctionComponent } from "react";
import styles from "./cell.module.css"
import clsx from "clsx";
import { isArray, isString } from "@/lib/utils";
import dayjs from "dayjs";

const CellView: FunctionComponent<CellModel> = ({ value, isDateColumn }) => {

    const classes = clsx([styles.cell])

    let cellValue = isArray(value) ? null : value as string;

    const _dayjs = dayjs(value);

    const isDate = isString(cellValue) && _dayjs.isValid() && isDateColumn

    cellValue = isDate ? _dayjs.format("DD/MM/YYYY") : cellValue;

    return <span className={classes}>{cellValue}</span>
}

export { CellView }