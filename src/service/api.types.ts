export interface ProductItem {
  id: number;
  name: string | null;
  imgUrl: string | null;
  price: number | null;
  categoryId: number;
  stocks: number;
  stockType: string;
  category?: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product: ProductItem;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  userId: number;
  items: OrderItem[];
  user?: {
    id: number;
    userName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Expenditure {
  id: number;
  name: string;
  price: number;
  note: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TopProduct {
  name: string;
  quantity: number;
  productId: number;
}

export interface ReportItem {
  id: number;
  date: string;
  periodType: string;
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  totalOrders: number;
  topProductsData: TopProduct[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface PaginatedResponse<T> {
  message: string;
  data: T[];
  pagination: PaginationMetadata;
}

