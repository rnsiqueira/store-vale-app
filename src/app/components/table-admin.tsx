"use client"

import { Item, OrderPurchase, Stripe } from "@/app/domain/store-elements"
import { request } from "@/app/utils/http_build"
import { useRouter } from "next/navigation"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton"
import { TabPanel, TabView } from "primereact/tabview"
import { useState } from "react"
import TablePartner from "./table-partners"



const TableAdmin = ({ orderDatails = [{}], itens = [{}], partners = [{}], stripes = [{}] }) => {


    /* table
1 - purchase
2 - itens
3 - partners
*/

    const route = useRouter()

    const [table, setTable] = useState(1)
    const [itemSelected, setItemSelected] = useState<Item | null>(null)
    const [stripe, setStripe] = useState({url: "", descriptName: "", image: "" })
    const [orderSelected, setOrderSelected] = useState<OrderPurchase | null>(null)

    function handleItem(item: Item) {
        request.put("item/update", item)
        setItemSelected(null)
        route.push("/admin")
    }

    function handleOrder(status: string) {
        request.patch("order/update/status", {
            "id": orderSelected?.id,
            "status": status
        }).then(resp => {
            setOrderSelected(null)
            route.push("/admin")
        }).catch(error => console.log(error))
    }

    function handleStriper(stripe: any) {

        request.post("item/stripe/save", stripe)
        route.push("/admin")

        
    }






    return (<>

        <div className="flex flex-row p-4 sm:w-full justify-content-start col-offset-1 gap-3">
            <Button className="flex border-round-bottom-md" label="Pedidos" onClick={() => setTable(1)} />
            <Button className="flex border-round-bottom-md" label="Itens" onClick={() => setTable(2)} />
            <Button className="flex border-round-bottom-md" label="Desconto de parceiros" onClick={() => setTable(3)} />
            <Button className="flex border-round-bottom-md" label="links Stripe" onClick={() => setTable(4)} />
        </div>
        <TabView>
            <TabPanel visible={table === 1} header="Pedidos">
                <div className="flex flex-wrap card justify-content-center gap-2">
                    <div className="flex flex-row gap-2 justify-content-end sm:w-full">
                        <Button className="flex" disabled={orderSelected?.status !== "PENDENTE"} label="Pagar" onClick={() => handleOrder("PAGO")} />
                        <Button className="flex" disabled={orderSelected?.status !== "PAGO"} label="Comprado" onClick={() => handleOrder("EM ANDAMENTO")} />
                        <Button className="flex" disabled={orderSelected?.status !== "EM ANDAMENTO"} label="FINALIZAR" onClick={() => handleOrder("CONCLUIDO")} />
                    </div>
                    <DataTable className="flex mt-3" value={orderDatails} stripedRows selection={orderSelected!} selectionMode={setOrderSelected! ? undefined : 'single'} onSelectionChange={(e: any) => setOrderSelected(e.value)} dataKey={"id"} tableStyle={{ minWidth: '50rem' }}>
                        <Column selectionMode="single" headerStyle={{ width: '1%' }}></Column>
                        <Column field="id" header="Código" style={{ width: '5%' }}></Column>
                        <Column field="fullName" header="Cliente" style={{ width: '10%' }}></Column>
                        <Column field="celNumber" header="Celular"></Column>
                        <Column field="email" header="email:"></Column>
                        <Column field="codeAddress" header="cep:"></Column>
                        <Column field="address" header="end:"></Column>
                        <Column field="addressNumber" header="numero:" style={{ width: '2%' }}></Column>
                        <Column field="itemId" header="Codigo Item" style={{ width: '2%' }}></Column>
                        <Column field="sizeClothing" header="tamanho" style={{ width: '2%' }}></Column>
                        <Column field="colorClothing" header="cor" style={{ width: '3%' }}></Column>
                        <Column field="city" header="Cidade"></Column>
                        <Column field="amount" header="valor total"></Column>
                        <Column field="status" header="status"></Column>

                    </DataTable>
                </div>
            </TabPanel>
        </TabView >
        <TabView>
            <TabPanel className="flex flex-row gap-5" visible={table === 2} header="Itens">
                <div className="flex card justify-content-start">
                    <DataTable className="flex mt-3" value={itens} stripedRows selection={itemSelected!} selectionMode={setItemSelected! ? undefined : 'single'} onSelectionChange={(e: any) => setItemSelected(e.value)} dataKey={"id"} tableStyle={{ minWidth: '50rem' }}>
                        <Column selectionMode="single" header="Editar" headerStyle={{ width: '1%' }}></Column>
                        <Column field="itemId" header="Item" style={{ width: '1%' }}></Column>
                        <Column field="partner" header="Parceiro" style={{ width: '2%' }}></Column>
                        <Column field="itemName" header="Produto" style={{ width: '2%' }}></Column>
                        <Column field="price" header="Preço:" style={{ width: '2%' }}></Column>
                        <Column field="expiresAt" header="Validade" style={{ width: '3%' }}></Column>
                        <Column field="active" header="Ativo:" style={{ width: '2%' }}></Column>
                        <Column field="pathImage" header="imagens" style={{ width: '2%' }}></Column>
                    </DataTable>
                </div>
                <div className="w-3 border-2 ml-4 justify-content-start h-20rem">
                    <div className="flex flex-row gap-2 p-2 sm:w-full justify-content-start">
                        <label className="flex mt-2" htmlFor="itemName">Nome do item:</label>
                        <InputText className="flex sm:h-2rem" id="itemName" value={itemSelected?.itemName} onChange={(e) => setItemSelected({ ...itemSelected!, itemName: e.target.value })} />
                    </div>
                    <div className="flex flex-row gap-2 p-2 sm:w-full justify-content-start">
                        <label className="flex mt-2" htmlFor="partner">Parceiro:</label>
                        <InputText className="flex sm:h-2rem" id="partner" value={itemSelected?.partner} onChange={(e) => setItemSelected({ ...itemSelected!, partner: e.target.value })} />
                    </div>
                    <div className="flex flex-row gap-2 p-2 sm:w-full justify-content-start">
                        <label className="flex mt-2" htmlFor="price">Preço:</label>
                        <InputNumber className="flex sm:h-2rem" id="price" value={itemSelected?.price} onChange={(e) => setItemSelected({ ...itemSelected!, price: e.value! })} />
                    </div>
                    <div className="flex flex-row gap-2 p-2 sm:w-full justify-content-start">
                        <label className="flex mt-2" htmlFor="expiresAt">Validade:</label>
                        <InputText className="flex sm:h-2rem text-center" id="partner" value={itemSelected?.expiresAt} onChange={(e) => setItemSelected({ ...itemSelected!, expiresAt: e.target.value })} />
                    </div>
                    <div className="flex flex-row gap-2 p-2 sm:w-full justify-content-start">
                        <label className="flex mt-2" htmlFor="pathImage">Imagens:</label>
                        <InputText className="flex sm:h-2rem" id="pathImage" value={itemSelected?.pathImage} onChange={(e) => setItemSelected({ ...itemSelected!, pathImage: e.target.value })} />
                    </div>
                    <div className="flex flex-row gap-4 p-2 sm:w-full justify-content-center">
                        <SelectButton className="flex ml-2" value={itemSelected?.active ? "Ativo" : "Desativado"} onChange={(e: SelectButtonChangeEvent) => setItemSelected({ ...itemSelected!, active: e.value === "Ativo" ? true : false })} options={["Desativado", "Ativo"]} />
                        <Button label="Editar" onClick={() => handleItem(itemSelected!)} />
                    </div>
                </div>
            </TabPanel>

        </TabView>

        <TabView>
            <TabPanel className="flex flex-row gap-3" visible={table === 3} header="Parceiros">

                <div className="flex flex-column">
                    {partners.map(pw => <TablePartner key={partners.indexOf(pw)} dataKey {...pw} />)}
                </div>


            </TabPanel>
            <TabPanel className="flex flex-row gap-3" visible={table === 4} header="Stripe">

            <div className="flex card justify-content-start">
                    <DataTable className="flex mt-3" value={stripes} stripedRows tableStyle={{ minWidth: '50rem' }}>
                        <Column field="url" header="URL-Stripe" style={{ width: '1%' }}></Column>
                        <Column field="descriptName" header="Descrição" style={{ width: '1%' }}></Column>
                        <Column field="image" header="Imagem" style={{ width: '1%' }}></Column>
                      
                    </DataTable>
                </div>
                <div className="w-2 border-2 ml-4 justify-content-start h-13rem">
                    <div className="flex flex-row gap-2 p-2 sm:w-full justify-content-start">
                        <label className="flex mt-2" htmlFor="url">URL:</label>
                        <InputText className="flex sm:h-2rem" id="url" value={stripe?.url} onChange={(e) => setStripe({ ...stripe!, url: e.target.value })} />
                    </div>
                    <div className="flex flex-row gap-2 p-2 sm:w-full justify-content-start">
                        <label className="flex mt-2" htmlFor="image">Image:</label>
                        <InputText className="flex sm:h-2rem " id="image" value={stripe?.image} onChange={(e) => setStripe({ ...stripe!, image: e.target.value })} />
                    </div>
                    <div className="flex flex-row gap-2 p-2 sm:w-full justify-content-start">
                        <label className="flex mt-2" htmlFor="descriptName">Descrição:</label>
                        <InputText className="flex sm:h-2rem w-5" id="descriptName" value={stripe?.descriptName} onChange={(e) => setStripe({ ...stripe!, descriptName: e.target.value })} />
                    </div>
                    <div className="flex flex-row gap-4 p-2 sm:w-full justify-content-end">
                        <Button label="Save" onClick={() => handleStriper(stripe)} />
                    </div>
                </div>


            </TabPanel>
        </TabView>

    </>)
}

export default TableAdmin;