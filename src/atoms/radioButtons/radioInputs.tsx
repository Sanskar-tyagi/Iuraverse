import "./radioButton.css";
const RadioInputs = ({
  data,
  setSelected,
  selected,
}: {
  data: any;
  setSelected: (value: string) => void;
  selected: string;
}) => {
  return (
    <div className="radio-inputs">
      {data.map((item: any) => {
        return (
          <label key={item.value}>
            <input
              checked={selected === item.value}
              onChange={() => {
                setSelected(item.value);
              }}
              className="radio-input"
              type="radio"
            />
            <span className="radio-tile">
              <span className="radio-icon">{item.icon}</span>
              <span className="radio-label">{item.role}</span>
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default RadioInputs;
