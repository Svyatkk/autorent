import { PAGES_URL } from '../../constants/PAGES_URL'
import styles from './styles.module.css'
import { icons } from '../../constants/ICONS'
import { Link } from 'react-router-dom'


export default function NavBar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.nav}>
                <Link to={PAGES_URL.MAIN} className={styles.logo}>
                    RENT
                </Link>

                <div className={styles.links}>
                    <Link to={PAGES_URL.CARS}>Cars</Link>
                    <Link></Link>
                </div>

                <div className={styles.sectionUser}>
                    <span>
                        <icons.language></icons.language>
                    </span>
                    <span>
                        <icons.user></icons.user>
                    </span>

                </div>
            </div>

        </nav>
    )
}