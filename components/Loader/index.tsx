import { Backdrop, Fade, Modal } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import LoadingGif from "../../public/loading.gif";
import TickGif from "../../public/tick.gif";
import styles from "./styles.module.css";

interface LoaderProps {
  show: boolean;
  done?: boolean;
  children: string;
}

export const Loader: FunctionComponent<LoaderProps> = ({
  show,
  done,
  children,
}) => (
  <Modal
    className={styles.modal}
    open={show}
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={show}>
      <div className={styles.paper}>
        <img src={done ? TickGif : LoadingGif} width={100} />
        <p>{children}</p>
      </div>
    </Fade>
  </Modal>
);
