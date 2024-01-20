export interface Product {
  quantity: number;
  _id: string;
  name: string;
  description: string;
  variations: Variation[];
  category: string;
  subcategory: string;
  brand: string;
  images: Image[];
  sellers: SellerProduct[];
  mrp: number; // Maximum Retail Price
  discountPrice: number;
}

export interface Variation {
  color: string;
  size: string;
  stock: number;
  _id: string;
  images: Image[];
}

export interface Image {
  url: string;
  altText: string;
}

export interface SellerProduct {
  sellerId: string;
  stock: number;
  sellerPrice: number;
}
