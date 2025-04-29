import { ChangeEvent } from "react";

interface Props {
  searchTerm?: string;
  onSearchChange: (searchTerm: string) => void;
}

const SearchInput = ({ searchTerm, onSearchChange }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search articles..."
      className="w-full md:w-60 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
