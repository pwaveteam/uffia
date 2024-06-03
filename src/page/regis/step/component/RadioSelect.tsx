import styled from "styled-components";
import Tooltip from "../../../../module/Tooltip";
import Icon from "../../../../module/Icon";

const Wrap = styled.div``;

const Info = styled.pre``;

const VideoInfo = styled.div``;

const RadioSelect = (props: any) => {
  const renderMessage = () => {
    if (props.item.infomation_type === "text") {
      return (
        <Info>
          <p>
            <b>{props.item.infomation_title}</b>
          </p>
          <br />
          {props.item.infomation}
        </Info>
      );
}

    if (props.item.infomation_type === "video") {
      return (
        <VideoInfo>
          <video muted autoPlay width={300}>
            <source
              src={process.env.REACT_APP_IMAGE_URL + props.item.infomation}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </VideoInfo>
      );
    }

    if (props.item.infomation_type === "image") {
      return (
        <>
          <b>{props.item.infomation_title}</b>
          <img
            width={300}
            src={process.env.REACT_APP_IMAGE_URL + props.item.infomation}
          />
        </>
      );
    }
  };

  return (
    <Wrap>
      <label>
        <input
          type={"radio"}
          name={props.name}
          value={props.value}
          checked={props.checked}
          onChange={props.onChange}
        />
        {convertToTitleCase(props.title)}
      </label>
      {props.item.infomation && (
        <Tooltip message={renderMessage()}>
          &nbsp;&nbsp;
          <Icon icon="info" width={15} />
        </Tooltip>
      )}
    </Wrap>
  );
};

export default RadioSelect;

export function convertToTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(/_| /)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
