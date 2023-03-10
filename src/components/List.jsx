import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  bougthItem,
  modifyListTitle,
} from "../redux/listsReducer";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function List() {
  const dispatch = useDispatch();
  const params = useParams();
  const lists = useSelector((state) => state.lists);
  const [currentList] = lists.filter((list) => list.id === params.listid);
  const [addedItem, setAddedItem] = useState("");
  const [listEditedTitle, setListEditedTitle] = useState("");
  const [moduleEditState, setModuleEditState] = useState(false);
  const id = params.listid;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const text = addedItem;
    dispatch(addItem({ id, text }));
    setAddedItem("");
  };

  const handleRemoveItem = (item) => {
    const text = item.text;

    dispatch(removeItem({ text, id }));
  };

  const handleBought = (index) => {
    dispatch(bougthItem({ index, id }));
  };

  const handleModifyListTitle = (event) => {
    event.preventDefault();
    dispatch(modifyListTitle({ listEditedTitle, id }));
    setListEditedTitle("");
    setModuleEditState(false);
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto w-75">
        <div className=" d-flex flex-row justify-content-center align-items-center h-100">
          <div>
            <div
              className="bg-secondary bg-opacity-10 px-4 py-5 rounded"
              style={{ borderTop: `2px solid ${currentList.color}` }}
            >
              <div className="d-flex justify-content-between align-items-baseline">
                <h1 className="mb-4">{currentList.title}</h1>
                <span>
                  <i
                    className="bi bi-pencil-square text-black cursor-pointer"
                    onClick={() => {
                      setModuleEditState(true);
                      setListEditedTitle(currentList.title);
                    }}
                  ></i>
                </span>
              </div>
              <form className="input-group" onSubmit={handleFormSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control border-end-0 border-1 shadow-none"
                    style={{ fontSize: "0.93rem", border: "1px solid #dee2e6" }}
                    placeholder="Add new item..."
                    value={addedItem}
                    onChange={(event) => setAddedItem(event.target.value)}
                    required
                  />
                  <div className="input-group-append">
                    <button
                      className="input-group-text border border-start-0 border-1 bg-white cursor-pointer"
                      style={{ borderRadius: "0rem 0.3rem 0.3rem 0rem" }}
                      type="submit"
                    >
                      <i className="bi bi-plus-circle-fill"></i>
                    </button>
                  </div>
                </div>
              </form>
              <div>
                <ul className="list-unstyled">
                  {currentList.itemsList.map((item, index) => (
                    <li
                      key={index}
                      className={"d-flex justify-content-between "}
                    >
                      <span>
                        <input
                          type="checkbox"
                          className="me-4 mb-3"
                          checked={item.isBought}
                          onChange={() => handleBought(index)}
                        />
                        <span
                          className={
                            item.isBought ? "text-decoration-line-through" : ""
                          }
                        >
                          {item.text}
                        </span>
                      </span>
                      <span className="me-3">
                        <i
                          className="bi bi-trash3-fill cursor-pointer"
                          onClick={() => {
                            handleRemoveItem(item);
                          }}
                        ></i>
                      </span>
                    </li>
                  ))}
                </ul>
                {currentList.itemsList.length === 0 && (
                  <div className="rounded px-2 py-2 bg-secondary bg-opacity-50 text-white fs-6 text-center w-75 mx-auto">
                    Your list is empty...
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3">
              <Link to="/" className="text-decoration-none">
                <i className="bi bi-arrow-left me-2"></i> Back
              </Link>
            </div>
          </div>
        </div>
      </div>
      {moduleEditState && (
        <div className="position-fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 d-flex justify-content-center align-items-center h-100 w-100">
          <div className="px-4 py-4 bg-white rounded w-75">
            <h4 className="mb-4">Edit title</h4>
            <div>
              <form
                onSubmit={(event) => {
                  handleModifyListTitle(event);
                }}
              >
                <input
                  type="text"
                  placeholder="New list name..."
                  className="form-control "
                  value={listEditedTitle}
                  onChange={(event) => setListEditedTitle(event.target.value)}
                />

                <div className="mt-4 d-flex justify-content-end mb-0">
                  <button
                    className="btn text-primary"
                    onClick={() => setModuleEditState(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
