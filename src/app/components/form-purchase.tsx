import { useForm } from "react-hook-form";
import { Item, OrderPurchase } from "../domain/store-elements";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from 'react-imask';
import * as z from 'zod';
import { useEffect, useRef, useState } from "react";
import { request } from "../utils/http_build";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { currencyFormatBRL } from "../utils/utils_func";
import { SelectButton } from "primereact/selectbutton";
import { Dropdown } from "primereact/dropdown";

const schema = z.object({
    email: z.string().email({ message: 'Formato do email invalido' }),

});



const FormPurchase = (item: Item) => {

    const [disableButton, setDisableButton] = useState<boolean>(true)
    const priceCalc = item.price - ((item.price * item.weightDiscount) * 0.026)
    const frete: string = "1000"
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    })

    const justifyOptions = [
        { name: 'P', value: 'P' },
        { name: 'M', value: 'M' },
        { name: 'G', value: 'G' },
        { name: 'GG', value: 'GG' }
    ]

    const states = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];


    const [orderBuild, setOrderBuild] = useState({
        itemId: item.itemId,
        fullName: "",
        email: "",
        quantity: 1,
        celNumber: "",
        codeAddress: "",
        address: "",
        addressNumber: "",
        sizeClothing: "",
        colorClothing: "",
        state: "cidade",
        city: "",
        detail: "",
        amount: 0
    })

    const router = useRouter()
    const executeInfo = useRef<Toast>(null)



    async function handlePurchase() {

    

        const orderSaved: OrderPurchase = await request.post("/order/save", orderBuild).then((resp) => {
            executeInfo.current?.show({ severity: "info", summary: "Pedido feito", detail: "Order de pedido cadastrada com sucesso!" })
            return resp.data
        })
            .catch((error) => {
                executeInfo.current?.show({ severity: "warn", summary: "erro no sistema", detail: "Erro ao cadastrar pedido " + error })
            })

        let urlCompra = `https://checkout.infinitepay.io/rafael-das-350?items=[{"name":"${item.itemName}","price":"${priceCalc.toFixed(2).toString().replace(".", "")}","quantity":${orderSaved.quantity}}]&order_nsu=${orderSaved.id}&redirect_url=https://valesolution.solutions/pedido&customer_name=${orderSaved.fullName}&customer_email=${orderSaved.email}&customer_cellphone=${orderSaved.celNumber}`

        if (orderBuild.quantity < 3 && item.partner == "Insider") {
            urlCompra = `https://checkout.infinitepay.io/rafael-das-350?items=[{"name":"${item.itemName}","price":"${priceCalc.toFixed(2).toString().replace(".", "")}","quantity":${orderSaved.quantity}},{"name": "Frete", "price": ${frete}, "quantity": "1"}]&order_nsu=${orderSaved.id}&redirect_url=https://valesolution.solutions/pedido&customer_name=${orderSaved.fullName}&customer_email=${orderSaved.email}&customer_cellphone=${orderSaved.celNumber}`
        }



        router.push(urlCompra)


    }

    useEffect(() => {

        if (orderBuild.address.length > 0 && orderBuild.fullName.length > 0
            && orderBuild.celNumber.length > 0
            && orderBuild.codeAddress.length > 0
            && orderBuild.city.length > 0
            && orderBuild.addressNumber.length > 0
        ) {
            setDisableButton(false)
        }

    })


    return (
        <>
            <Toast ref={executeInfo} />
            <form onSubmit={handleSubmit(handlePurchase)}>
                <div className="grid mt-3">
                    <div className="field col">
                        <label htmlFor="fullName">Nome Completo:</label>
                        <input id="fullName" type="text" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            value={orderBuild.fullName}
                            onChange={(e) => setOrderBuild({ ...orderBuild, fullName: e.target.value })}
                        />
                    </div>
                    <div className="field col">
                        <label htmlFor="email">email:</label>
                        <input id="email" type="email" {...register('email')} placeholder="exemplo@provedor.com" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            onChange={(e) => setOrderBuild({ ...orderBuild, email: e.target.value })} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="flex flex-column lg:w-2">
                        <label htmlFor="phone">Celular:</label>
                        <IMaskInput
                            mask="(00) 00000-0000"
                            definitions={{ 0: /\d/ }}
                            onChange={(el) => {
                                console.log(el.currentTarget.value)
                                setOrderBuild({ ...orderBuild, celNumber: el.currentTarget.value })
                            }}
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary lg:text-center"
                            placeholder="(12) 99999-0000"
                            type="phone"

                        />
                    </div>
                    <div className="flex flex-column lg:w-2">
                        <label htmlFor="adressCode">Cep:</label>
                        <IMaskInput
                            mask="00000-000"
                            definitions={{ 0: /\d/ }}
                            onChange={(el) => {
                                setOrderBuild({ ...orderBuild, codeAddress: el.currentTarget.value })
                            }}
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary lg:text-center"
                            placeholder="12220-000"
                        />

                    </div>
                    <div className="flex flex-column lg:w-4">
                        <label htmlFor="address">Endereço:</label>
                        <input type="text" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            onChange={(e) => setOrderBuild({ ...orderBuild, address: e.target.value })} />

                    </div>
                    <div className="flex flex-column lg:w-4">
                        <label htmlFor="city">Cidade:</label>
                        <input type="text" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            onChange={(e) => setOrderBuild({ ...orderBuild, city: e.target.value })} />

                    </div>
                    <div className="flex flex-column lg:w-1">
                        <label htmlFor="addressNumber">Numero:</label>
                        <input type="number" className=" text-center text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" min={0}
                            onChange={(e) => setOrderBuild({ ...orderBuild, addressNumber: e.target.value })} />
                    </div>
                    <div className="flex flex-column lg:w-1">
                        <label htmlFor="state">UF:</label>
                        <Dropdown value={orderBuild.state} onChange={(e) => setOrderBuild({ ...orderBuild, state: e.value })} options={states} optionLabel="name"
                            placeholder="Estado" className="w-full md:w-14rem" />

                    </div>

                </div>
                <div className="flex flex-wrap mt-2 lg:justify-content-start">

                    <div className="flex lg:w-3 gap-1">
                        <label className="flex mt-5" htmlFor="quantity">Quantidade:</label>
                        <input type="number" className="mt-4 text-center text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary sm:w-4 lg:w-4 h-2rem" min={1} value={orderBuild.quantity}
                            onChange={(e) => setOrderBuild({ ...orderBuild, quantity: Number(e.target.value), amount: Number((priceCalc * Number(e.target.value)).toFixed(2)) })} />
                    </div>


                    {(item.partner == "Insider")
                        &&
                        <>
                            <div className="flex flex-column p-2">
                                <label className="flex" htmlFor="color">cor: {orderBuild.colorClothing}</label>
                                <div className="flex flex-row mt-1 gap-2">
                                    <button type="button" className="flex border-circle" id="color1" onClick={() => { setOrderBuild({ ...orderBuild, colorClothing: "Carmenere" }) }} style={{ width: '1.5rem', height: '1.5rem', background: '#570d0d' }} />
                                    <button type="button" className="flex border-circle" id="color2" onClick={() => { setOrderBuild({ ...orderBuild, colorClothing: "Milk" }) }} style={{ width: '1.5rem', height: '1.5rem', background: '#f5f5f5' }} />
                                    <button type="button" className="flex border-circle" id="color3" onClick={() => { setOrderBuild({ ...orderBuild, colorClothing: "Preta" }) }} style={{ width: '1.5rem', height: '1.5rem', background: 'black' }} />
                                    <button type="button" className="flex border-circle" id="color4" onClick={() => { setOrderBuild({ ...orderBuild, colorClothing: "Azul" }) }} style={{ width: '1.5rem', height: '1.5rem', background: '#171963' }} />
                                    <button type="button" className="flex border-circle" id="color5" onClick={() => { setOrderBuild({ ...orderBuild, colorClothing: "Red Spice" }) }} style={{ width: '1.5rem', height: '1.5rem', background: '#c23c3a' }} />
                                </div>

                            </div>
                            <div className="flex flex-column">
                                <label className="flex" htmlFor="size">Tamanho:</label>
                                <SelectButton className="flex sm:h-2rem mt-1" value={orderBuild.sizeClothing} onChange={(e) => setOrderBuild({ ...orderBuild, sizeClothing: e.value })} optionLabel="name" options={justifyOptions} />

                            </div>
                        </>}





                    <div className="flex flex-column p-2 mt-2 ml-2">
                        <label className="flex font-bold" htmlFor="price">Preço:</label>
                        {currencyFormatBRL(priceCalc * orderBuild.quantity)}
                    </div>

                </div>
                <div className="flex justify-content-end mt-3 p-1">
                    <Button type="submit" className="flex text-center border-round-2xl" disabled={disableButton} icon="pi pi-barcode" id="payment" label="Gerar Pagamento" />
                </div>
            </form>

        </>
    )
}

export default FormPurchase