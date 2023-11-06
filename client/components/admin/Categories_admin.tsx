import styles from '@/styles/admin/Categories_admin.module.scss';
import { useState, useEffect } from 'react';
import Input from '@/components/UI/Inputs/Inputs';
import axios from 'axios';
//import Loader from '../Loader';



const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [inputsData, setInputsData] = useState({ title: '', link: '' });
/* 
  useEffect(() => {
    renderCategories()
  }, []); */

  useEffect(() => {
    if (!Object.values(inputsData).includes('')) {
      setIsButtonDisabled(false)
    } else setIsButtonDisabled(true)
  }, [inputsData]);

/*   const renderCategories = async () => {
    const categories = await axios.get('/api/routes/categories');
    setCategories(categories.data.data.reverse())
  } */

  const handleInput = (e: { target: { name: any; value: any; }; }) => {
    setInputsData({ ...inputsData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: { preventDefault: () => void; target: { reset: () => void; }; }) => {
    e.preventDefault();
    setIsLoading(true)

    const config = {
      headers: { 'content-type': 'application/json' },
      onUploadProgress: (event: { loaded: number; total: number; }) => {
        console.log(`Процент загрузки:`, Math.round((event.loaded * 100) / event.total));
      },
    };

    //const response = await axios.post('/api/routes/categories', inputsData, config);

    setIsLoading(false);
    setInputsData({ title: '', link: '' });
    e.target.reset();

    //renderCategories();
  }

  /* const deleteCat = async (category) => {
    await axios.delete(`/api/routes/categories/${category._id}`);
    renderCategories();
  } */



  return (
    <>
      <form className={styles.addcat} action="submit" encType="multipart/form-data" /* onSubmit={handleSubmit} */>
        <p className={styles.addcat_title}>Создать категорию</p>
        <Input /* onChange={(e) => handleInput(e)} */ /* value={inputsData.title || ''} */ type="text" /* name='title' */ placeholder='Название*' /* required='true'  *//>
        <Input /* onChange={(e) => handleInput(e)} value={inputsData.link || ''} */ type="text" /* name='link' */ placeholder='Ссылка после /*' /* required='true' */ />
        <button type='submit' disabled={isButtonDisabled || isLoading} className={styles.button_add}>{isLoading ? "Загрузка..." : "Создать"}</button>
      </form>

      <ul className={styles.categoriestList}>

       {/*  {categories.length === 0
          ? <Loader />
          : categories.map(cat => ( */}

            <li /* key={cat._id} */ className={styles.category}>
              <h3 className={styles.name}>{/* {cat.title} */}</h3>
              <p className={styles.text}>{/* {cat.link} */}</p>
              <button className={styles.button_delete} /* onClick={() => deleteCat(cat)} */>удалить</button>
            </li>

         {/*  ))} */}

      </ul>
    </>
  )
}

export default CategoriesAdmin