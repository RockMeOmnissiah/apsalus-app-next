import 'regenerator-runtime/runtime';
import { useMemo, useState } from 'react';
import { useTable, useFilters, useGlobalFilter,
  useAsyncDebounce, useSortBy, usePagination } from 'react-table';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faAngleDown, faAngleUp,
  faAngleDoubleLeft, faAngleDoubleRight, faSort } from "@fortawesome/free-solid-svg-icons";

export default function DataTable({ hiddenColumns, columns, data }) {

  // Define a default UI for filtering
  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)

    return (
      <label className="input-group pl-4 py-1">
        <span className="label-text flex-0 w-18 text-xs sm:text-sm">Search</span>
        <input
          className="input input-secondary input-xs max-w-xs"
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
        />
      </label>
    )
  }

  // function DefaultColumnFilter({
  //   column: { Header, filterValue, preFilteredRows, setFilter },
  // }) {
  //   return (
  //     <input
  //       key={Header}
  //       className="input input-primary input-xs my-auto mr-1 max-w-sm"
  //       value={filterValue || ''}
  //       onChange={e => {
  //         setFilter(e.target.value || undefined)
  //       }}
  //       placeholder={`Filter by ` + Header + `...`}
  //     />
  //   )
  // }

  // const defaultColumn = useMemo(
  //   () => ({
  //     // Default Filter UI
  //     Filter: DefaultColumnFilter,
  //   }),
  //   []
  // )

  const {
    preGlobalFilteredRows,
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    // canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { globalFilter, pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5, hiddenColumns: hiddenColumns},
      // defaultColumn,
    },
    // useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  return <>
    <GlobalFilter
      preGlobalFilteredRows={preGlobalFilteredRows}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
    <table {...getTableProps()} className="w-full">
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, columnIdx) => (
              // Add the sorting props to control sorting. For this example
              // we can add them into the header props
              <th key={columnIdx} style={column.render('style')} >
                <div className="text-bold text-sm sm:text-lg w-full bg-base-300 rounded-lg pl-4">

                  <span {...column.getHeaderProps(column.getSortByToggleProps())} >
                    {column.render('Header')}
                  </span>
                  {/* Add a sort direction indicator */}
                  <span className="ml-2">
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <FontAwesomeIcon className="text-primary" icon={faAngleDown} />
                        : <FontAwesomeIcon className="text-primary" icon={faAngleUp} />
                      : <FontAwesomeIcon className="text-primary" icon={faSort} />}
                  </span>
                  {/* Render the columns filter UI */}
                  {/* <span className="flex flex-row ml-auto text-xs sm:text-sm rounded-lg">
                    {column.canFilter ? column.render('Filter') : null}
                  </span> */}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, cellIdx) => {
                  return (
                    <td key={cellIdx} {...cell.getCellProps()}
                      className="p-2"
                      style={headerGroups[0].headers[cellIdx].render('style')}
                    >
                      <div className="ml-4 overflow-x-auto">
                        {cell.render('Cell')}
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          }
        )}
      </tbody>
    </table>
    {/* <pre>
      <code>
        {JSON.stringify({
            pageIndex,
            pageSize,
            pageCount,
            canNextPage,
            canPreviousPage,
          },
          null,
          2
        )}
      </code>
    </pre> */}
    {/* Pagination */}
    {pageCount > 0 && <div className="pt-2 flex flex-row grid grid-cols-1 justify-center">
      <div className="btn-group mx-auto">
        <button className="btn btn-sm" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <FontAwesomeIcon icon={faAngleDoubleLeft} size="lg" />
        </button>
        <button className="btn btn-sm" onClick={() => previousPage()} disabled={!canPreviousPage}>
          <FontAwesomeIcon icon={faAngleLeft} size="lg" />
        </button>
        <span className="btn btn-sm btn-active">
          Page
          <strong className="ml-1">
            <input
              className="input input-primary text-base-content input-xs w-16"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = (e.target.value ? Number(e.target.value) - 1 : 0);
                gotoPage(page);
              }}
              min={1}
              max={pageCount}
            />
            <span className="ml-2">of {pageOptions.length}</span>
          </strong>{' '}
        </span>
        <button className="btn btn-sm" onClick={() => nextPage()} disabled={pageIndex == (pageCount - 1)}>
          <FontAwesomeIcon icon={faAngleRight} size="lg" />
        </button>
        <button className="btn btn-sm" onClick={() => gotoPage(pageCount - 1)} disabled={pageIndex == (pageCount - 1)}>
          <FontAwesomeIcon icon={faAngleDoubleRight} size="lg" />
        </button>
      </div>
      <label className="input-group pt-2 w-auto mx-auto">
        <select
          className="select select-bordered select-secondary text-base-content w-16 select-xs max-w-xs"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <span className="label-text text-bold text-xs px-2">Per Page</span>
      </label>
    </div>}


  </>
}
