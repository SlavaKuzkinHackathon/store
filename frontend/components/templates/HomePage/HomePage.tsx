import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/dashboard/index.module.scss'
import DivansSlider from '@/components/modules/HomePage/DivansSlider'



const HomePage = () => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <section className={styles.dashboard}>
            <div className={`container ${styles.dashboard__container}`}>
                <div className={styles.dashboard__brands}>
                    <DivansSlider/>
                </div>
            </div>
        </section>
    )
}
export default HomePage