export const getBaseUrl = () => {
    let url;
    switch (process.env.NODE_ENV) {
      case "production":
        url = "https://ticket-be.herokuapp.com/api";
        break;
      case "development":
      default:
        url = "http://localhost:8080/api";
    }
  
    return url;
  };
  