export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
