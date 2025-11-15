import { useState, useMemo } from 'react';
import {
  Container,
  Title,
  Card,
  Button,
  Group,
  Text,
  Badge,
  ActionIcon,
  TextInput,
  Stack,
  Pagination,
  Flex,
} from '@mantine/core';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
} from '@tabler/icons-react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
} from '@tanstack/react-table';
import { modals } from '@mantine/modals';
import { useProducts, useDeleteProduct, Product, useCreateProduct, useUpdateProduct } from '../hooks/useProducts';
import ProductForm from '../components/ProductForm';
import { ProductFormData } from '../schemas/productSchema';

const columnHelper = createColumnHelper<Product>();

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data, isLoading, error } = useProducts({
    page,
    limit,
    keyword: keyword || undefined,
  });

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      columnHelper.accessor('image', {
        header: 'Image',
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="Product"
            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50';
            }}
          />
        ),
        size: 80,
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => {
          const name = info.getValue();
          return name?.en || name?.fr || name?.ar || 'N/A';
        },
      }),
      columnHelper.accessor('sku', {
        header: 'SKU',
        cell: (info) => info.getValue() || '-',
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        cell: (info) => {
          const product = info.row.original;
          return `${product.price.toFixed(2)} ${product.currency}`;
        },
      }),
      columnHelper.accessor('stock', {
        header: 'Stock',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('category', {
        header: 'Category',
        cell: (info) => info.getValue() || '-',
      }),
      columnHelper.accessor('featured', {
        header: 'Featured',
        cell: (info) => (
          <Badge color={info.getValue() ? 'blue' : 'gray'}>
            {info.getValue() ? 'Yes' : 'No'}
          </Badge>
        ),
      }),
      columnHelper.accessor('isActive', {
        header: 'Status',
        cell: (info) => (
          <Badge color={info.getValue() ? 'green' : 'red'}>
            {info.getValue() ? 'Active' : 'Inactive'}
          </Badge>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <Group gap="xs">
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => handleEdit(info.row.original)}
            >
              <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => handleDelete(info.row.original)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: data?.products || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: data?.pagination.totalPages || 0,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
    },
  });

  const handleCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (product: Product) => {
    modals.openConfirmModal({
      title: 'Delete Product',
      children: (
        <Text size="sm">
          Are you sure you want to delete "{product.name?.en || product.name?.fr || 'this product'}"? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await deleteProduct.mutateAsync(product.id);
        } catch (error) {
          console.error('Failed to delete product:', error);
        }
      },
    });
  };

  const handleSubmit = async (formData: ProductFormData) => {
    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({
          id: editingProduct.id,
          data: formData,
        });
      } else {
        await createProduct.mutateAsync(formData);
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleSearch = (value: string) => {
    setKeyword(value);
    setPage(1); // Reset to first page on search
  };

  return (
    <Container size="xl">
      <Group justify="space-between" mb="lg">
        <Title order={2}>Products</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleCreate}>
          Create Product
        </Button>
      </Group>

      <Card withBorder shadow="sm" p="md" radius="md">
        <Stack gap="md">
          <TextInput
            placeholder="Search products..."
            leftSection={<IconSearch size={16} />}
            value={keyword}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ maxWidth: 400 }}
          />

          {isLoading ? (
            <Text>Loading products...</Text>
          ) : error ? (
            <Text c="red">Error loading products. Please try again.</Text>
          ) : !data?.products.length ? (
            <Text c="dimmed">No products found.</Text>
          ) : (
            <>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            style={{
                              padding: '12px',
                              textAlign: 'left',
                              borderBottom: '1px solid #dee2e6',
                              fontWeight: 600,
                            }}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        style={{
                          borderBottom: '1px solid #f0f0f0',
                        }}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            style={{
                              padding: '12px',
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {data.pagination && data.pagination.totalPages > 1 && (
                <Flex justify="space-between" align="center" mt="md">
                  <Text size="sm" c="dimmed">
                    Showing {((page - 1) * limit) + 1} to{' '}
                    {Math.min(page * limit, data.pagination.total)} of{' '}
                    {data.pagination.total} products
                  </Text>
                  <Pagination
                    value={page}
                    onChange={setPage}
                    total={data.pagination.totalPages}
                  />
                </Flex>
              )}
            </>
          )}
        </Stack>
      </Card>

      <ProductForm
        opened={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmit}
        product={editingProduct}
        isLoading={createProduct.isPending || updateProduct.isPending}
      />
    </Container>
  );
}

