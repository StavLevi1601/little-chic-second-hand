import React, { useState, useCallback, useEffect } from "react";
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
} from "./modal-add-item.style";
import { useForm } from "react-hook-form";
import {
  ItemSchema,
  ItemSchemaAddItem,
  itemsSchemaKeys,
} from "../../validations/itemSchema";
import { fetch, updateItem } from "../../utils/fetch";
import useAuthStore from "../../store/useAuthState";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  updateOrAddItem: (item: ItemSchema) => void;
  item?: ItemSchema | null;
  onUpdateCollection : () => void
};

export default function ModalItem({
  isOpen,
  onClose,
  updateOrAddItem,
  item,
  onUpdateCollection
}: Props) {
  const { register, reset, handleSubmit, setValue } = useForm<ItemSchemaAddItem>();
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const { user } = useAuthStore();

  const initializeFormValues = useCallback(() => {
    console.log("item",item);

    if (item) {
      setDescription(item.description || "");
      setPrice(item.price || 0);
      Object.keys(item).forEach((key) => {
        setValue(key as keyof ItemSchemaAddItem, item[key as keyof ItemSchema]);
      });
    } else {
      reset();
      setDescription("");
      setPrice(0);
    }
  }, [item, setValue, reset]);

  useEffect(() => {
    if (isOpen) {
      initializeFormValues();
    }
  }, [isOpen, initializeFormValues])

  const onSubmit = async (data: ItemSchemaAddItem) => {
    try {
      let result;
      if (!item) {
        data.seller_id = user!.id ? user!.id : "111";
        result = await fetch(data);
      } else {
        result = await updateItem({ ...data, id: item.id, status: "available" });
      }
      updateOrAddItem(result.item);
      onUpdateCollection();  
      onClose();
    } catch (e) {
      console.error("Error adding/updating item:", e);
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  if (!item) {
    return (
      <Container onClick={handleContainerClick}>
        <Modal>
          <p>Loading...</p>
        </Modal>
      </Container>
    );
  }


  return (
    <Container onClick={handleContainerClick}>
      <Modal>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "row", width: "100%" }}
        >
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              width: "60%",
              paddingRight: "20px",
            }}
          >
            <Title style={{ marginBottom: "20px", fontSize: "24px" }}>
              {item ? "Edit Item" : "Add Item"}
            </Title>

            {itemsSchemaKeys.map((key) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Label htmlFor={key} style={{ marginTop: "40px" }}>
                  {key}
                </Label>
                {key === "description" ? (
                  <TextArea
                    id={key}
                    {...register(key)}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                ) : key === "price" ? (
                  <Input
                    id={key}
                    type="number"
                    {...register(key)}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    style={{
                      marginBottom: "20px",
                      padding: "10px",
                      fontSize: "16px",
                    }}
                  />
                ) : (
                  <Input
                    id={key}
                    type="text"
                    {...register(key)}
                    required
                    style={{
                      marginBottom: "20px",
                      padding: "10px",
                      fontSize: "16px",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "40%",
              paddingLeft: "20px",
            }}
          >
            <Label htmlFor="image" style={{ marginBottom: "20px" }}>Image</Label>
            <ImageInput
              id="image"
              type="file"
              accept="image/*"
              style={{ marginBottom: "20px" }}
            />
            {item && item.image && (
              <img 
                src={item.image} 
                alt="Current item" 
                style={{ maxWidth: "100%", maxHeight: "200px", marginBottom: "20px" }}
              />
            )}

            <Button
              type="submit"
              style={{
                marginTop: "auto",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {item ? "Update Item" : "Add Item"}
            </Button>
          </div>
        </Form>
      </Modal>
    </Container>
  );
}