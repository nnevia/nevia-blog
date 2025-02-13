import { Button, ButtonGroup } from "@chakra-ui/react";
import classes from "./category-filter.module.css";

export default function CategoryFilter({ tags, onSelectTag, selectedTag }) {
  const tagList = ["all", ...new Set(tags.flatMap((tag) => tag.split(",")))];

  return (
    <div className={classes.categoryFilter}>
      <ButtonGroup variant='outline' spacing='5'>
        {tagList.map((tag) => (
          <Button
            key={tag}
            onClick={() => onSelectTag(tag)}
            fontWeight={selectedTag === tag ? "bold" : "normal"}
            border='2px solid'
            borderRadius='20px'
            className={selectedTag === tag ? classes.active : ""}
          >
            {tag}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
