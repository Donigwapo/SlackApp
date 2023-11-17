/* eslint-disable react/prop-types */
const INPUT_STYLES = ['input--default', 'input--transparent', 'input--blackBorder'];

const INPUT_SIZES = ['input--medium', 'input--large', 'input--medium2'];

export const InputFields = ({
  type,
  placeholder,
  onChange,
  inputStyle,
  inputSize,
  value,
}) => {
  const checkInputStyle = INPUT_STYLES.includes(inputStyle) ? inputStyle : INPUT_STYLES[0];
  const checkInputSize = INPUT_SIZES.includes(inputSize) ? inputSize : INPUT_SIZES[0];

  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={`input ${checkInputStyle} ${checkInputSize}`}
      value={value}
    />
  );
};