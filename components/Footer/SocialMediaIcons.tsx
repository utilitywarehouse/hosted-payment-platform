import { Grid, IconButton } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import React from "react";
import FacebookIcon from "../../public/icons/small/facebook.svg";
import InstagramIcon from "../../public/icons/small/instagram.svg";
import LinkedInIcon from "../../public/icons/small/linkedin.svg";
import YoutubeIcon from "../../public/icons/small/youtube.svg";

const SocialMediaIcons: React.FC<{ classes: ClassNameMap }> = ({ classes }) => (
  <Grid item xs={12} lg={3} className={classes.iconContainer}>
    <IconButton href="https://www.youtube.com/channel/UCzLrdYjlTswNf3rivn5xHnQ">
      <YoutubeIcon />
    </IconButton>

    <IconButton href="https://www.linkedin.com/company/utilitywarehouse/">
      <LinkedInIcon />
    </IconButton>

    <IconButton href="https://www.instagram.com/welcometouw/?hl=en">
      <InstagramIcon />
    </IconButton>

    <IconButton href="https://www.facebook.com/welcometouw/">
      <FacebookIcon />
    </IconButton>
  </Grid>
);

export default SocialMediaIcons;
