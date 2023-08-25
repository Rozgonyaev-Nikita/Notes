import React, { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import classes from "./SearchInput.module.css";

interface ISearchInput
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchInput: React.FC<ISearchInput> = ({
  searchValue,
  setSearchValue,
}) => {
  return (
    <div className={classes.fatherSerch}>
      <div className={classes.searchDiv}>
        <input
          className={classes.searchInput}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <AiOutlineFileSearch className={classes.searchIcon} />
      </div>
    </div>
  );
};

export default SearchInput;
