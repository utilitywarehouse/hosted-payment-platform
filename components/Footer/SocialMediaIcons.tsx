import { Grid, IconButton } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import Image from "next/image";
import React from "react";

const SocialMediaIcons: React.FC<{ classes: ClassNameMap }> = ({ classes }) => (
  <Grid item xs={12} lg={3} className={classes.iconContainer}>
    <IconButton href="https://www.youtube.com/channel/UCzLrdYjlTswNf3rivn5xHnQ">
      <Image
        src="/icons/small/youtube.svg"
        alt="UW Youtube Profile"
        width={24}
        height={24}
      />
    </IconButton>

    <IconButton href="https://www.linkedin.com/company/utilitywarehouse/">
      <Image
        src="/icons/small/linkedin.svg"
        alt="UW LinkedIn Profile"
        width={24}
        height={24}
      />
    </IconButton>

    <IconButton href="https://www.instagram.com/welcometouw/?hl=en">
      <Image
        src="/icons/small/instagram.svg"
        alt="UW Instagram Profile"
        width={24}
        height={24}
      />
    </IconButton>

    <IconButton href="https://www.facebook.com/welcometouw/">
      <Image
        src="/icons/small/facebook.svg"
        alt="UW Facebook Profile"
        width={24}
        height={24}
      />
    </IconButton>
  </Grid>
);

export default SocialMediaIcons;
