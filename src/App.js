import { useState } from "react";
import "./App.css";
import { toast } from "react-toastify";

function App() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [gender, setGender] = useState("male");

  const isValidate = () => {
    let isProceed = true;
    let errormessage = "Please Enter the value in";

    if (name === null || name === "") {
      isProceed = false;
      window.alert((errormessage += " Full Name"));
    }
    if (email === null || email === "") {
      isProceed = false;
      window.alert((errormessage += " Email"));
    }
    if (phone === null || phone === "") {
      isProceed = false;
      window.alert((errormessage += " Phone"));
    }

    if (!isProceed) {
      // toast.warning(errormessage);
      window.alert(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isProceed = false;
        toast.warning("Please Enter the valid Email");
        window.alert("Please Enter the valid Email");
      }
      if (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone)) {
      } else {
        isProceed = false;
        toast.warning("Please Enter the valid Email");
        window.alert("Please Enter the valid Phone No");
      }
    }
    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      fields: {
        name: name,
        email: email,
        phone: phone,
        gender: gender,
      },
    };
    // console.log(regObj);

    if (isValidate()) {
      fetch("https://api.airtable.com/v0/appSixdxv6AovHhWY/UserDetails", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization:
            "Bearer pat16MgPN1dPz77vR.a0a4a77e60a34072bbe566964e01a57ea63a7a326cdd7738cb5ba3636ab9686e",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          toast.success("Registered Successfully");

          if (res.status === 200) {
            console.log("Registered Successfully");
            window.alert("Registered Successfully");
            setName("");
            setEmail("");
            setPhone("");
            setGender("male");
          } else {
            window.alert("Error in data sending to Airtable");
          }
        })

        .catch((err) => {
          toast.error("Failed:" + err.message);
        });
    }
  };
  return (
    <div className="App">
      <form className="container" onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header">
            <h1>User Validation</h1>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>
                Full Name<span className="errmsg">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>
                Email<span className="errmsg">*</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>
                Phone<span className="errmsg">*</span>
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="phone"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <br />

              <select
                name="gender"
                id="gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
