import Wrapper from './Wrapper';

export const SearchBar = (props) => {
  return (
    <Wrapper>
      <input type="text" {...props} />
    </Wrapper>
  );
};

export default SearchBar;
