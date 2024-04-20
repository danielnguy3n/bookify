interface Props {
  stat: number;
  title: string;
  bold: string;
}

function Statistic({ stat, title, bold }: Props) {

  const splitString = title.split(bold, 2)

  return (
    <div className="statistics__data">
      <div className="statistics__data--number">{stat}%</div>
      <div className="statistics__data--title">
        {splitString[0]} <b>{bold}</b> {splitString[1]}
      </div>
    </div>
  );
}

export default Statistic;
