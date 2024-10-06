import React, { useState, useCallback, useEffect } from 'react';
import {
  Container,
  Modal,
  Title,
  Form,
  Label,
  Input,
  ImageInput,
  TextArea,
  Button,
  LeftColumn,
  RightColumn,
  CloseButton,
} from './modal-item.style';
import { useForm } from 'react-hook-form';
import { ItemSchema, ItemSchemaAddItem, itemsSchemaKeys } from '../../validations/itemSchema';
import { fetch, updateItem } from '../../utils/fetch';
import useAuthStore from '../../store/useAuthState';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  updateOrAddItem: (item: ItemSchema) => void;
  item?: ItemSchema | null;
  onUpdateCollection: () => void;
};

export default function ModalItem({
  isOpen,
  onClose,
  updateOrAddItem,
  item,
  onUpdateCollection,
}: Props) {
  const { register, reset, handleSubmit, setValue } = useForm<ItemSchemaAddItem>();
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { user } = useAuthStore();

  const initializeFormValues = useCallback(() => {
    if (item) {
      setDescription(item.description || '');
      setPrice(item.price || 0);
      setImagePreview(item.image || null);
      Object.keys(item).forEach((key) => {
        setValue(key as keyof ItemSchemaAddItem, item[key as keyof ItemSchema]);
      });
    } else {
      reset();
      setDescription('');
      setPrice(0);
      setImagePreview(null);
    }
  }, [item, setValue, reset]);

  useEffect(() => {
    if (isOpen) {
      initializeFormValues();
    }
  }, [isOpen, initializeFormValues]);

  const onSubmit = async (data: ItemSchemaAddItem) => {
    try {
      let result;
      if (!item) {
        data.seller_id = user!.id ? user!.id : '111';
        result = await fetch(data);
      } else {
        result = await updateItem({ ...data, id: item.id, status: 'available' });
      }
      updateOrAddItem(result.item);
      onUpdateCollection();
      onClose();
    } catch (e) {
      console.error('Error adding/updating item:', e);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <Container>
      <Modal>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{item ? 'Edit Item' : 'Add Item'}</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <LeftColumn>
            {itemsSchemaKeys.map((key) => (
              <div key={key}>
                <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                {key === 'description' ? (
                  <TextArea
                    id={key}
                    {...register(key)}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                ) : key === 'price' ? (
                  <Input
                    id={key}
                    type="number"
                    {...register(key)}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                  />
                ) : (
                  <Input id={key} type="text" {...register(key)} required />
                )}
              </div>
            ))}
          </LeftColumn>
          <RightColumn>
            <Label htmlFor="image">Image</Label>
            <ImageInput id="image" type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Item preview"
                style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
              />
            )}
            <Button type="submit">{item ? 'Update Item' : 'Add Item'}</Button>
          </RightColumn>
        </Form>
      </Modal>
    </Container>
  );
}
