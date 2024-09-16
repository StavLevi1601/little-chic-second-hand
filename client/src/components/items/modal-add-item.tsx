import React, { useState } from "react";
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
import { ItemSchema, itemsSchemaKeys } from "../../validations/itemSchema";
import { fetch } from "../../utils/fetch";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  updaeAddingItem: (item: ItemSchema) => void;
};

export default function ModalAddItem({
  isOpen,
  onClose,
  updaeAddingItem,
}: Props) {
  const { register, reset, handleSubmit } = useForm<ItemSchema>();
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  console.log(price);

  const onSubmit = async (data: ItemSchema) => {
    try {
      const result = await fetch(data);
      console.log(result.data.item);
      updaeAddingItem(result.data.item);
      onClose();
      reset();
    } catch (e) {
      console.error("Error adding item:", e);
      throw e;
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

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
              Add Item
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
                    value={description}
                    {...register(key)}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                ) : key === "price" ? (
                  <Input
                    id={key}
                    type="number"
                    {...register(key)}
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
              width: "60%",
              paddingLeft: "20px",
            }}
          >
            <Label htmlFor="image" style={{ marginBottom: "280px" }}></Label>
            <ImageInput
              id="image"
              type="file"
              accept="image/*"
              style={{ marginBottom: "20px" }}
            />

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
              Add Item
            </Button>
          </div>
        </Form>
      </Modal>
    </Container>
  );
}
