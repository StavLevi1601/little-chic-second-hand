import React, { useEffect } from "react";
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
  const { register, reset, handleSubmit, setValue, getValues } =
    useForm<ItemSchema>();

  const onSubmit = async (data: ItemSchema) => {
    console.log("Item Added:", data);
    const result = await fetch(data);
    console.log("Result:", result);

    onClose();
    reset();
  };

  useEffect(() => {
    if (isOpen) {
      reset({ imageUrl: "" });
    }
  }, [isOpen, reset]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      reset();
    }
  };

  if (!isOpen) return null;

  const handleShowImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Image URL:", URL.createObjectURL(file));
      const imageUrl = URL.createObjectURL(file);
      setValue("imageUrl", imageUrl);
    }
  };

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
            <Title>Add Item</Title>

            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              {...register("title", { required: true })}
              required
            />

            <Label htmlFor="description" style={{ marginBottom: "10px" }}>
              Description
            </Label>
            <TextArea
              id="description"
              {...register("body", { required: true })}
              required
            />

            <Label htmlFor="price" style={{ marginBottom: "10px" }}>
              Price
            </Label>
            <Input
              id="price"
              type="number"
              {...register("price", { required: true })}
              required
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
            {getValues("imageUrl") ? (
              <img
                src={getValues("imageUrl")}
                alt="Selected"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "150px",
                  height: "auto", // ודא שהגובה מוגדר אוטומטית
                  position: "relative", // שנה ל-relative אם הבעיה נובעת מהמיקום
                  backgroundColor: "lightgrey",
                }}
              />
            ) : (
              <ImageInput
                id="image"
                {...register("imageUrl", { required: true })}
                type="file"
                accept="image/*"
                style={{
                  marginBottom: "20px",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "170px",
                  marginLeft: "170px",
                }}
                onChange={handleShowImage}
              />
            )}

            {/* {!getValues("imageUrl") ? (
              <ImageInput
                id="image"
                {...register("imageUrl", { required: true })}
                type="file"
                accept="image/*"
                style={{
                  marginBottom: "20px",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "170px",
                  marginLeft: "170px",
                }}
                onChange={handleShowImage}
              />
            ) : (
              ""
            )} */}

            <Button type="submit">Add Item</Button>
          </div>
        </Form>
      </Modal>
    </Container>
  );
}
