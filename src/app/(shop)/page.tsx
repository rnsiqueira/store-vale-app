"use client"

import { request } from '@/app/utils/http_build'
import { Item, Stripe } from "../domain/store-elements";
import ItemStore from '../components/item-store';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { Divider } from 'primereact/divider';
import { Carousel } from 'primereact/carousel';




const Home = () => {

  const [items, setItems] = useState<Item[]>([])
  const [showItems, setShowItems] = useState<Item[]>([])
  const [partnerFIlter, setPartnerFilter] = useState<Boolean>(false)
  const [categoryFIlter, setCategoryFilter] = useState<Boolean>(false)
  const [stripers, setStripers] = useState<Stripe[]>([])


  const getItems = async () => {
    const fetchItems: Item[] = await request.get("/item/all", {
      adapter: "fetch",
      fetchOptions: { cache: "force-cache" }
    }).then((resp) => { return resp.data })

    const fetchStripes: Stripe[] = await request.get("/item/stripe/all", {
      adapter: "fetch",
      fetchOptions: { cache: "force-cache" }
    }).then((resp) => { return resp.data })

    setItems(fetchItems)
    setShowItems(fetchItems)
    setStripers(fetchStripes)

  }


  useEffect(() => {
    getItems()
  }, [])

  const partners: String[] = [...new Set(showItems.map((item) => item.partner))]
  const categorys: String[] = [...new Set(showItems.map((item) => item.category))]

  function handleFilter(type: number, value: String) {
    if (type === 0 && !partnerFIlter) {
      const itemFiltered: Item[] = items.filter((i) => i.partner === value)
      setShowItems(itemFiltered)
      setPartnerFilter(true)
    } else if (type === 1 && !categoryFIlter) {
      const itemFiltered: Item[] = items.filter((i) => i.category === value)
      setShowItems(itemFiltered)
      setCategoryFilter(true)
    } else {
      setCategoryFilter(false)
      setPartnerFilter(false)
      setShowItems(items)
    }

  }

  const templateStripeAmazon = (stripersAmazon: Stripe) => {
    return (
      <>
        <div className="card border-1 surface-border border-round">
          <a target="_blank" href={stripersAmazon.url}>
            <div className="flex shadow-md sm:w-full justify-content-center">
              <img className='mt-1' src={stripersAmazon.image} alt={stripersAmazon.descriptName} style={{ width: "120px", height: "120px" }} />
            </div>
            <div className="flex text-center mt-1">
              <p className="m-0 font-bold">
                {stripersAmazon.descriptName}
              </p>
            </div>
          </a>
        </div>

      </>
    )
  }


  return (
    <>
      <Splitter className='flex'>
        <SplitterPanel className="flex" size={10} minSize={10}>
          <div className="flex flex-column p-7">
            <ul className='flex flex-column p-4'>
              <h2>Parceiros</h2>
              {partners.map((partner: String) =>
                <Button className={partnerFIlter ? "flex sm:w-min mt-1 text-blue-600" : "flex sm:w-min mt-1 text-color"} key={partners.indexOf(partner)} label={partner.toString()} onClick={() => handleFilter(0, partner)} text />

              )}
            </ul>
          </div>
        </SplitterPanel>
        <SplitterPanel size={80}>
          <Splitter layout="vertical">
            <SplitterPanel className="flex align-items-center" size={15}>
              <div className=" ml-5 flex p-2 flex-row w-full justify-content-start gap-2">
                {categorys.map((category) =>
                  <Button className={categoryFIlter ? "flex sm:w-min mt-1 text-blue-600" : "flex sm:w-min mt-1 text-color"} key={categorys.indexOf(category)} label={category.toString()} onClick={() => handleFilter(1, category)} text />)}
              </div>
            </SplitterPanel>

            <SplitterPanel size={85}>
              <Splitter>
                <SplitterPanel className="flex justify-content-center" size={90}>
                  <div className="flex flex-column sm:w-full p-2">
                    <div className="flex flex-column p-2 w-full justify-content-center">
                      <h3 className='flex sm:w-full'>Pague com Pix e economize! Descontos exclusivos para pagamentos à vista. Aproveite!</h3>
                      <Divider />
                      <p className="flex m-0">
                        Suas compras podem ser parceladas em até 12x no cartão de crédito. Pagamentos com cartão estão sujeitos a <b className="ml-1">taxas</b>.
                      </p>
                      <Divider />
                      <p className="flex m-0">
                        Nas compras de produtos da Insider, a partir de 3 itens, o frete é <b className='ml-1'>grátis</b>.
                      </p>
                    </div>
                    <div className="flex flex-wrap sm:w-full p-6 gap-6 ml-6 justify-content-start">
                      {showItems.map((i) => <ItemStore key={i.itemId} {...i} />)}
                    </div>
                  </div>
                </SplitterPanel>
                <SplitterPanel className="card" size={20}>
                  <div className="card">
                    <div className="card">
                      <p className="text-center text-5xl">
                        Produtos amazon
                      </p>
                    </div>
                    <div className="card">
                      <Carousel value={stripers} numVisible={4} numScroll={1} orientation="vertical" verticalViewPortHeight="1150px"
                        itemTemplate={templateStripeAmazon} />
                    </div>
                  </div>
                </SplitterPanel>

              </Splitter>

            </SplitterPanel>

          </Splitter>

        </SplitterPanel>

      </Splitter>
    </>
  );
}

export default Home