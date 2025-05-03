"use client"
import { PartnerWeightDiscount } from "@/app/domain/store-elements";
import { request } from "@/app/utils/http_build";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

export default function TablePartner(partner: any) {

    const [discountPartiner, setDiscountPartiner] = useState<PartnerWeightDiscount>(partner)
    const infoDiscount: any = useRef<Toast>(null)

    const route = useRouter()

    function handleDiscount(discount: PartnerWeightDiscount) {
        request.post("item/partner/discount", discount).then(() => {
            infoDiscount.current?.show({ severity: "info", summary: "Sucesso", detail: "Desconto alterado com sucesso!" })
            route.push("/admin")
        }
        ).catch(error => {
            infoDiscount.current?.show({ severity: "error", summary: "Erro", detail: "Erro na alteração" + error })
        })
    }

    return (
        <>
            <Toast ref={infoDiscount} />
            <div className="flex p-1 gap-3 mt-1">
                <label className="felx mt-2" htmlFor="partner">{discountPartiner.partner}</label>
                <InputNumber value={discountPartiner.weightDiscount} onChange={(e) => setDiscountPartiner({ ...discountPartiner, weightDiscount: e.value! })} />
                <InputText value={discountPartiner.expiresAt} onChange={(e) => setDiscountPartiner({ ...discountPartiner, expiresAt: e.target.value })} />
                <Button label="Aplicar" onClick={() => handleDiscount(discountPartiner)} />
            </div>
        </>
    )

}