import { Item, OrderPurchase, PartnerWeightDiscount, Stripe } from "@/app/domain/store-elements";
import { request } from "@/app/utils/http_build";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NavBar from "../components/navbar";
import TableAdmin from "../components/table-admin";


const PurchaseAdmin = async () => {

    const session = await getServerSession();

    if (!session || !session.user) {
        redirect("/api/auth/signin")
    }

    const order: OrderPurchase[] = await request.get("/order/all", {
        adapter: "fetch",
        fetchOptions: { cache: "no-store" }
    }).then((resp) => resp.data)

    const itens: Item[] = await request.get("/item/admin/all", {
        adapter: "fetch",
        fetchOptions: { cache: "no-store" }
    }).then((resp) => resp.data)

    const partnerWeightDiscount: PartnerWeightDiscount[] = await request.get("/item/partners", {
        adapter: "fetch",
        fetchOptions: { cache: "no-store" }
    }).then((resp) => resp.data)

    const stripes: Stripe[] = await request.get("/item/stripe/all", {
        adapter: "fetch",
        fetchOptions: { cache: "no-store" }
    }).then((resp) => resp.data)







    return (
        <>
            <div className="flex flex-column w-full">
                <NavBar />
                <TableAdmin orderDatails={order} itens={itens} partners={partnerWeightDiscount} stripes={stripes}/>
            </div>
        </>
    )

}


export default PurchaseAdmin