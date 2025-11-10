import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Modal,
  Button,
  TextInput,
  Textarea,
  NumberInput,
  Switch,
  Stack,
  Group,
  Tabs,
  Select,
} from '@mantine/core';
import { productFormSchema, ProductFormData } from '../schemas/productSchema';
import { Product } from '../hooks/useProducts';

interface ProductFormProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  product?: Product | null;
  isLoading?: boolean;
}

export default function ProductForm({
  opened,
  onClose,
  onSubmit,
  product,
  isLoading = false,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: { fr: '', en: '', ar: '' },
      description: { fr: '', en: '', ar: '' },
      price: 0,
      currency: 'EUR',
      image: '',
      images: [],
      video: '',
      links: { amazon: '', etsy: '', vinted: '' },
      featured: false,
      category: '',
      sku: '',
      stock: 0,
      isActive: true,
    },
  });

  // Reset form when product changes or modal opens/closes
  useEffect(() => {
    if (opened) {
      if (product) {
        reset({
          name: product.name,
          description: product.description,
          shortDescription: product.shortDescription,
          price: product.price,
          currency: product.currency,
          image: product.image,
          images: product.images || [],
          video: product.video || '',
          links: product.links,
          featured: product.featured,
          category: product.category || '',
          sku: product.sku || '',
          stock: product.stock,
          isActive: product.isActive,
        });
      } else {
        reset({
          name: { fr: '', en: '', ar: '' },
          description: { fr: '', en: '', ar: '' },
          price: 0,
          currency: 'EUR',
          image: '',
          images: [],
          video: '',
          links: { amazon: '', etsy: '', vinted: '' },
          featured: false,
          category: '',
          sku: '',
          stock: 0,
          isActive: true,
        });
      }
    }
  }, [product, opened, reset]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={product ? 'Edit Product' : 'Create Product'}
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <Tabs defaultValue="basic">
            <Tabs.List>
              <Tabs.Tab value="basic">Basic Info</Tabs.Tab>
              <Tabs.Tab value="multilingual">Multilingual</Tabs.Tab>
              <Tabs.Tab value="media">Media & Links</Tabs.Tab>
              <Tabs.Tab value="inventory">Inventory</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="basic" pt="md">
              <Stack gap="md">
                <TextInput
                  label="SKU"
                  placeholder="Product SKU"
                  {...register('sku')}
                  error={errors.sku?.message}
                />
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Category"
                      placeholder="Select category"
                      data={[]}
                      value={field.value || ''}
                      onChange={(value) => field.onChange(value || '')}
                      error={errors.category?.message}
                    />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      label="Price"
                      placeholder="0.00"
                      decimalScale={2}
                      fixedDecimalScale
                      min={0}
                      step={0.01}
                      value={field.value}
                      onChange={(value) => field.onChange(Number(value) || 0)}
                      error={errors.price?.message}
                    />
                  )}
                />
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Currency"
                      data={['EUR', 'USD', 'GBP', 'MAD']}
                      value={field.value}
                      onChange={(value) => field.onChange(value || 'EUR')}
                      error={errors.currency?.message}
                    />
                  )}
                />
                <Switch
                  label="Featured"
                  {...register('featured')}
                  checked={watch('featured')}
                  onChange={(e) => setValue('featured', e.currentTarget.checked)}
                />
                <Switch
                  label="Active"
                  {...register('isActive')}
                  checked={watch('isActive')}
                  onChange={(e) => setValue('isActive', e.currentTarget.checked)}
                />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="multilingual" pt="md">
              <Stack gap="md">
                <TextInput
                  label="Name (French)"
                  placeholder="Product name in French"
                  {...register('name.fr')}
                  error={errors.name?.fr?.message}
                  required
                />
                <TextInput
                  label="Name (English)"
                  placeholder="Product name in English"
                  {...register('name.en')}
                  error={errors.name?.en?.message}
                  required
                />
                <TextInput
                  label="Name (Arabic)"
                  placeholder="Product name in Arabic"
                  {...register('name.ar')}
                  error={errors.name?.ar?.message}
                  required
                />
                <Textarea
                  label="Description (French)"
                  placeholder="Product description in French"
                  rows={4}
                  {...register('description.fr')}
                  error={errors.description?.fr?.message}
                  required
                />
                <Textarea
                  label="Description (English)"
                  placeholder="Product description in English"
                  rows={4}
                  {...register('description.en')}
                  error={errors.description?.en?.message}
                  required
                />
                <Textarea
                  label="Description (Arabic)"
                  placeholder="Product description in Arabic"
                  rows={4}
                  {...register('description.ar')}
                  error={errors.description?.ar?.message}
                  required
                />
                <Textarea
                  label="Short Description (French)"
                  placeholder="Short description in French"
                  rows={2}
                  {...register('shortDescription.fr')}
                  error={errors.shortDescription?.fr?.message}
                />
                <Textarea
                  label="Short Description (English)"
                  placeholder="Short description in English"
                  rows={2}
                  {...register('shortDescription.en')}
                  error={errors.shortDescription?.en?.message}
                />
                <Textarea
                  label="Short Description (Arabic)"
                  placeholder="Short description in Arabic"
                  rows={2}
                  {...register('shortDescription.ar')}
                  error={errors.shortDescription?.ar?.message}
                />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="media" pt="md">
              <Stack gap="md">
                <TextInput
                  label="Main Image URL"
                  placeholder="https://example.com/image.jpg"
                  {...register('image')}
                  error={errors.image?.message}
                  required
                />
                <TextInput
                  label="Video URL"
                  placeholder="https://example.com/video.mp4"
                  {...register('video')}
                  error={errors.video?.message}
                />
                <TextInput
                  label="Amazon Link"
                  placeholder="https://amazon.com/..."
                  {...register('links.amazon')}
                  error={errors.links?.amazon?.message}
                />
                <TextInput
                  label="Etsy Link"
                  placeholder="https://etsy.com/..."
                  {...register('links.etsy')}
                  error={errors.links?.etsy?.message}
                />
                <TextInput
                  label="Vinted Link"
                  placeholder="https://vinted.com/..."
                  {...register('links.vinted')}
                  error={errors.links?.vinted?.message}
                />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="inventory" pt="md">
              <Stack gap="md">
                <Controller
                  name="stock"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      label="Stock"
                      placeholder="0"
                      min={0}
                      value={field.value}
                      onChange={(value) => field.onChange(Number(value) || 0)}
                      error={errors.stock?.message}
                    />
                  )}
                />
              </Stack>
            </Tabs.Panel>
          </Tabs>

          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" loading={isLoading}>
              {product ? 'Update' : 'Create'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

