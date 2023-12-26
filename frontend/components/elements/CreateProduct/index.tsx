
import { createProductFx } from '@/app/api/products'
import styles from '@/styles/admin/createProduct.module.scss'


const CreateProduct = () => {

  
  

  return (
    <form className={styles.form}>
      <h1>
        Создать товар
      </h1>
      <div className={styles.form_item}>
        <input
          //ref={textRef}
          //onChange={handleChangeText}
          //value={newText}
          type='text'
          placeholder='Наименование' />
      </div>

      <div className={styles.form_item}>
      <input
        //ref={textRef}
        //onChange={handleChangeText}
        //value={newText}
        type='text'
        placeholder='Описание' />
      </div>
      <div className={styles.form_item}>
      <input
        //ref={textRef}
        //onChange={handleChangeText}
        //value={newText}
        type='number'
        placeholder='Стоимость' />
      </div>
      <div className={styles.form_item}>
      <input
        //ref={textRef}
        //onChange={handleChangeText}
        //value={newText}
        type='number'
        placeholder='Количество' />
      </div>
      <div className={styles.form_item}>
      <input
        //ref={textRef}
        //onChange={handleChangeText}
        //value={newText}
        type='number'
        placeholder='Рейтинг' />
      </div>
      <button>Создать</button>
    </form>

  )
}

export default CreateProduct