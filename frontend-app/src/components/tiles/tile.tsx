"use client";

import { FunctionComponent } from "react";
import { TileModel } from "../model";
import styles from "./tile.module.css";
import clsx from "clsx";
import Link from "next/link";

const Tile: FunctionComponent<TileModel> = ({
	name,
	primaryStat,
	secondaryStat,
	id,
	active,
}) => {
	const classes = clsx([styles.tile, active ? styles.active : ""]);

	return (
		<Link href={`/home/dashboard/${id}`} style={{ textDecoration: "none" }}>
			<div className={classes} key={id}>
				<h3 className={styles.name}>
					{/* <Link href={`/programs/${id}`}> */}
					{name}
					{/* </Link> */}
				</h3>
				<span className={styles.primary_stat}>{primaryStat}</span>
				<span className={styles.secondary_stat}>{secondaryStat}</span>
			</div>
		</Link>
	);
};

export { Tile };
