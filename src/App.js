import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import GetData from "./components/GetData/GetData";
import PostData from "./components/PostData/PostData";

function App() {
  const [name, setName] = useState("");
  const [selectedSectorsValues, setSelectedSectorsValues] = useState([]);
  const [selectedSectorsInnerTexts, setSelectedSectorsInnerTexts] = useState(
    []
  );
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [serverResponse, setServerResponse] = useState({});

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSectorChange = (e) => {
    const { options } = e.target;
    const selectedValues = [];
    const selectedInnerText = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
        selectedInnerText.push(options[i].innerText.trim());
      }
    }
    setSelectedSectorsValues((prev) => [...prev, selectedValues]);
    setSelectedSectorsInnerTexts((prev) => [...prev, selectedInnerText]);
  };
  const handleChecked = (e) => {
    setAgreeToTerms(e.target.checked);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      toast.warn("Please enter your name.");
    } else if (!selectedSectorsValues.length) {
      toast.warn("Please select one or more sectors.");
    } else if (!agreeToTerms) {
      toast.warn("Please accept the terms.");
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/users/post`, {
          name,
          sectors: selectedSectorsInnerTexts.flat(),
        })
        .then((response) => {
          setServerResponse(response.data);
          console.log(response.data);
          toast.success("Data saved succcessfully.");
          setName("");
          setSelectedSectorsValues([]);
          setSelectedSectorsInnerTexts([]);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  return (
    <>
      <div className="app">
        <PostData
          handleNameChange={handleNameChange}
          handleSectorChange={handleSectorChange}
          handleSubmit={handleSubmit}
          name={name}
          selectedSectorsValues={selectedSectorsValues}
          handleChecked={handleChecked}
          agreeToTerms={agreeToTerms}
        />
        <GetData data={serverResponse} />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
