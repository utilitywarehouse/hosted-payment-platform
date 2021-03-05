import { Grid } from "@material-ui/core";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { Button } from "../../components/Button";
import { PageLayout } from "../../components/PageLayout";
import OneImage from "../../public/icons/large/1.svg";
import TwoImage from "../../public/icons/large/2.svg";
import ThreeImage from "../../public/icons/large/3.svg";
import IphoneImage from "../../public/iphone.svg";
import RelaxImage from "../../public/relax.svg";
import WaveImage from "../../public/wave.svg";
import styles from "./styles.module.css";

const Success = () => {
  return (
    <>
      <PageLayout title="Payment succeeded - UW" className={styles.layout}>
        <div className={styles.gridWrapper}>
          <Grid container className={classNames(styles.grid, styles.darkGrid)}>
            <Grid item md={7} className={styles.heading}>
              <h1>You’re all done</h1>
              <p>We’ve received your payment. </p>
            </Grid>
            <Grid item md={5}>
              <RelaxImage />
            </Grid>
          </Grid>
        </div>
        <WaveImage />
        <Grid container className={classNames(styles.grid, styles.lightGrid)}>
          <Grid item md={12} lg={6}>
            <h1>Here’s what’ll happen next</h1>
          </Grid>
          <Grid item md={12} lg={6} />
        </Grid>
        <section className={styles.nextSteps}>
          <div>
            <OneImage />
            <h3>We’ll send a confirmation email or text</h3>
          </div>
          <div>
            <TwoImage />
            <h3>Your payment will update in your account in 3-5 days</h3>
          </div>
          <div>
            <ThreeImage />
            <h3>You can login to your account to check payment status</h3>
          </div>
        </section>
        <section className={styles.downloadContainer}>
          <div>
            <h2>Make payments easier with the UW app</h2>
            <Link href="https://uwclubhouse.page.link/app">
              <Button>Download now</Button>
            </Link>
          </div>
          <IphoneImage />
        </section>
      </PageLayout>
    </>
  );
};

export default Success;
