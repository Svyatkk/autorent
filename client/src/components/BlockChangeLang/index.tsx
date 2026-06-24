import { useEffect, useState } from 'react'
import { apiClient } from '../../api/config'
import styles from './styles.module.css'

type Language = {
    code: string
    name: string
}

type Props = {
    active: boolean
    setActive: (active: boolean) => void
}

export default function BlockChangeLang({ active, setActive }: Props) {
    const [languages, setLanguages] = useState<Language[]>([])
    const currentLang = localStorage.getItem('app_lang') || 'en'

    useEffect(() => {
        apiClient.get<Language[]>('/languages')
            .then(res => setLanguages(res.data))
            .catch(() => {
                setLanguages([
                    { code: 'en', name: 'English' },
                    { code: 'ru', name: 'Русский' },
                    { code: 'de', name: 'Deutsch' },
                ])
            })
    }, [])

    const handleSelect = (code: string) => {
        localStorage.setItem('app_lang', code)
        setActive(false)
        window.location.reload()
    }

    return (
        <div className={`${styles.block} ${active ? styles.active : ''}`}>
            {languages.map((lang) => (
                <div
                    key={lang.code}
                    className={`${styles.langItem} ${currentLang === lang.code ? styles.selected : ''}`}
                    onClick={() => handleSelect(lang.code)}
                >                    {lang.name}
                </div>
            ))}
        </div>
    )
}