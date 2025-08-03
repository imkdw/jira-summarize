export interface JiraPagination<Value> {
  startAt: number;
  maxResults: number;
  total: number;
  isLast: boolean;
  values: Value[];
}
