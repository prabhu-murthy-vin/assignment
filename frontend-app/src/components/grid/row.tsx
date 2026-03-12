"use client";

import type { RowModel } from "../model";
import type { FunctionComponent } from "react";
import { CellView } from "./cell";
import { nanoid } from "nanoid";
import styles from "./cell.module.css";

const RowView: FunctionComponent<RowModel> = (record) => {
	const _key = `${nanoid}_cell`;

	const _id = Object.keys(record)[0];

	const recordData = record[_id];

	const canRender = (val: any) =>
		typeof val === "string" || typeof val === "number";

	return (
		<>
			{Object.keys(recordData).map((cell, index) => (
				<div role="cell" key={`${_key}_${index}`} className={styles.cell}>
					{canRender(recordData[cell]) ? (
						<CellView
							value={recordData[cell]}
							isDateColumn={/date/gi.test(cell)}
						/>
					) : null}
				</div>
			))}
		</>
	);
};

export { RowView };
