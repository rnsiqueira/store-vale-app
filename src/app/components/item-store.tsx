"use client"

import { Item } from "../domain/store-elements";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { currencyFormatBRL } from "@/app/utils/utils_func";

import { useRouter } from "next/navigation";
import { Galleria } from "primereact/galleria";




const ItemStore = (item: Item) => {


    const router = useRouter()

    const priceCalc = item.price - ((item.price * item.weightDiscount) * 0.026)
    const gain = (item.price - priceCalc)

    

    const [images, setImages] = useState<any[]>([]);
    
    useEffect(() => {
        let imageNum = 1
        const imagesList: String[] = item.pathImage.split(",")
        const imagesFormatter: any[] = [];

        imagesList.map((i) => {
            imagesFormatter.push({
                itemImageSrc: i,
                thumbnailImageSrc: i,
                alt: imageNum,
                title: imageNum
            })
            imageNum++
        })

        setImages(imagesFormatter)

        
    }, []);

    const itemTemplate = (image: any) => {
        return <img src={image.itemImageSrc} alt={image.alt} style={{ width: '100%', display: 'block' }} />;
    };

    const thumbnailTemplate = (image: any) => {
        return <img src={image.thumbnailImageSrc} alt={image.alt} style={{ display: 'block' }} />;
    }

    function itemCheckOut() {
        router.push(`/item?id=${item.id}`)
    }

    const footer = (
        <>
            <div className="flex flex-row sm:w-full justify-content-center">
                <Button className="sm:w-11 border-round-2xl" label="Comprar agora" icon="pi pi-info-circle" onClick={() => itemCheckOut()} />

            </div>
        </>
    );

    return (
        <>

            <div className="flex flex-wrap border-1 border-round p-2" style={{ width: "300px", height: "580px" }}>
                <div className="flex justify-content-center sm:w-full">
                    <Galleria
                        value={images}
                        numVisible={5}
                        circular
                        showThumbnails={false}
                        thumbnail={thumbnailTemplate}
                        showItemNavigators
                        item={itemTemplate}
                        style={{ width: "270px" }}
                    />
                </div>
                <div className="flex flex-row sm:w-full">
                    <h3 className="text-color">{item.itemName}</h3>
                </div>
                <div className="white-space-nowrap overflow-hidden text-overflow-ellipsis" style={{ width: "250px" }}>
                    {item.description}
                </div>
                <div className="flex flex-row justify-content-end sm:w-full">
                    <p className="font-bold">Até: {item.expiresAt}</p>
                </div>
                <div className="flex flex-row justify-content-end sm:w-full gap-2">
                    <div className="flex sm:w-full gap-2 justify-content-end">
                        <p className="text-blue-600 align-content-center font-bold">{currencyFormatBRL(priceCalc)}</p>
                        <a href={item.partnerLink} target="_blank" className="text-color align-content-center">{item.partner} {currencyFormatBRL(item.price)}</a>
                    </div>
                </div>
                <div className="flex justify-content-end sm:w-full">
                    <div className="flex sm:w-full justify-content-end">
                        <p className="text-red-600 font-bold"> - {currencyFormatBRL(gain)}</p>
                    </div>
                </div>
                <div className="flex justify-content-end sm:w-full">
                    {footer}
                </div>


            </div>

        </>
    )

}

export default ItemStore;