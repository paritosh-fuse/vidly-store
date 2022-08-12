import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const Like = ({ liked, handleLike }) => {
  return (
    <FontAwesomeIcon
      onClick={handleLike}
      style={{
        color: liked ? "red" : "grey",
        cursor: "pointer",
      }}
      icon={faHeart}
    />
  );
};

export default Like;
