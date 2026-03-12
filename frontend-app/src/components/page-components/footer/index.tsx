import styles from "./footer.module.css";

export default function () {
	return (
		<footer className={styles.footer}>
			Merck LTD {`${new Date().getFullYear()} @ all coprights reservered.`}
		</footer>
	);
}
