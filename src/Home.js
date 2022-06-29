import React, { useState, useEffect } from "react";
import fire from "./config/Config";
import "firebase/database";

function Home() {
  const [notesData, setNotesData] = useState([]);
  const [notes, setNotes] = useState({
    note: "",
    createdAt: "",
    itemId: "",
  });
  const input = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };
  const addNote = (e) => {
    e.preventDefault();
    const uid = fire.auth().currentUser.uid;
    const reference = fire
      .database()
      .ref()

      .child(uid)
      .push();
    reference
      .set({
        notes: notes.note,
        createdAt: Date.now(),
        itemId: reference.key,
        userId: uid,
      })
      .then()
      .catch();
    setNotes({
      ...notes,
      note: "",
      itemId: reference.key,
      createdAt: Date.now(),
    });
    setNotesData([...notesData, { ...notes }]);

    e.preventDefault();
  };

  const [userNotes, setUserNotes] = useState();
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        return fire
          .database()
          .ref()
          .child(uid)
          .on("value", (snap) => {
            setUserNotes(snap.val());
          });
      } else {
        // No user is signed in.
      }
    });
    // TODO: Pull notes from server
    // TODO: Show the notes on the screen
    // FUTURE: Edit and delete
  }, []);

  //
  const deletes = (item, e) => {
    e.preventDefault();
    const uid = fire.auth().currentUser.uid;
    fire.database().ref().child(uid).child(item.itemId).remove();
  };

  //
  const logout = () => {
    fire.auth().signOut();
  };
  //
  //

  const edits = (item, e) => {
    const notes = prompt("enter new note", "");
    if (notes === null || notes === "") {
      const ddd = "no change";
      console.log(ddd);
    } else {
      const uid = fire.auth().currentUser.uid;
      fire.database().ref().child(uid).child(item.itemId).update({
        notes: notes,
      });
    }
  };

  return (
    <div className="home">
      <h1 className="title">You Are Home</h1>
      <div className="noteinput">
        <form onSubmit={addNote}>
          <input
            className="noteInput"
            type="text"
            name="note"
            onChange={input}
            value={notes.note}
          ></input>

          <input className="noteButton" type="submit" value="Add Note" />
        </form>
      </div>
      <div>
        {notesData.map((item) => (
          <ul className="noteList">
            <li>{item.note}</li>
            <span className="delBut" onClick={(e) => deletes(item, e)}>
              x
            </span>
          </ul>
        ))}
      </div>
      <div className="userNotes">
        {userNotes ? (
          Object.values(userNotes).map((item) => (
            <ul key={item.itemId} className="noteList">
              <li>{item.notes}</li>
              <div>
                <span className="delBut" onClick={(e) => deletes(item, e)}>
                  x
                </span>
                <span onClick={(e) => edits(item, e)}>edit</span>
              </div>
            </ul>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="logot">
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
