interface WeatherBoxProps {
  day: string;
  minTemp: number;
  maxTemp: number;
  unit: string;
}

const WeatherBox = ({ day, minTemp, maxTemp, unit }: WeatherBoxProps) => {
  return (
    <div>
      {day}
      {minTemp}
      {maxTemp}
      {unit}
    </div>
  );
};

export default WeatherBox;
