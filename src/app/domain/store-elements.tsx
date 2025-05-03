export interface Client {
    name?: string;
    lastName?: string;
    email?: string;
    born?: string;
    createdAt?: Date;
}

export interface ClientsQuantity {
    entrada?: String;
    total?: number;
}

export interface Item {
    id: string;
    itemId: number;
    pathImage: string;
    description: String;
    itemName: string;
    price: number;
    weightDiscount: number;
    partner: string;
    partnerLink: string;
    category: string;
    expiresAt: string;
    active: boolean;

}

export interface OrderPurchase {
    id: string;
    itemId: number;
    fullName: string;
    email: string;
    quantity: number;
    celNumber: string;
    codeAddress: string;
    address: string;
    addressNumber: string;
    sizeClothing: string;
    colorClothing: string;
    detail: string;
    amount: number;
    status: string;
    city: string;
    state: string;

}

export interface PartnerWeightDiscount {
    partner: string;
    weightDiscount: number;
    expiresAt: string;
}

export interface Stripe {
    id: string;
    url: string;
    descriptName: string;
    image: string;
}