import styles from './styles.module.css'
import { useFilterState } from '../DataFromFilterWrapper'

type Props = {
    active: boolean | false,
    setActive: (active: boolean) => void

}

export default function BlockChangeLang({ active, setActive }: Props) {



    return (
        <div className={`${styles.block} ${active ? styles.active : ''}`}>

        </ div>
    )
}