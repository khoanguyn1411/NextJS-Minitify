"use client";

import { Button } from "@nextui-org/button";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { type FC } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export const Test: FC = () => {
  const disclosure = useDisclosure();

  const handleClick = () => {
    alert("Wrapper click.");
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <Button
          onClick={disclosure.onOpen}
          isIconOnly
          radius="full"
          variant="bordered"
        >
          <BiDotsHorizontalRounded className="text-xl" />
        </Button>
        <Modal
          isOpen={disclosure.isOpen}
          scrollBehavior="inside"
          onOpenChange={disclosure.onOpenChange}
        >
          <ModalContent>123213</ModalContent>
        </Modal>
      </div>
    </>
  );
};
