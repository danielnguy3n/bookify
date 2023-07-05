
interface Props {
    alignLeft: boolean
    heading1: string
    heading2: string
    heading3: string
    heading4: string
    heading5: string
    heading6: string
}

function StatHeadings({alignLeft, heading1, heading2, heading3, heading4, heading5, heading6}: Props) {
  return (
    <div className={`statistics__content--header ${alignLeft ? '' :`statistics__content--header-second`}`}>
      <div className="statistics__heading">{heading1}</div>
      <div className="statistics__heading">{heading2}</div>
      <div className="statistics__heading">{heading3}</div>
      <div className="statistics__heading">{heading4}</div>
      <div className="statistics__heading">{heading5}</div>
      <div className="statistics__heading">
        {heading6}
      </div>
    </div>
  );
}

export default StatHeadings;
