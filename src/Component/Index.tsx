import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { GetRequest } from "../Utilities/Network/Index";

function Index() {
  const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState("");
  const [result, setResult] = useState([]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const local: any = localStorage.getItem("current");
  //   const ans = JSON.parse(local);
  //   if (!ans) {
  //     navigate("/signin");
  //   }
  // });

  useEffect(() => {
    const cookie: any = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="))
      .reduce(
        (accumulator, [key, value]) => ({
          ...accumulator,
          [key.trim()]: decodeURIComponent(value),
        }),
        {}
      );

    if (!cookie.name) {
      navigate("/signin");
    }
  });

  const _handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        document.cookie = "name=harsh; max-age = -60";
        navigate("/signin");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const callApi = async () => {
      if (isNaN(+input) === true) {
        const response = await GetRequest(
          `https://api.postalpincode.in/postoffice/${input}`
        );
        setResult(response[0].PostOffice);
      } else {
        const response = await GetRequest(
          `https://api.postalpincode.in/pincode/${input}`
        );
        setResult(response[0].PostOffice);
      }
    };
    callApi();
  }, [searchData]);

  const _searchInput = () => {
    setSearchData(input);
  };

  const logOutEvent = () => {
    localStorage.removeItem("current");
    navigate("/signin");
  };

  return (
    <div>
      <button onClick={_handleSignOut}>Log Out</button>
      <div className="mainContainer">
        <div className="upper">
          <input
            type="text"
            placeholder="Enter Post Office"
            onChange={(e: any) => {
              setInput(e.target.value);
            }}
          />
          <button onClick={_searchInput}>Search</button>
        </div>

        <div className="details">
          {!result
            ? []
            : result.map((val: any, key: any) => {
                console.log("values", val);
                return (
                  <div key={key} className="container">
                    <p>Branch Name - {val.Name}</p>
                    <p>Branch Type - {val.BranchType}</p>
                    <p>Branch District - {val.District}</p>
                    <p>Branch Circle - {val.Circle}</p>
                    <p>Branch Pincode - {val.Pincode}</p>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default Index;
