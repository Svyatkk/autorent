import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar' // твій майбутній або поточний компонент шапки
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app_layout}>
      <Navbar />

      <main className={styles.main_content}>
        <Outlet />

      </main>

    </div>
  )
}

export default App