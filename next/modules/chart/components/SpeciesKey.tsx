export default function SpeciesKey({ data }: { data: {
  species: string,
  value: number,
  color: string,
}[] }) {
  return (
    <div className="flex-grow flex flex-row justify-center">
      <div className="flex flex-col">
        {data.map((segment) => (
          <div className="w-full flex flex-row items-center mx-4 my-1" key={segment.color}>
            <div className="w-8 h-4 border-2 border-white mr-2" style={{ backgroundColor: segment.color }} />
            <div className="">{segment.species}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
