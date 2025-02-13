import classes from "./category-filter.module.css";
import { Select } from "@chakra-ui/react";

export default function CategoryFilter({ tags, onSelectTag }) {
  return (
    <div className={classes.categoryFilter}>
      <Select placeholder='카테고리 선택' onChange={(e) => onSelectTag(e.target.value)}>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </Select>
    </div>
  );
}
