import Link from "next/link"
import styles from "./header.module.css"

export default function Header() {
    return <header className={styles.header}>
        <h2 role="img" className={styles.logo}>
            <Link href="/home/dashboard">
                Drug discovery dashboard
            </Link>
        </h2>
        <div className={styles.links}>
            <Link href="/home/dashboard/programs">All Programs</Link>
            <Link href="/home/dashboard/studies">All Studies</Link>
            <Link href="/home/dashboard/milestones">All Milestones</Link>
        </div>
    </header>
}