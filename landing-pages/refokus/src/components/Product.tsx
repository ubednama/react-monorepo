import { CtaButton as Button } from "./ui/CtaButton";

interface ProductProps {
  val: {
    title: string;
    description: string;
    live: boolean;
    case: boolean;
    url?: string;
  };
  mover: (count: number) => void;
  count: number;
}

const Product = ({ val, mover, count }: ProductProps) => {
  return (
    <div className="w-full py-20 h-92 text-white">
      <div
        onMouseEnter={() => {
          mover(count);
        }}
        className="max-w-7xl mx-auto flex justify-between items-center"
      >
        <h1 className="text-6xl capitalize font-medium">{val.title}</h1>
        <div className="w-1/3">
          <p className="mb-10">{val.description}</p>
          <div className="flex items-center gap-5">
            {val.live && <Button title="Live Preview" />}
            {val.case && <Button title="Case Study" />}
          </div>
        </div>
      </div>
    </div>
  );
};



export default Product;
