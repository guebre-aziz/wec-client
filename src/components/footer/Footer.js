import React from "react";
import "./footer.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <footer>
      <div className="footerLogoContainer">
        <span className="footerLogo">weConnect</span>
      </div>
      <div className="footerIconContainer">
        <h4>@ Guebre Aziz</h4>

        <a href="https://www.linkedin.com/in/azizguebre/" target="_blank">
          <LinkedInIcon sx={{ color: "white" }} />
        </a>

        <a href="https://github.com/guebre-aziz" target="_blank">
          <GitHubIcon sx={{ color: "white" }} />
        </a>

        <a href="https://www.instagram.com/guebreaziz_/" target="_blank">
          <InstagramIcon sx={{ color: "white" }} />
        </a>
      </div>
    </footer>
  );
}
