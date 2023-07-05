
interface Props {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}


function Feature({icon, title, subtitle}: Props) {
  return (
    <div className="features">
      <div className="features__icon">
        {icon}
      </div>
      <div className="features__title">{title}</div>
      <div className="features__sub--title">
        {subtitle}
      </div>
    </div>
  );
}

export default Feature;
