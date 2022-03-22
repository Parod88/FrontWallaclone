import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../components/Button/Button';
import { userUpdate } from '../../../../store/actions';
import { getUserAuth, getUserData } from '../../../../store/selectors/selectors';
import { uploadFileProfile } from '../../../../api/services/uploadFileService';

function TabProfileEdit() {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);

  const [userConfigData, setUserConfigData] = useState({
    imageAvatar: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    personalDescription: ''
  });

  const handleChange = ({ target: { value, name } }) => {
    setUserConfigData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const [imageAvatar, setImageAvatar] = useState('');

  const uploadImageProfile = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log('File', file);
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    try {
      const response = await uploadFileProfile(bodyFormData);
      setImageAvatar(response.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUserConfigData(userData);
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    dispatch(userUpdate(userConfigData, userData._id));
  };

  return (
    <div id="tab-profile-edit">
      <div>
        <p className="email-info">Your email is: {userData.email}</p>
      </div>
      <div className="avatar">
        <div>
          <img src={userData.imageAvatar} />
        </div>
        <div>
          <h5>Your avatar</h5>
          <p>PNG or JPG no bigger then 1000px wide and tall.</p>
          <div className="input-image">
            <input
              id="imageAvatar"
              type="file"
              accept=".jpg,.png"
              label="Choose Image"
              onChange={uploadImageProfile}
            ></input>
          </div>
        </div>
      </div>

      <div className="grid-three-cols">
        <div className="input-item">
          <label>Complete Name</label>
          <input
            className="input"
            name="name"
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            value={userConfigData.name}
            onChange={handleChange}
          ></input>
        </div>
        <div className="input-item">
          <label>Phone</label>
          <input
            className="input"
            name="phone"
            type="tel"
            id="phone"
            placeholder="Enter phone"
            // required
            value={userConfigData.phone}
            onChange={handleChange}
          ></input>
        </div>
        <div className="input-item">
          <label>Location</label>
          <input
            className="input"
            name="location"
            type="text"
            id="location"
            placeholder="Enter yout direcction"
            // required
            value={userConfigData.location}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div>
        <div className="input-item">
          <label>Personal Description</label>
          <textarea
            className="input"
            name="personalDescription"
            type="text"
            id="personalDescription"
            placeholder="Enter a text descrtiption"
            // required
            value={userConfigData.personalDescription}
            onChange={handleChange}
            rows="4"
            cols="50"
            // onChange={}
          ></textarea>
        </div>
      </div>

      <Button secondary onClick={handleUpdate}>
        Update Profile
      </Button>
    </div>
  );
}

export default TabProfileEdit;
