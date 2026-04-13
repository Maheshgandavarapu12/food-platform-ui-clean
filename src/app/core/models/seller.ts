// Item
export interface Item {
  id: number;
  itemName: string;
  categoryName: string;
  price: number;
  quantity: number;
  totalStock: number;
  isOnSale: boolean;
  imageUri: string;
  sellerId: string;
  categoryId: number;
}
export interface ItemResponse {
  data: Item[];
  statusCode: number;
}

// Orders
export interface OrderResponse {
  data: Order[];
  statusCode: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  orderAddress: string;
}