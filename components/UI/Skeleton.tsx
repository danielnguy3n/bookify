
interface Props {
    width: string | number,
    height: string | number,
    borderRadius?: string | number,
    marginBottom?: number
}

const Skeleton = ({ width, height, borderRadius, marginBottom }: Props) => {
    return (
      <div
        className="skeleton-box"
        style={{
          width,
          height,
          borderRadius,
          marginBottom
        }}
      ></div>
    );
  };
  
  export default Skeleton;