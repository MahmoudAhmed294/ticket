
  
  
  const PRIMARY = {
    main: "#0A2488",
  };
  
  const SECONDARY = {
    main: "#007489",
  };
  const BODY = {
    main: "#333333",
    light: "#fff",
  };
  
  
  
  const ERROR = {
    main: "#C60808",
  };
  
  
  
  
  const palette = {
    primary: { ...PRIMARY },
    secondary: { ...SECONDARY },
    body: { ...BODY },
    error: { ...ERROR },
    background: { default: BODY.light, },
    text: {primary: BODY.main  },
  };
  
  export default palette;
  