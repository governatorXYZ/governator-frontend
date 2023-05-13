import {
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react'

function usePaginator<T>(
  data: Array<any>,
  opts: Record<string, any> = {
    pageSize: 5
  }): Record<string, any> {

  const [paginatedData, setPaginatedData] = useState<Array<any>>([])
  const [ page, setPage ] = useState<Array<any>>([])
  const [ currentPage, setCurrentPage ] = useState<number>(1)

  const totalPages = useMemo(
    () => Math.ceil(data.length / opts.pageSize),
    [data, opts.pageSize]
  );

  const nextPage = useCallback(() => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages))
  }, [totalPages, setCurrentPage]);

  const prevPage = useCallback(() => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
  }, [setCurrentPage])

  const goToPage = useCallback((page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }, [totalPages, setCurrentPage])

  useEffect(() => {
    const chunkedArray: T[][] = [];

    for (let i = 0; i < data.length; i += opts.pageSize) {
      chunkedArray.push(data.slice(i, i + opts.pageSize));
    }

    setPaginatedData(chunkedArray);

  }, [data, opts.pageSize ])

  useEffect(() => {
    if (paginatedData.length) {
      setPage(paginatedData[currentPage - 1])
    }
  }, [paginatedData, currentPage])



  return { 
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    page,
  }
}

export default usePaginator
