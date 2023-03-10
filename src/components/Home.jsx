import { useSelector, useDispatch } from "react-redux";
import { addList, removeList } from "../redux/listsReducer";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { SliderPicker } from "react-color";

export default function Home() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [moduleState, setModuleState] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [listColor, setListColor] = useState("#0d6efd");
  const handleAddList = (event) => {
    event.preventDefault();
    dispatch(addList({ title: listTitle, color: listColor }));
    setListTitle("");
    setModuleState(false);
  };

  const handleRemoveList = (id) => {
    dispatch(removeList({ id }));
  };

  return (
    <>
      <Navbar />
      <div className="mb-5 row">
        <div className="col-10 mx-auto">
          {lists.map((list) => {
            const boughtItems = list.itemsList.filter(
              (item) => item.isBought
            ).length;
            return (
              <div
                key={list.id}
                className="col-12 mb-3 bg-secondary bg-opacity-10 px-4 py-3 rounded shadow-sm"
                style={{ borderTop: `2px solid ${list.color}` }}
              >
                <Link to={`/list/${list.id}`} className="text-decoration-none">
                  <h3 className="mb-1 text-dark">
                    {list.title}{" "}
                    <span className="fs-5 ms-1">{`(${boughtItems}/${list.itemsList.length})`}</span>{" "}
                  </h3>
                </Link>
                <div className="d-flex justify-content-between">
                  <Link
                    to={`/list/${list.id}`}
                    className="text-decoration-none"
                  >
                    <div>
                      <small className="text-secondary">
                        Created: {list.createdAt}
                      </small>
                    </div>
                  </Link>
                  <div>
                    <span>
                      <i
                        className="bi bi-trash3-fill text-black cursor-pointer"
                        onClick={() => {
                          handleRemoveList(list.id);
                        }}
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {lists.length === 0 && (
            <div className="rounded px-3 py-3 bg-secondary bg-opacity-50 text-white fs-6 text-center w-75 mx-auto ">
              You have created no lists yet!
            </div>
          )}

          <div
            className="col-2 mt-4 bg-black rounded-circle py-2 px-0 fs-4 text-center text-white shadow"
            style={{ width: "3.3rem" }}
            onClick={() => setModuleState(true)}
          >
            +
          </div>
        </div>
      </div>
      {moduleState && (
        <div className="position-fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 d-flex justify-content-center align-items-center h-100 w-100">
          <div className="px-4 py-4 bg-white rounded w-75">
            <h4 className="mb-4">New List</h4>
            <div>
              <form
                onSubmit={(event) => {
                  handleAddList(event);
                }}
              >
                <label
                  htmlFor="text"
                  className="form-label text-secondary ms-1"
                >
                  List title:
                </label>
                <input
                  type="text"
                  placeholder="Enter list title..."
                  className="form-control shadow-none"
                  style={{ fontSize: "0.93rem", border: "1px solid #dee2e6" }}
                  value={listTitle}
                  onChange={(event) => setListTitle(event.target.value)}
                />
                <div>
                  <label
                    htmlFor="listColor"
                    className="form-label mt-3 text-secondary ms-1"
                  >
                    List color:
                  </label>
                  <div className="border border-1 py-3 px-2 rounded">
                    <SliderPicker
                      id="listColor"
                      color={listColor}
                      className="w-50"
                      onChange={(color) => setListColor(color.hex)}
                    />
                  </div>
                </div>
                <div className="mt-4 d-flex justify-content-end mb-0">
                  <button
                    className="btn text-primary"
                    onClick={() => setModuleState(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Create
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
