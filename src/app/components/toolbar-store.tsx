"use client"
import { Button } from "primereact/button"
import { Sidebar } from "primereact/sidebar"
import { useState } from "react"


const ToolbarStore = () => {

    const [visibleSidebar, setVisibleSidebar] = useState(false)


    return (<>
        <div className="flex flex-row p-3 border-1 sm:w-full">
            <div className="flex flex-shrink justify-items-start">
                <Button disabled className="flex border-circle w-2rem h-2rem justify-content-center" icon="pi pi-align-justify" onClick={() => setVisibleSidebar(true)} />
            </div>
            <div className="flex justify-content-center sm:w-11 text-black gap-2">
                <p className="flex m-0 mt-3">Loja Virtual!</p>
            </div>
            <div className="flex flex-shrink justify-content-end p-1 ml-2 mt-3">Conheça-nos</div>
        </div>

        <div className="card flex justify-content-center">
            <Sidebar className="flex sm:max-w-full" visible={visibleSidebar} onHide={() => setVisibleSidebar(false)} >
                <div className="flex flex-col">
                    <h2 className="flex text-center">Em construção.</h2></div> </Sidebar>
        </div>


    </>)

}

export default ToolbarStore