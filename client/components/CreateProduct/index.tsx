
import { useAppDispatch, useAppSelector } from '@/hooks'
import Button from '@/components/UI/Button/index'
import * as yup from 'yup'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import styles from '@/styles/admin/Admin.module.scss'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { RouteNames } from '@/routes'
import { ProductAsyncActionCreators } from '@/store/asyncActionCreators/product'
import { IProduct } from '@/interfaces'
import classNames from "classnames";


const CreateProduct = (): JSX.Element => {
    const [productInfos, setProductInfos] = useState<
    { id: number; title: string; description: string }[]
  >([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [selectedCatalogId, setSelectedCatalogId] = useState<number>(0);
  const { isAdmin, isLogged } = useAppSelector((state) => state.user);
  const { catalogList } = useAppSelector((state) => state.catalog);

  const dispatch = useAppDispatch();
  const { push } = useRouter();

  useEffect(() => {
    if (!isLogged && !isAdmin) {
      push(RouteNames.HOST);
    }
    if (selectedCatalogId > 0) {
      dispatch(
        ProductAsyncActionCreators.fetchAllProductsFromCatalog(
          selectedCatalogId
        )
      );
    }
  }, [selectedCatalogId, isLogged, isAdmin]);

  const addProductInfo = () => {
    setProductInfos([
      ...productInfos,
      { id: Date.now(), title: "", description: "" },
    ]);
  };


    const validationRemoveProductSchema = yup.object().shape({
        catalogId: yup.number().min(1, "Выберите каталог"),
        productId: yup.number().min(1, "Выберите товар"),
      });
      const validationAddProductSchema = yup.object().shape({
        catalogId: yup.number().min(1, "Выберите каталог"),
        name: yup.string().required("Введите название товара"),
        price: yup
          .number()
          .positive("Цена не может быть отрицательной")
          .required("Введите цену товара"),
      });
    return(
        <div>
            <Formik
              initialValues={{
                id: 0,
                name: '',
                price: 0,
                image: '',
                catalogId: 0,
                amount: 0,
                productInfo: [],
                rating: 0,
              }}
              validateOnBlur
              validationSchema={validationAddProductSchema}
              onSubmit={(values, formikHelpers: FormikHelpers<IProduct>) => {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("price", values.price.toString());
                formData.append("info", JSON.stringify(productInfos));
                formData.append("catalogId", values.catalogId.toString());
                formData.append("image", imageFile);
                dispatch(ProductAsyncActionCreators.createProduct(formData));
                formikHelpers.resetForm();
                setImageFile(null);
                setProductInfos([]);
                formikHelpers.setSubmitting(false);
              }}
            >
              {({
                handleChange,
                handleBlur,
                touched,
                errors,
                values,
                isSubmitting,
              }: FormikProps<IProduct>) => (
                <Form className={styles.form}>
                  <div className={styles.warning}>
                    {errors.catalogId && touched.catalogId && errors.catalogId}
                  </div>
                  <label>
                    <span className={styles.label}>Каталог:</span>
                    <Field
                      className={styles.input}
                      name={"catalogId"}
                      as="select"
                    >
                      <option value={0} disabled>
                        Выберите каталог
                      </option>
                      {catalogList.map((item) => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </Field>
                  </label>
                  <div className={styles.warning}>
                    {errors.name && touched.name && errors.name}
                  </div>
                  <label>
                    <span className={styles.label}>Название товара:</span>
                    <Field
                      className={styles.input}
                      type={`text`}
                      name={`name`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      placeholder={"Введите название"}
                    />
                  </label>
                  <div className={styles.warning}>
                    {errors.price && touched.price && errors.price}
                  </div>
                  <label>
                    <span className={styles.label}>Цена (руб.):</span>
                    <Field
                      className={classNames(styles.input, styles.price)}
                      type={`number`}
                      name={`price`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      placeholder={"Введите цену"}
                    />
                  </label>
                  <label className={styles.labelImage}>
                    <span className={styles.label}>Изображение:</span>
                    <Field
                      className={styles.image}
                      type={`file`}
                      name={`image`}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setImageFile(e.target.files[0]);
                      }}
                      onBlur={handleBlur}
                      accept=".jpeg,.png,.jpg"
                    />
                  </label>
                  {productInfos.length > 0 &&
                    productInfos.map((info) => {
                      return (
                        <div key={info.id} className={styles.info}>
                          <label>
                            <span className={styles.label}>Название:</span>
                            <Field
                              className={styles.input}
                              type={`text`}
                              name={`title`}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const changedProductInfos =
                                  productInfos.slice();
                                changedProductInfos.forEach((item) => {
                                  if (item.id === info.id) {
                                    item.title = e.target.value;
                                  }
                                });
                                setProductInfos(changedProductInfos);
                              }}
                              value={
                                productInfos[
                                  productInfos.findIndex(
                                    (item) => item.id === info.id
                                  )
                                ].title
                              }
                            />
                          </label>
                          <label className={styles.description}>
                            <span className={styles.label}>Описание:</span>
                            <Field
                              className={styles.input}
                              type={`text`}
                              name={`description`}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const changedProductInfos =
                                  productInfos.slice();
                                changedProductInfos.forEach((item) => {
                                  if (item.id === info.id) {
                                    item.description = e.target.value;
                                  }
                                });
                                setProductInfos(changedProductInfos);
                              }}
                              value={
                                productInfos[
                                  productInfos.findIndex(
                                    (item) => item.id === info.id
                                  )
                                ].description
                              }
                            />
                          </label>
                          <span
                            onClick={() => {
                              setProductInfos(
                                productInfos.filter(
                                  (item) => item.id !== info.id
                                )
                              );
                            }}
                            className={styles.warning}
                          >
                            Удалить
                          </span>
                        </div>
                      );
                    })}
                  <div className="buttonBox">
                    <button
                      className={styles.addInfoButton}
                      type="button"
                      onClick={addProductInfo}
                    >
                      + Характеристика
                    </button>
                  </div>
                  <div className="buttonBox">
                    <Button type="submit" disabled={isSubmitting}>
                      + Добавить товар
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
        </div>
    )
}

export default CreateProduct
