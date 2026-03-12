import type { SlateModel } from "@/models/slate";
import type { FunctionComponent } from "react";
import styles from "./slate.module.css";
import dayjs from "dayjs";
import clsx from "clsx";

const Slate: FunctionComponent<SlateModel> = ({
	primaryStat,
	primaryStatText,
	dates,
	personnel,
	status,
}) => {
	return (
		<section className={styles.container}>
			<div className={styles.section_1}>
				<span className={clsx([styles.primaryStatText, styles.title])}>
					{primaryStatText}
				</span>
				<span className={clsx([styles.primary_stat, styles.value])}>
					{primaryStat}
				</span>
			</div>

			<div className={clsx([styles.section_2, styles.dates])}>
				<span className={styles.date}>
					<span className={clsx([styles.start_date, styles.title])}>
						Start Date
					</span>
					<span className={clsx([styles.value_med])}>
						{dayjs(dates.startDate).format("DD/MM/YYYY")}
					</span>
				</span>

				<span className={styles.date}>
					<span className={clsx([styles.end_date, styles.title])}>
						End Date
					</span>
					<span className={clsx([styles.value_med])}>
						{dayjs(dates.endDate).format("DD/MM/YYYY")}
					</span>
				</span>
			</div>

			<div className={styles.section_3}>
				<span className={styles.title}>Status</span>
				<span className={clsx([styles.status, styles.value_med])}>
					{status}
				</span>
			</div>

			<div className={styles.section_3}>
				<span className={styles.title}>Manager</span>
				<span className={clsx([styles.personnel, styles.value_med])}>
					{personnel}
				</span>
			</div>
		</section>
	);
};

export { Slate };
