export const color = {
  black: '#000',
  primary: '#37373E',
  placeholder: '#DFDFDF',
  disabled: '#E9E9E9',
  background: '#F2F2F2',
  white: '#FFF',
  point: '#FFC700',
  delete: '#939393',
  register: '#01369C',
};

export const align = {
  flexHorizontal: {
    display: 'flex',
    justifyContent: 'center',
  },
  flexVertical: {
    display: 'flex',
    alignItems: 'center',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
};

const Theme = {
  color,
  align,
};

export default Theme;
