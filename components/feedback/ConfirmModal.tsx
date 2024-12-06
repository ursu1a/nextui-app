import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { siteConfig as strings } from "@/config/site";
import { Button } from "@nextui-org/button";

export type ConfirmActionModalProps = {
  shown: boolean;
  actionText: string;
  closeHandler: () => void;
  confirmHandler?: () => void;
};

export default function ConfirmModal({
  shown,
  actionText,
  closeHandler,
}: ConfirmActionModalProps) {
  return (
    <Modal
      isOpen={shown}
      placement="center"
      size="md"
      backdrop="opaque"
      isDismissable={false}
      classNames={{ base: "dark:bg-main" }}
      closeButton={<></>}
    >
      <ModalContent>
        <ModalHeader>{strings.feedback.confirm_action.title}</ModalHeader>
        <ModalBody>
          <p>
            {strings.feedback.confirm_action.text1}
            <span>{actionText}?</span>
            <span> {strings.feedback.confirm_action.text2}</span>
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger">
            {strings.feedback.confirm_action.actionYes}
          </Button>
          <Button color="default" variant="light" onPress={closeHandler}>
            {strings.feedback.confirm_action.actionNo}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
