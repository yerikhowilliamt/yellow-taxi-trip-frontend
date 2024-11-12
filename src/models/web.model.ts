export interface WebResponse<T> {
  data: T;
  errors?: string;
  paging: {
    size: number;
    total_page: number;
    current_page: number;
  };
  statusCode: number;
  timestamp: string;
}
