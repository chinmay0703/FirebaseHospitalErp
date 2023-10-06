import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Import Firebase auth instance

function Signup() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, password } = formData;

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      await user.updateProfile({
        displayName: `${firstname} ${lastname}`,
      });

      console.log('User registered:', user);
      toast.success('Signup Successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.error('Error signing up');
    }
  };

  const activeItem = 'Signup';
  const setActiveItem = (itemName) => {
    console.log(`Setting active item to ${itemName}`);
  };

  return (
    <div className="App">
      <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="containerr my-4"> {/* Add margin here */}
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={handleSubmit}>
              <div className="login__field">
                <input
                  type="text"
                  className="login__input my-2"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Firstname"
                  required
                />
                <input
                  type="text"
                  className="login__input my-2"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Lastname"
                  required
                />

                <input
                  type="email"
                  className="login__input my-2"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />

                <input
                  type="password"
                  className="login__input my-2"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
              <button className="button login__submit" type="submit">
                <span className="button__text">Signup Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Signup;
