import { Button, ButtonGroup } from "@chakra-ui/react";
import classes from "./category-filter.module.css";

export default function CategoryFilter({ tags, onSelectTag, selectedTag }) {
  const tagList = ["all", ...new Set(tags.flatMap((tag) => tag.split(",")))];

  return (
    <div className={classes.categoryFilter}>
      <ButtonGroup variant='outline' spacing='3'>
        {tagList.map((tag) => (
          <Button
            key={tag}
            onClick={() => onSelectTag(tag)}
            fontWeight={selectedTag === tag ? "bold" : "normal"}
            bg={selectedTag === tag ? "#80848d" : ""}
            borderRadius='15px'
            border=''
            className={selectedTag === tag ? classes.active : ""}
            _hover={{
              bg: "#80848d",
              boxShadow: `0 4px 15px rgba(128, 132, 141, 0.6)`,
            }}
            _active={{
              bg: "#80848d",
              boxShadow: `0 4px 15px rgba(128, 132, 141, 0.6)`,
            }}
          >
            {tag}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
