// import { Home } from "tabler-icons-react";
import { Bleed } from "nextra-theme-docs";
import dynamic from "next/dynamic";
import Link from "next/link";

const NetworkGraph = dynamic(() => import("../components/NetworkGraph"), {
  ssr: false,
});

export const darkColor = "rgb(48, 52, 58)";
export const lightColor = "rgb(243 244 246)";

const darkTheme = {
  background: darkColor,
  color: lightColor,
  flexFlow: "row wrap",
};

const lightTheme = {
  background: "rgb(223, 223, 223)",
  color: darkColor,
  flexFlow: "row-reverse wrap",
};

const Section = ({ tag, title, description, image, children, index = 0 }) => {
  const theme = index % 2 === 0 ? darkTheme : lightTheme;
  // const theme = index % 2 === 0 ? lightTheme : darkTheme;

  const linkStyle = {
    display: "block",
    marginLeft: "auto",
    border: "1px solid white",
    borderColor: theme.color,
    marginRight: "auto",
    marginTop: "1rem",
    width: "fit-content",
    padding: "1rem",
    borderRadius: "1.5rem",
    fontWeight: "bold",
  };

  const sectionStyle = {
    textAlign: "left",
    // paddingTop: "1rem",
    // paddingBottom: "1rem",
    padding: "1rem",
    display: "flex",
    flexDirection: index % 2 === 0 ? "row" : "row-reverse",
    justifyContent: "center",
    minHeight: "30rem",
    maxWidth: "100%",
    ...theme,
  };

  const Tag = () => (
    <div
      style={{
        fontSize: "1rem",
        fontWeight: "bold",
        color: theme === darkTheme ? "#0CBAFF" : "#64009E",
        opacity: 0.7,
        // color: "#0CBAFF"
      }}
    >
      {tag}
    </div>
  );

  const Title = () => (
    <h2
      style={{
        fontSize: "2rem",
        fontWeight: "bold",
        color: theme === darkTheme ? "#0CBAFF" : "#64009E",
        // color: "#0CBAFF"
      }}
    >
      {title}
    </h2>
  );

  const Description = () => (
    <div
      style={{
        fontSize: "1.5rem",
        fontWeight: "normal",
        maxWidth: "35rem",
        // textAlign: "justify",
      }}
    >
      {description}
    </div>
  );

  const Image = () => (
    <img
      style={{
        objectFit: "scale-down",
        maxWidth: "min(100%, 35rem)",
        // maxWidth: "35rem",
        margin: "1rem",
        borderRadius: "0.5rem",
        flex: "1 1 auto",
      }}
      src={image}
    />
  );

  const TextContent = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2rem 0rem",
        alignSelf: "center",
        maxWidth: "30rem",
        margin: "2rem",
        // margin: "auto",
        // flex: "1 1 auto",
      }}
    >
      <Tag />
      <Title />
      <Description />
      <div style={{ display: "flex", margin: "auto" }}>{children}</div>
    </div>
  );

  return (
    <section style={sectionStyle} className="homepage-section">
      {/* <div
        style={{
          // textAlign: "left",
          // paddingTop: "1rem",
          // paddingBottom: "1rem",
          // padding: "1rem",
          display: "flex",
          flexDirection: index % 2 === 0 ? "row" : "row-reverse",
          justifyContent: "center",
          // minHeight: "30rem",
          maxWidth: "40rem",
          flexWrap: "wrap",
        }}
      > */}
      <TextContent />
      {typeof image === "string" ? <Image /> : image}
      {/* </div> */}
    </section>
  );
};

export default Section;
