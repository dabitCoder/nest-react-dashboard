import { ChangeEvent } from "react";

interface Props {
  searchTerm: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ searchTerm, handleSearchChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Search articles..."
      className="w-full md:w-60 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default SearchInput;
