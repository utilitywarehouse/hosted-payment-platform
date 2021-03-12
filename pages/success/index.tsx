import { Grid } from "@material-ui/core";
import classNames from "classnames";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../../components/Button";
import { PageLayout } from "../../components/PageLayout";
import { TertiaryButton } from "../../components/TertiaryButton";
import { useTracking } from "../../hooks/useTracking";
import OneImage from "../../public/icons/large/1.svg";
import TwoImage from "../../public/icons/large/2.svg";
import ThreeImage from "../../public/icons/large/3.svg";
import IphoneImage from "../../public/iphone.svg";
import RelaxImage from "../../public/relax.svg";
import WaveImage from "../../public/wave.svg";
import styles from "./styles.module.css";

const Success = () => {
  const trackEvent = useTracking();

  useEffect(() => {
    trackEvent("payments-success-page-viewed");
  }, []);

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
            <h1>What’s next?</h1>
          </Grid>
          <Grid item md={12} lg={6} />
        </Grid>
        <section className={styles.nextSteps}>
          <div>
            <OneImage />
            <h3>Your payment will be reflected in your UW account shortly</h3>
          </div>
          <div>
            <TwoImage />
            <h3>
              If your services were suspended and you’ve paid in full, they will
              be reactivated
            </h3>
          </div>
          <div>
            <ThreeImage />
            <h3>
              Set up a{" "}
              <TertiaryButton
                className={styles.directDebitLink}
                href="http://uw.link/direct-debit-set-up"
              >
                Direct Debit
              </TertiaryButton>{" "}
              with us to help avoid overdue bills in the future
            </h3>
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
