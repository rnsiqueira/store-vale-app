"use client"

import { Item } from "@/app/domain/store-elements"
import { request } from "@/app/utils/http_build"
import { useSearchParams } from "next/navigation"
import { Toast } from "primereact/toast"
import { Suspense, useEffect, useRef, useState } from "react"
import { Image } from "primereact/image"
import FormPurchase from "@/app/components/form-purchase"




const CheckOutItem = () => {

    const [itemSelected, setItemSelected] = useState<Item | null>(null)
    let idSelected: string
    const icon = (<i className="pi pi-search"></i>)
    const executeInfo = useRef<Toast>(null)



    function MountCheckOut() {
        const searchParam = useSearchParams()
        const id: string = searchParam.get("id") || "default"

        idSelected = id

        return (<>
            <div className="flex flex-wrap align-items-center justify-content-center h-screen">
                <div className="flex flex-column border-round border-1 border-rounded border-500 p-4 lg:w-6 sm:w-12 md:w-7 mt-2">
                    <div className="card flex justify-content-center">
                        <Image src={itemSelected?.pathImage.split(",")[0]} indicatorIcon={icon} alt="Image" preview width="250" />
                    </div>
                    <div className="flex justify-content-center">
                        <h3 className="font-bold">{itemSelected?.itemName}</h3>
                    </div>
                    <div className="flex justify-content-center justify-items-center">
                        <div className="surface-overlay border-round shadow-1 p-5 py-0 m-3 sm:w-full lg:w-9">
                            <p className="text-left">{itemSelected?.description}</p>
                        </div>

                    </div>
                    <FormPurchase key={itemSelected?.id} {...itemSelected!} />

                    <div className="mt-5 md:w-4">
                        <p className="m-0 text-start">
                            Você pode entrar em contato com vendedor via <a target="_blank" className="font-bold text-primary-800" href="https://wa.me/5511987544581">whatssap</a> para tirar suas dúvidas.
                        </p>
                    </div>

                </div>


            </div>


        </>)
    }

    useEffect(() => {
        async function takeItemToPurchase() {

            const getItem: Item = await request.get("/item/id/" + idSelected).then((resp) => { return resp.data })
                .catch((error) => {
                    executeInfo.current?.show({ severity: "error", summary: "Item não existe na base", detail: "Erro ao buscar produto" })
                })

            setItemSelected(getItem)
        }

        takeItemToPurchase()
    }, [])

    return (
        <>
            <Toast ref={executeInfo} />
            <Suspense>
                <MountCheckOut />
            </Suspense>

        </>

    )
}

export default CheckOutItem