import { Backdrop, Fade, Modal } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import CloseIcon from "../../public/icons/small/close.svg";
import { TertiaryButton } from "../TertiaryButton";
import styles from "./styles.module.css";

interface ContactUsProps {
  show: boolean;
  onCloseModal: () => void;
}

export const ContactUs: FunctionComponent<ContactUsProps> = ({
  show,
  onCloseModal,
}) => (
  <Modal
    className={styles.modal}
    open={show}
    onClose={onCloseModal}
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={show}>
      <div className={styles.paper}>
        <h2>Contact us</h2>
        <p>
          If you’d like to send us a message, please go to{" "}
          <TertiaryButton href="https://uw.link/contact-us" target="_blank">
            uw.link/contact-us
          </TertiaryButton>
          .
        </p>
        <p>
          Alternatively if you would prefer to call us, you can speak to a
          member of our award winning team on{" "}
          <TertiaryButton href="tel:03337773215">0333 777 3215</TertiaryButton>.
        </p>
        <small>
          Calls to our 0333 numbers are FREE when called from UW landlines and
          any mobile as part of an inclusive call bundle. Otherwise, these calls
          are charged at standard national rates.
        </small>
        <span className={styles.close} onClick={onCloseModal}>
          <CloseIcon />
        </span>
      </div>
    </Fade>
  </Modal>
);
