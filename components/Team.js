import { darkColor, lightColor } from "./Section";
import { BrandLinkedin, World } from "tabler-icons-react";

const teamData = [
  {
    name: "Hernando Delgado",
    location: "Charlotte, NC",
    linkedInUrl: "https://www.linkedin.com/in/hernandodelgado/",
    personalPageUrl: "",
    image: "/hd.png",
  },
  {
    name: "Zach Morgan",
    location: "Bend, OR",
    linkedInUrl: "https://www.linkedin.com/in/zachmorgan97/",
    personalPageUrl: "",
    image: "/zm.png",
  },
  {
    name: "Michael Newman",
    location: "Miami, FL",
    linkedInUrl: "https://www.linkedin.com/in/michael-newman-a5465516b/",
    personalPageUrl: "https://mnewman.dev/",
    image: "/mn.png",
  },
  {
    name: "Eric Vu",
    location: "San Jose, CA",
    linkedInUrl: "https://www.linkedin.com/",
    personalPageUrl: "",
    image: "/ev.png",
  },
];

const Profile = ({
  image,
  name,
  location,
  linkedInUrl,
  personalPageUrl,
  theme,
}) => {
  return (
    <div
      style={{
        margin: "1rem",
        color: theme === "light" ? darkColor : lightColor,
        // flex: "1 0 15rem",
        flex: "1 0 auto",
        textAlign: "center",
      }}
    >
      <img src={image} alt={name} style={{ height: "13rem", margin: "auto" }} />
      <div
        style={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          margin: "auto",
          marginTop: "1rem",
        }}
      >
        {name}
      </div>
      <div>{location}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <a href={linkedInUrl} target="_blank">
          <BrandLinkedin style={{ height: "1.5rem" }} />
        </a>
        <a href={personalPageUrl} target="_blank">
          <World style={{ height: "1.5rem" }} />
        </a>
      </div>
    </div>
  );
};

const Team = ({ theme }) => {
  // const darkTheme = {
  //   color: lightColor,
  // };

  // const lightTheme = {
  //   color: darkColor,
  // };

  // const theme = theme === "light" ? lightTheme : darkTheme;

  return (
    <div style={{ maxWidth: "80rem", margin: "auto" }}>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: theme === "light" ? "#64009E" : "#0CBAFF",
          textAlign: "center",
          margin: "2rem",
        }}
      >
        Created by
      </h2>
      <div
        className="team"
        style={{
          display: "flex",
          justifyContent: "space-around",
          // flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {teamData.map((profile) => (
          <Profile {...profile} theme={theme} key={profile.name} />
        ))}
      </div>
    </div>
  );
};

export default Team;
