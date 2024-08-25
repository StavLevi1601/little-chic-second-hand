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
import { ItemSchema } from "../../validations/itemSchema";
import { fetch } from "../../utils/fetch";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalAddItem({ isOpen, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  // const [sku, setSku] = useState("");
  // const [quantity, setQuantity] = useState(1);

  const { register, reset, handleSubmit } = useForm<ItemSchema>();

  const onSubmit = async (data: ItemSchema) => {
    console.log(price);

    console.log("Item Added:", data);
    const result = await fetch(data);
    console.log("Result:", result);

    onClose();
    reset();
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

            <Label htmlFor="title" style={{ marginBottom: "10px" }}>
              Title
            </Label>
            <Input
              id="title"
              type="text"
              value={title}
              {...register("title")}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                marginBottom: "20px",
                padding: "10px",
                fontSize: "16px",
              }}
            />

            <Label htmlFor="description" style={{ marginBottom: "10px" }}>
              Description
            </Label>
            <TextArea
              id="description"
              value={description}
              {...register("body")}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                marginBottom: "20px",
                padding: "10px",
                fontSize: "16px",
                height: "80px",
              }}
            />

            <Label htmlFor="price" style={{ marginBottom: "10px" }}>
              Price
            </Label>
            <Input
              id="price"
              type="number"
              {...register("price")}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={{
                marginBottom: "20px",
                padding: "10px",
                fontSize: "16px",
              }}
            />
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
