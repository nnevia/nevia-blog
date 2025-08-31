import { Button, ButtonGroup } from "@chakra-ui/react";
import classes from "./category-filter.module.css";

export default function CategoryFilter({
  tags,
  onSelectTag,
  selectedTag,
}: {
  tags: string[];
  onSelectTag: (tag: string) => void;
  selectedTag: string;
}) {
  const tagList = ["all", ...new Set(tags.flatMap((tag) => tag.split(",")))] as string[];

  return (
    <div className={classes.categoryFilter}>
      <ButtonGroup variant='outline' spacing='3'>
        {tagList.map((tag) => (
          <Button
            key={tag}
            onClick={() => onSelectTag(tag)}
            bg={selectedTag === tag ? "#80848d" : ""}
            borderRadius='15px'
            color={selectedTag === tag ? "" : ""}
            border=''
            className={selectedTag === tag ? classes.active : ""}
            _hover={{
              bg: "#80848d",
              transform: "translateY(-2px) scale(1.04)",
              opacity: "1",
              boxShadow: "0 4px 12px 0 rgba(128, 132, 141, 0.10)",
            }}
            _active={{
              bg: "#80848d",
            }}
          >
            {tag}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
