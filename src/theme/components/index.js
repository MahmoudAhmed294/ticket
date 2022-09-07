export const container = {
  MuiContainer: {
    styleOverrides: {
      root : ({ ownerState }) => ({
        ...(ownerState.maxWidth === 'lg' && {
          maxWidth:"1400px !important"
        }
          ),
      }),
    },
  },
};

export const button = {
  MuiButton: {
    styleOverrides: {
      root: {
        boxShadow: "none !important",
      },
    },
  },
};
export const input = {
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        height: "54px",
      },
    },
  },
};
