interface Props {
  stat: number;
  title: string;
  boldText: string;
}

function Statistic({ stat, title, boldText }: Props) {

  const splitString = title.split(boldText, 2)

  return (
    <div className="statistics__data">
      <div className="statistics__data--number">{stat}%</div>
      <div className="statistics__data--title">
        {splitString[0]} <b>{boldText}</b> {splitString[1]}
      </div>
    </div>
  );
}

export default Statistic;
