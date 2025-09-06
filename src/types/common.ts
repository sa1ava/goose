export interface CSVDataResult<T> {
  data: T[] | null;
  loading: boolean;
  error: string | null;
}
