// import { Home } from "tabler-icons-react";
import { Bleed } from 'nextra-theme-docs';
import dynamic from 'next/dynamic'
import Link from 'next/link'

const NetworkGraph = dynamic(() => import('../components/NetworkGraph'), { ssr: false })

export const darkColor = "rgb(48, 52, 58)";
export const lightColor = "rgb(243 244 246)";

const darkTheme = {
  background: darkColor,
  color: lightColor,
  flexFlow: "row wrap",
}

const lightTheme = {
  background: lightColor,
  color: darkColor,
  flexFlow: "row-reverse wrap",
}

const Section = ({ title, description, image, children, index = 0 }) => {
  // const theme = (index % 2 === 0 ? darkTheme : lightTheme);
  const theme = (index % 2 === 0 ? lightTheme : darkTheme);

  const linkStyle = {
    display: 'block',
    marginLeft: 'auto',
    border: '1px solid white',
    borderColor: theme.color,
    marginRight: 'auto',
    marginTop: "1rem",
    width: 'fit-content',
    padding: '1rem',
    borderRadius: '1.5rem',
    fontWeight: 'bold',
  };

  const sectionStyle = {
    textAlign: 'left',
    paddingTop: "1rem",
    paddingBottom: "1rem",
    padding: "1rem",
    display: "flex",
    flexDirection: (index % 2 === 0 ? "row" : "row-reverse"),
    justifyContent: "center",
    ...theme,
  };


  const Title = () => (
    <div style={{
      fontSize: "1rem",
      fontWeight: "bold",
      color: (theme === darkTheme ? "#0CBAFF" : "#64009E")
      // color: "#0CBAFF"
    }}>
      {title}
    </div>
  );

  const Description = () => (
    <div style={{
      fontSize: "1.5rem",
      fontWeight: "normal",
      maxWidth: "35rem"
    }}>
      {description}
    </div>
  );

  const Image = () => (
    <img
      style={{
        objectFit: "cover",
        maxWidth: "35rem",
        margin: "1rem",
        borderRadius: "1rem",
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
      }}
    >
      <Title />
      <Description />
      <div style={{ display: "flex", margin: "auto" }}>
        {children}
      </div>
    </div>
  );

  return (
    <section style={sectionStyle}>
      <TextContent />
      <Image />
    </section>
  )
}

export default Section;
