import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import ContactForm from "./contact-form";

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxWidth='800px'
          width='90%'
          bg={useColorModeValue("var(--color-grey-100)", "var(--color-grey-900)")}
        >
          <ModalCloseButton />
          <ModalBody>
            <ContactForm />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
