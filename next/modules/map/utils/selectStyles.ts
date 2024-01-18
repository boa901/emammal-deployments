const selectStyles = {
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  control: (base) => ({
    ...base,
    maxHeight: '36px',
  }),
  valueContainer: (base) => ({
    ...base,
    maxHeight: '36px',
    overflow: 'auto',
  }),
  multiValueLabel: (base) => ({
    ...base,
    whiteSpace: 'normal',
  }),
  indicatorsContainer: (base) => ({
    ...base,
    maxHeight: '36px',
  }),
};

export default selectStyles;
