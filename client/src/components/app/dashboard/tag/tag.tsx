import './tag.scss';

interface Props {
  name: String;
  onClick: React.MouseEventHandler;
}

const Tag = ({ name, onClick }: Props) => {
  return (
    <button className="tag-button" onClick={onClick}>
      <div className='tag-inner-box'>
        <div >{name}</div>
        <div className="tag-inner-div">X</div>
      </div>
    </button>
  );
};

export default Tag;
