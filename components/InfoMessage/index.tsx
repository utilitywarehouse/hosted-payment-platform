import React, { FunctionComponent } from "react";
import InfoOutlinedIcon from "../../public/icons/small/info-outlined.svg";
import styles from "./styles.module.css";

interface InfoMessageProps {
  children: JSX.Element;
}

export const InfoMessage: FunctionComponent<InfoMessageProps> = ({
  children,
}) => (
  <div className={styles.info}>
    <InfoOutlinedIcon />
    {children}
  </div>
);
