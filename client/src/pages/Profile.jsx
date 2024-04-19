import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePre] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatcher = useDispatch();
  console.log(filePerc);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    if (!file || !file.name) {
      console.error("Invalid file object or missing file name.");
      return;
    }

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePre(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({
            ...prevData,
            avatar: downloadURL,
          }));
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      const { success, message } = data;
      if (success) {
        dispatch(updateUserSuccess(message));
        return;
      }
      dispatch(updateUserFailure(message));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      console.log(res);
    }
  };
  const handleSignOut = async (e) => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signOut`, {
        method: "POST",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(message));
        return;
      }
      dispatch(signOutSuccess(message));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  const handleShowListing = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };
  console.log(formData);

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="self-center object-cover w-32 h-32 mt-2 rounded-full cursor-pointer bg-slate-400"
        />
        <p className="self-center text-sm">
          {fileUploadError ? (
            <span className="text-red-700">
              Error uploading image (image must be less than 2 MB).
            </span>
          ) : filePerc >= 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="username"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="p-3 border rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          className="p-3 border rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="p-3 border rounded-lg"
        />
        <button
          disabled={loading}
          className="p-3 text-center text-white uppercase rounded-lg hover:opacity-95"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link className="p-3 text-white bg-green-700 " to={"/create-listing"}>
          create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>

      <p className="mt-5 text-red-700">{error ? error.message : ""}</p>
      <p className="mt-5 text-green-700">
        {updateSuccess ? "user is update Successfully!" : ""}
      </p>
      <button onClick={handleShowListing} className="w-full text-green-700">
        Show all listings
      </button>
      <p className="mt-5 text-red-700">
        {showListingsError ? "Something went wrong" : ""}
      </p>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-center mt-7">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <Link key={listing._id} to={`/listing/${listing._id}`}>
              <div className="flex items-center justify-between gap-4 p-3 border rounded-lg">
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="object-contain w-16 h-16"
                />
                <div className="flex-1 font-semibold truncate text-slate-700 hover:underline">
                  <p>{listing.name}</p>
                </div>
                <div className="flex flex-col item-center">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 uppercase"
                  >
                    Delete
                  </button>
                  <button className="text-green-700 uppercase">Edit</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
