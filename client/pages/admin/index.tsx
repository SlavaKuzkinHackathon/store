import { Tabs } from "antd";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RouteNames } from "../../routes";
import styles from "./Admin.module.scss";
import { IProduct } from "../../interfaces";
import classNames from "classnames";
import Section from "@/components/UI/Section";
import Button from "@/components/UI/Button";
import { ProductAsyncActionCreators } from "@/store/asyncActionCreators/product";
import { CatalogAsyncActionCreators } from "@/store/asyncActionCreators/catalog";

export default function AdminPage(): JSX.Element {
  const [productInfos, setProductInfos] = useState<
    { id: number; title: string; description: string }[]
  >([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [selectedCatalogId, setSelectedCatalogId] = useState<number>(0);
  const { isAdmin, isLogged } = useAppSelector((state) => state.user);
  const { catalogList } = useAppSelector((state) => state.catalog);
  const { removedProductsList } = useAppSelector((state) => state.products);

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
  const validationAddCatalogSchema = yup.object().shape({
    catalog: yup.string().required("Введите имя каталога"),
  });
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

  return (
      <div>
        <h1>Admin</h1>
      </div>
  );
}
