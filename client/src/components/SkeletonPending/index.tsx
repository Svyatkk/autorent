import styles from './styles.module.css'
import { SKELETON_ROWS } from '../../constants/CALENDAR'

type Props = {
    rows?: number
    columns: number
}

export default function SkeletonPending({ rows = SKELETON_ROWS, columns }: Props) {
    return (
        <>


            {Array.from({ length: rows }).map((_, i) => (
                <tr key={i}>
                    <td className={styles.stickyCell}>
                        <div className={styles.bar} />
                    </td>
                    {Array.from({ length: columns }).map((_, j) => (
                        <td key={j} className={styles.cell} />
                    ))}
                </tr>
            ))}
        </>
    )
}
