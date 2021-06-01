import { Collapse, Grid } from "@material-ui/core";
import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { PageLayout } from "../../components/PageLayout";
import { TertiaryButton } from "../../components/TertiaryButton";
import { useTracking } from "../../hooks";
import DropdownIcon from "../../public/icons/small/dropdown.svg";
import IphoneImage from "../../public/iphone.svg";
import WaveImage from "../../public/wave.svg";
import styles from "./styles.module.css";

const Success = () => {
  const { trackEvent } = useTracking();

  const [showMore, setShowMore] = useState<boolean>(false);

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
              <p>Your payment will be reflected in your UW account shortly.</p>
            </Grid>
            <Grid item md={5} />
          </Grid>
        </div>
        <WaveImage />
        <Grid container className={classNames(styles.grid, styles.lightGrid)}>
          <Grid item md={12} lg={6}>
            <h2>What’s next?</h2>
          </Grid>
          <Grid item md={12} lg={6} />
        </Grid>
        <Grid container className={classNames(styles.grid, styles.nextSteps)}>
          <Grid item md={9}>
            <p>
              <span className={styles.dot} />
              <span className={styles.nextStepItem}>
                If we have an email address for you,
                we'll send you a payment confirmation email
              </span>
            </p>
            <p>
              <span className={styles.dot} />
              <span className={styles.nextStepItem}>
                Update or set up a{" "}
                <TertiaryButton href="http://uw.link/direct-debit-set-up">
                  <strong>Direct Debit</strong>
                </TertiaryButton>{" "}
                with us to help avoid overdue bills in the future
              </span>
            </p>
            <p>
              <span className={styles.dot} />
              <span className={styles.nextStepItem}>
                <strong>Important:</strong> If your telephony services were{" "}
                <strong>suspended</strong> or <strong>disconnected</strong>{" "}
                please read the details below about reconnections
              </span>
            </p>
          </Grid>
          <Grid item md={3} />
          <Grid item md={10}>
            <div className={styles.moreContainer}>
              <div
                className={styles.moreButton}
                onClick={() => {
                  setShowMore((current) => !current);
                }}
              >
                <span>More about reconnections</span>
                <span>
                  <DropdownIcon
                    className={classNames(styles.dropdownIcon, {
                      [styles.isOpen]: showMore,
                    })}
                  />
                </span>
              </div>
              <Collapse in={showMore} className={styles.moreContent}>
                <p>
                  If you have any telephony services which have stopped working
                  within the last 5 days, we will attempt to switch them back on
                  as you have cleared your outstanding balance. This can take up
                  to 24 hours but is usually done much quicker than that.
                </p>
                <p>
                  If any of your telephony services have not been working for
                  more than 5 days and you wish to have them reconnected, please
                  contact us on 0333 777 0777 to discuss options.
                </p>
              </Collapse>
            </div>
          </Grid>
          <Grid item md={2} />
        </Grid>
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
