import { PAGES_URL } from '../../constants/PAGES_URL'
import styles from './styles.module.css'
import { icons } from '../../constants/ICONS'
import { Link } from 'react-router-dom'
import BlockChangeLang from '../BlockChangeLang'
import { useState } from 'react'

export default function NavBar() {

    const [activeModal, setactiveModal] = useState<boolean | false>(false)
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
                    <span onClick={() => setactiveModal(prev => !prev)} className={styles.userReact}>
                        <icons.language></icons.language>
                        <BlockChangeLang active={activeModal} setActive={setactiveModal}></BlockChangeLang>
                    </span>

                </div>
            </div>

        </nav >
    )
}