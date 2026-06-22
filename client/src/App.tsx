import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import styles from './App.module.css'
import BlockChangeLang from './components/BlockChangeLang'

function App() {
  return (
    <div className={styles.app_layout}>
      <Navbar>
      </Navbar>

      <main className={styles.main_content}>
        <Outlet />

      </main>

    </div>
  )
}

export default App