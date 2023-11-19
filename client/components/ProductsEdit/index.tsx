import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import IProduct from '@/interfaces/IProduct';

interface ProductsEditProps {
    pageId: string | string[] | undefined;
}

const ProductsEdit: React.FC<ProductsEditProps> = ({ pageId }) => {


    const initialProduct = {
        name: '',
        price: 0,
        image: '',
        brand: '',
        category: '',
        numReviews: 0,
        countInStock: 0,
        description: '',
    };

  
    const [uploading, setUploading] = useState<boolean>(false);

    const [productDetails, setDetails] =
        useState<Partial<IProduct>>(initialProduct);

    useEffect(() => {
        
    }, []);

    useEffect(() => {
    }, []);



   

    return (
        <>
            <Link href={'/admin/products'} passHref>
                <button>назад</button>
            </Link>
            <form>
                <h1>Изменить карточку товара</h1>

                <form >
                    <div>
                        <input name="original.Id" value="@Model?.Id" type="hidden" />
                        <input name="original.Category" value="@Model?.Category" type="hidden" />
                        <input name="original.Name" value="@Model?.Name" type="hidden" />
                        <input name="original.Price" value="@Model?.Price" type="hidden" />
                        <input name="original.InQuantity" value="@Model?.InQuantity" type="hidden" />
                        <input name="original.NameImage" value="@Model?.NameImage" type="hidden" />
                        <div>
                            <label asp-for="Category"></label>
                            <select>

                            </select>
                        </div>
                        <div>
                            <label></label>
                            <input />
                        </div>
                        <div >
                            <label ></label>
                            <input />
                        </div>
                        <div>
                            <label></label>
                            <input />
                        </div>
                        <div>
                            <input /><br />
                        </div>
                        <div>
                            <button>Сохранить</button>
                            <a >Отмена</a>
                        </div>
                    </div>
                </form>
            </form>
        </>
    )
}

export default ProductsEdit;