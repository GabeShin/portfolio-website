import { PostCategory } from "@/interfaces/posts.interface";
import { IconButton } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

export interface CategoryIconProperties {
  category: PostCategory;
}

export function CategoryIcon({ category }: CategoryIconProperties) {
  if (category === PostCategory.WORK) {
    return (
      <IconButton disabled disableRipple>
        <WorkIcon />
      </IconButton>
    );
  } else if (category === PostCategory.PERSONAL) {
    return (
      <IconButton disabled disableRipple>
        <PersonIcon />
      </IconButton>
    );
  } else {
    // unknown category
    return (
      <IconButton disabled disableRipple>
        <QuestionMarkIcon />
      </IconButton>
    );
  }
}
