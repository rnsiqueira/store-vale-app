"use client"

import { Item, OrderPurchase } from "@/app/domain/store-elements"
import { request } from "@/app/utils/http_build"
import { Toast } from "primereact/toast"
import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"




const Purchase = () => {

    const [pedido, setPedido] = useState<OrderPurchase | null>(null)
    let idOrderSelected: string = "teste"

    const executeInfo = useRef<Toast>(null)


    function MountPedidoInfo() {
        const searchParam = useSearchParams()
        const id: string = searchParam.get("id") || "default"

        idOrderSelected = id

        return (<>
            <div className="flex flex-wrap align-items-center justify-content-center h-screen">

                {pedido?.fullName}
            </div>


        </>)
    }

    useEffect(() => {
        async function findPedido() {

            const getPedido: OrderPurchase = await request.get("/order/id/" + idOrderSelected).then((resp) => { return resp.data })
                .catch((error) => {
                    executeInfo.current?.show({ severity: "error", summary: "Item não existe na base", detail: "Erro ao buscar produto" })
                })

            setPedido(getPedido)
        }

        findPedido()
    }, [])


    return (
        <>
            <Toast ref={executeInfo} />
            <Suspense>
                <MountPedidoInfo />
            </Suspense>
        </>

    )
}

export default Purchase