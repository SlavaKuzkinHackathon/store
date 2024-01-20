import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/dashboard/index.module.scss'
import DivansSlider from '@/components/modules/HomePage/DivansSlider'
import { useState } from 'react'
import { IProduct } from '@/types/product'



const HomePage = () => {
    const [newDivans, setNewDivans] = useState<IProduct[]>([])
    const [bestellers, setBestellers] = useState<IProduct[]>([])

    const loadDivans =async () => {
        
    }


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