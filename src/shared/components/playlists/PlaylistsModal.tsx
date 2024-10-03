import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type useDisclosure,
} from "@nextui-org/react";
import { type FC } from "react";

import { PlaylistModalContent } from "./PlaylistModalContent";

type Props = ReturnType<typeof useDisclosure>;

export const PlaylistsModal: FC<Props> = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      scrollBehavior="inside"
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">Playlists</ModalHeader>
            <ModalBody className="flex flex-col gap-7">
              <PlaylistModalContent playlistPage={null} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button color="primary">Submit</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
