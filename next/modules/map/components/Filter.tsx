'use client';

export default function Filter() {
  return (
    <div className="flex flex-row items-center">
      <div className="mx-4">
        Species
      </div>
      <div className="mx-4">
        <select multiple id="species-select">
          <option value="Bonasa umbellus">Bonasa umbellus</option>
          <option value="Mustela erminea">Mustela erminea</option>
          <option value="Odocoileus virginianus">Odocoileus virginianus</option>
        </select>
      </div>
    </div>
  );
}
