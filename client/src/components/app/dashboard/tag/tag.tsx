import './tag.scss';

interface Props{
name:String
onClick:React.MouseEventHandler
}

const Tag = ({name,onClick}:Props) => {


  return (
    <button onClick={onClick} >
      {name}
    </button>
)
};

export default Tag;
