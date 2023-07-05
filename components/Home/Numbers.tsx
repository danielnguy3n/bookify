interface Props {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

function Numbers({ icon, title, subtitle }: Props) {
  return (
    <div className="numbers">
      <div className="numbers__icon">{icon}</div>
      <div className="numbers__title">{title}</div>
      <div className="numbers__sub--title">{subtitle}</div>
    </div>
  );
}

export default Numbers;
