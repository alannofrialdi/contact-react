export default function Heading({ head }) {
  return (
    <h1 className="font-bold text-2xl text-center">
      {head ? head : "Contact App"}
    </h1>
  );
}

Heading.propTypes;
