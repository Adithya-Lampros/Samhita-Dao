import React, { useEffect, useState } from "react";
import "../styles/alldatadaos.css";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ContractFactory, ethers } from "ethers";
import dataDaoFactory from "../contracts/artifacts/dataDaoFactory.json";

const dataDaoFactoryContract = "0x0caC8C986452628Ed38483bcEE0D1cF85816946D";

function AllDataDaos({ setSingleDataDao, setDatadaos, setDaoAddress }) {
  const [allDataDaos, setDataDaos] = useState([]);

  const getContract = async () => {
    try {
      const { ethereum } = window;
      console.log("in");
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        console.log("switch case for this case is: " + chainId);
        if (chainId === 3141) {
          const contract = new ethers.Contract(
            dataDaoFactoryContract,
            dataDaoFactory.abi,
            provider
          );
          console.log(contract);
          return contract;
        } else {
          alert("Please connect to the Mumbai Testnet Network!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDataDaos = async () => {
    const contract = await getContract();
    const dataDaos = await contract.getAllDataDaos();
    console.log(dataDaos);
    setDataDaos(dataDaos);
  };

  useEffect(() => {
    getAllDataDaos();
  }, []);

  return (
    <>
      <div className="all-datadao-main-div">
        <div className="all-datadao-div">
          <div className="all-datadao-section1">
            <h1 className="all-datadao-title">All DataDAOs</h1>
            <p className="all-datadao-title">
              All the dataDAOs on the platform
            </p>
          </div>

          <div className="all-datadao-section2">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid container item spacing={3}>
                  <React.Fragment>
                    {allDataDaos.length > 0 ? (
                      allDataDaos.map((dao, i) => (
                        <Grid item xs={4}>
                          {" "}
                          <div className="proposal-details">
                            <table>
                              <thead>
                                <tr>
                                  <th colSpan={2}>{dao.dataDaoName}</th>
                                </tr>
                              </thead>
                              <tr>
                                <td>
                                  {" "}
                                  <p>{dao.dataDaoDescription} </p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="datadao-address">
                                    <h3>
                                      {dao.dataDaoAddress.substring(0, 6) +
                                        "..." +
                                        dao.dataDaoAddress.substring(
                                          dao.dataDaoAddress.length - 5,
                                          dao.dataDaoAddress.length
                                        )}
                                    </h3>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      enable-background="new 0 0 24 24"
                                      height="18px"
                                      viewBox="0 0 24 24"
                                      width="18px"
                                      fill="#4c2ffd"
                                      style={{ margin: "0px 20px" }}
                                    >
                                      <g>
                                        <rect
                                          fill="none"
                                          height="24"
                                          width="24"
                                        />
                                      </g>
                                      <g>
                                        <path d="M15,20H5V7c0-0.55-0.45-1-1-1h0C3.45,6,3,6.45,3,7v13c0,1.1,0.9,2,2,2h10c0.55,0,1-0.45,1-1v0C16,20.45,15.55,20,15,20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z" />
                                      </g>
                                    </svg>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ textAlign: "center" }}>
                                  <button
                                    className="view-more-all-dao"
                                    onClick={() => {
                                      setSingleDataDao(true);
                                      setDatadaos(false);
                                      setDaoAddress(dao.dataDaoAddress);
                                    }}
                                  >
                                    View More
                                  </button>
                                  <button className="view-more-all-dao">
                                    Join
                                  </button>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </Grid>
                      ))
                    ) : (
                      <h3 className="artist-streams">No Data Daos available</h3>
                    )}
                  </React.Fragment>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllDataDaos;
