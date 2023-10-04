import AddNotes from "./AddNotes"
import Note from "./Note"

const Home = (props) => {
  const { showAlert } = props;
  return (
    <div>
      <AddNotes showAlert={showAlert} />
      <Note showAlert={showAlert} />
    </div>
  );
}

export default Home
