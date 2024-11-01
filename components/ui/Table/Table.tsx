import React, { Fragment } from 'react';
import {
  Column,
  ColumnDef,
  PaginationState,
  Table as TableType,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronRight,
  HiChevronLeft,
} from 'react-icons/hi2';
import { Select, Table as FlowbiteTable, TextInput } from 'flowbite-react';
import { Button } from '../button';

export function Table<T>({
  data,
  columns,
}: {
  data: T[];
  columns: ColumnDef<T>[];
}) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <>
      <div className="overflow-x-auto">
        <FlowbiteTable hoverable>
          <FlowbiteTable.Head>
            {table.getHeaderGroups().map((headerGroup) => (
              <Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <FlowbiteTable.HeadCell
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      <span
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </span>
                    </FlowbiteTable.HeadCell>
                  );
                })}
              </Fragment>
            ))}
          </FlowbiteTable.Head>

          <FlowbiteTable.Body>
            {table.getRowModel().rows.map((row) => {
              return (
                <FlowbiteTable.Row key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <FlowbiteTable.Cell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </FlowbiteTable.Cell>
                    );
                  })}
                </FlowbiteTable.Row>
              );
            })}
          </FlowbiteTable.Body>
        </FlowbiteTable>
      </div>
      <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
        <div className="flex justify-between text-xs text-gray-500">
          <div className="flex gap-1">
            <Button
              color="dark"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <HiChevronDoubleLeft />
            </Button>
            <Button
              color="dark"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <HiChevronLeft />
            </Button>
            <Button
              color="dark"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <HiChevronRight />
            </Button>
            <Button
              color="dark"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              <HiChevronDoubleRight />
            </Button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount().toLocaleString()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <TextInput
                type="number"
                min="1"
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
              />
            </span>
          </div>

          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
}
