import { DataGrid } from '@mui/x-data-grid';
import './App.scss';
import { HALFMONTHS, MONTHS, ZONES, columnsMonthsPY, columnsSuggest, columnsZonePY } from './Constants';
import { useState, useRef } from 'react';
import ZonesPY from './ZonesPY';
import MonthsPY from './MonthsPY';
import { BarChart } from '@mui/x-charts/BarChart';
import LinearProgress from '@mui/material/LinearProgress';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ZonesPM from './ZonesPM';
import Suggestion from './Suggestion';
function App() {
  const [monthsPerYear, setMonthsPerYear] = useState([]);
  const [zonesPerYearState, setZonesPerYearState] = useState([]);
  const [zonesPerYearNameState, setZonesPerYearNameState] = useState([]);
  const [zonesPerMonthState, setZonesPerMonthState] = useState([]);
  const [monthsNameState, setMonthNameState] = useState([]);

  const [radioB, setRadioB] = useState("monthsPY");
  const [durationOfStayState, setDurationOfStayState] = useState([]);
  const [numberOfGuestsState, setNumberofGuestsState] = useState([]);
  const [popularityState, setPopularityState] = useState([]);
  const [profitState, setProfitState] = useState([]);

  const [durationOfStayStateMPY, setDurationOfStayStateMPY] = useState([]);
  const [numberOfGuestsStateMPY, setNumberofGuestsStateMPY] = useState([]);
  const [popularityStateMPY, setPopularityStateMPY] = useState([]);
  const [profitStateMPY, setProfitStateMPY] = useState([]);

  const [fetchedAnalysis, setFetchedAnalysis] = useState("OK");
  const [closeOrOpen, setCloseOrOpen] = useState(true);

  const checkboxesRef = useRef([]);

  const checkboxesRefSuggest = useRef([]);

  const inputRefProfit = useRef([]);

  const inputRefVisitors = useRef([]);

  let chosenZonesAnalysis = []
  let chosenMonthsAnalysis = []
  let chosenMonthsSuggest = []


  function handleChangeMonthsAnalysis(e) {
    var chosen = e.target.value;
    if (chosen === "January") {
      chosenMonthsAnalysis.push("Jan")
    }
    if (chosen === "February") {
      chosenMonthsAnalysis.push("Feb")
    }
    if (chosen === "March") {
      chosenMonthsAnalysis.push("Mar")
    }
    if (chosen === "April") {
      chosenMonthsAnalysis.push("Apr")
    }
    if (chosen === "May") {
      chosenMonthsAnalysis.push("May")
    }
    if (chosen === "June") {
      chosenMonthsAnalysis.push("Jun")
    }
    if (chosen === "July") {
      chosenMonthsAnalysis.push("Jul")
    }
    if (chosen === "August") {
      chosenMonthsAnalysis.push("Aug")
    }
    if (chosen === "September") {
      chosenMonthsAnalysis.push("Sep")
    }
    if (chosen === "October") {
      chosenMonthsAnalysis.push("Oct")
    }
    if (chosen === "November") {
      chosenMonthsAnalysis.push("Nov")
    }
    if (chosen === "December") {
      chosenMonthsAnalysis.push("Dec")
    }
    console.log(chosenMonthsAnalysis)
  }


  function handleChangeZones(e) {
    chosenZonesAnalysis.push(e.target.value)
  }

  let dataAnalysis =
  {
    "year": 2021,
    "month": chosenMonthsAnalysis,

    "ZoneToBeDeleted": chosenZonesAnalysis
  }



  var finalRes;
  var finalResSuggest;
  var zonesPerYear = [];
  var zonesPerYearName = [];
  var meMonthsPerYear = [];
  var meMonthsPerYearName = [];
  var zonesPerMonth = [];
  var durationOfStay = [];
  var numberOfGuests = [];
  var popularity = [];
  var profit = [];

  //MPY variables
  var durationOfStayMPY = [];
  var numberOfGuestsMPY = [];
  var popularityMPY = [];
  var profitMPY = [];


  var memonths = [];
  var mezones = [];


  async function handleSubmitAnalysis() {
    setFetchedAnalysis("No")
    if (chosenMonthsAnalysis.length === 0) {
      alert("Please pick a least one month")
      setFetchedAnalysis("OK")
    }
    if (chosenMonthsAnalysis.length > 0) {


      chosenZonesAnalysis = []
      chosenMonthsAnalysis = []
      console.log(dataAnalysis)
      //https://demo4-svc.default.svc.cluster.local:5000/analysis
      //http://demo4-svc.ai4pp.svc.cluster.local:5000/analysis
      // /api/analysis
      await fetch('https://vpme.fedcloud-tf.fedcloud.eu/dashboard-51/analysis', {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify(dataAnalysis),
      }).then(response => response.json()).then(data => finalRes = data)

      if (finalRes !== null) {
        setFetchedAnalysis("OK")
        // Clearing all checkb0xes
        checkboxesRef.current.forEach((checkbox) => {
          if (checkbox !== null) {
            checkbox.checked = false;
          }
        });
      }
      //zones Per Month
      var meProblem = (Object.keys(finalRes.ZonesPerMonth))



      for (const keys in finalRes.ZonesPerMonth) {
        // console.log(keys)
        // console.log(keys, finalRes.ZonesPerMonth[keys.toString()])
        var letsVar = finalRes.ZonesPerMonth[keys.toString()]
        for (let i = 0; i < letsVar.length; i++) {
          zonesPerMonth.push(new ZonesPM(i, keys, letsVar[i].Zone, letsVar[i]["Duration of Stay in hours"], letsVar[i]["Number of Guests"], letsVar[i].Popularity, letsVar[i].Profit))
        }
      }

      setZonesPerMonthState([...zonesPerMonth]);
      // console.log(zonesPerMonthState)

      //MonthsPerYear

      memonths = (Object.keys(finalRes.MonthsPerYear))
      console.log(memonths)
      for (let i = 0; i < memonths.length; i++) {
        var month = memonths[i]
        meMonthsPerYearName.push(memonths[i]);
        meMonthsPerYear.push(new MonthsPY(i, month, finalRes.MonthsPerYear[memonths[i]]["Duration of Stay in hours"], finalRes.MonthsPerYear[memonths[i]]["Number of Guests"], finalRes.MonthsPerYear[memonths[i]].Popularity, finalRes.MonthsPerYear[memonths[i]].Profit))
        durationOfStayMPY.push(finalRes.MonthsPerYear[memonths[i]]["Duration of Stay in hours"])
        numberOfGuestsMPY.push(finalRes.MonthsPerYear[memonths[i]]["Number of Guests"])
        popularityMPY.push(finalRes.MonthsPerYear[memonths[i]].Popularity)
        profitMPY.push(finalRes.MonthsPerYear[memonths[i]].Profit)
      }

      setMonthsPerYear([...meMonthsPerYear])
      setNumberofGuestsStateMPY([...numberOfGuestsMPY])
      setDurationOfStayStateMPY([...durationOfStayMPY])
      setProfitStateMPY([...profitMPY])
      setPopularityStateMPY([...popularityMPY])
      setMonthNameState([...meMonthsPerYearName])

      //Zones Per Year
      mezones = (Object.keys(finalRes.ZonesPerYear));

      for (let i = 0; i < mezones.length; i++) {

        zonesPerYear.push(new ZonesPY(i, mezones[i], finalRes.ZonesPerYear[mezones[i]]["Duration of Stay in hours"], finalRes.ZonesPerYear[mezones[i]]["Number of Guests"], finalRes.ZonesPerYear[mezones[i]].Popularity, finalRes.ZonesPerYear[mezones[i]].Profit))
        durationOfStay.push(finalRes.ZonesPerYear[mezones[i]]["Duration of Stay in hours"])
        numberOfGuests.push(finalRes.ZonesPerYear[mezones[i]]["Number of Guests"])
        popularity.push(finalRes.ZonesPerYear[mezones[i]].Popularity)
        profit.push(finalRes.ZonesPerYear[mezones[i]].Profit)
        zonesPerYearName.push(mezones[i]);
      }
      //This is for Zones per Year
      // console.log(durationOfStay)
      setZonesPerYearNameState([...zonesPerYearName])
      setNumberofGuestsState([...numberOfGuests])
      setDurationOfStayState([...durationOfStay])
      setZonesPerYearState([...zonesPerYear])
      setProfitState([...profit])
      setPopularityState([...popularity])
    }
  }




  function handleSidebarClick() {
    setCloseOrOpen(current => !current);
  }




  function handleChangeMonths(e) {
    var chosen = e.target.value;
    if (chosen === "January") {
      chosenMonthsSuggest.push("Jan")
    }
    if (chosen === "February") {
      chosenMonthsSuggest.push("Feb")
    }
    if (chosen === "March") {
      chosenMonthsSuggest.push("Mar")
    }
    if (chosen === "April") {
      chosenMonthsSuggest.push("Apr")
    }
    if (chosen === "May") {
      chosenMonthsSuggest.push("May")
    }
    if (chosen === "June") {
      chosenMonthsSuggest.push("Jun")
    }
    if (chosen === "July") {
      chosenMonthsSuggest.push("Jul")
    }
    if (chosen === "August") {
      chosenMonthsSuggest.push("Aug")
    }
    if (chosen === "September") {
      chosenMonthsSuggest.push("Sep")
    }
    if (chosen === "October") {
      chosenMonthsSuggest.push("Oct")
    }
    if (chosen === "November") {
      chosenMonthsSuggest.push("Nov")
    }
    if (chosen === "December") {
      chosenMonthsSuggest.push("Dec")
    }
  }

  function handleRadio(e) {
    setRadioB(e.target.value);
  }


  function handleChangeTargetProfit(e) {
    dataSuggestions.target_profit[e.target.name] = parseInt(e.target.value);
  }


  function handleChangeTargetVisitors(e) {
    dataSuggestions.expected_visitors[e.target.name] = parseInt(e.target.value)
  }



  const  [suggestionResultsForTable, setSuggestionResultsForTable]=useState([]);
  async function handleSubmitSuggestions() {
    //chosenMonthsSuggest=[];
    console.log(dataSuggestions, chosenMonthsSuggest)
    // clear all arrays and objects
    chosenMonthsSuggest = [];
    // await fetch(`api/suggestion/${suggetionUrlMonth}`, {
    await fetch(`https://vpme.fedcloud-tf.fedcloud.eu/dashboard-51/suggestion/${suggetionUrlMonth}`, {
      headers: { "Content-Type": "application/json" },
      method: 'POST',
      body: JSON.stringify(dataSuggestions),
    }).then(response => response.json()).then(data => finalResSuggest = data)

    console.log(finalResSuggest.length)
    for (let i=0;i<finalResSuggest.length;i++)
    {
      console.log(i,finalResSuggest[i])

      setSuggestionResultsForTable(current=>[...current,new Suggestion(i, finalResSuggest[i])])
    }


    checkboxesRefSuggest.current.forEach((checkbox) => {
      if (checkbox !== null) {
        checkbox.checked = false;
      }
    });
    inputRefProfit.current.forEach((input) => {
      if (input !== "" && input !== null) {
        input.value = "";
      }
    });
    inputRefVisitors.current.forEach((input) => {
      if (input !== "" && input !== null) {
        input.value = "";
      }
    });
  }

  let dataSuggestions =
  {
    "year": 2021,
    "month": ["Apr", "May","Jun","Jul", "Aug","Sep", "Oct", "Nov", "Dec"],
    "ZoneToBeDeleted": [],
    "target_profit": {

    },
    "expected_visitors": {

    }

  }


  let suggetionUrlMonth = "0"
  function calculateMonthsSuggestion(e) {
    var chosen = e.target.value;

    if (chosen === "April") {
      suggetionUrlMonth = "0"
    }
    if (chosen === "May") {
      suggetionUrlMonth = "1"
    }
    if (chosen === "June") {
      suggetionUrlMonth = "2"
    }
    if (chosen === "July") {
      suggetionUrlMonth="3"
    }
    if (chosen === "August") {
      suggetionUrlMonth="4"
    }
    if (chosen === "September") {
      suggetionUrlMonth="5"
    }
    if (chosen === "October") {
      suggetionUrlMonth="6"
    }
    if (chosen === "November") {
      suggetionUrlMonth="7"
    }
    if (chosen === "December") {
      suggetionUrlMonth="8"
    }
    console.log(suggetionUrlMonth)
  }
  return (
    <div className="App">
      {/* {closeOrOpen ? <div className='mySidebar'>
        <ul>
          <li>Suggestions</li>
          <li>Analysis</li>
        </ul>

      </div> : <></>}
      {closeOrOpen ? <div onClick={handleSidebarClick} style={{ marginTop: "2px", marginBottom: "2px", background: "rgba(109, 109, 109, 0.4)ue", borderLeft: "1px solid rgba(109, 109, 109, 0.3)", borderRight: "1px solid rgba(109, 109, 109, 0.3)", borderRadius: "0px 5px 5px 0px" }}>
        <KeyboardDoubleArrowLeftIcon />
      </div> : <div onClick={handleSidebarClick} style={{ transition: "1s", marginTop: "2px", marginBottom: "2px", background: "rgba(109, 109, 109, 0.4)", borderLeft: "1px solid rgba(109, 109, 109, 0.3)", borderRight: "1px solid rgba(109, 109, 109, 0.3)", borderRadius: "0px 5px 5px 0px" }}>
        <KeyboardDoubleArrowRightIcon />
      </div>} */}


      <div className="myViews">
        <div className='suggestions'>
          <div className='inputs'>
            <h3 style={{ textAlign: "center" }}>Required Input for Suggestions</h3>
            <div className='actual_input'>
              <div className='months_input'>
                <h5 style={{ textAlign: "center" }}>Months of Interest</h5>
                {/* {MONTHS.map((month) =>
                  <div >
                    <input type="checkbox" ref={(element) => { checkboxesRefSuggest.current.push(element); }} value={month} onChange={handleChangeMonths} />
                    <label >{month}</label>
                  </div>
                )} */}
                <select style={{ textAlign: "center", width: "100%" }} onChange={calculateMonthsSuggestion}>
                  <option>Choose a Month</option>
                  {HALFMONTHS.map((month) =>
                    <option>{month}</option>)}
                </select>
              </div>
              <div className='target_profit_and_visitors'>
                <h5 style={{ textAlign: "center" }}>Values for each Zone</h5>
                {ZONES.map((zone) =>
                  <div>
                    <label style={{ display: "flex" }}>{zone}</label>
                    <input type="number" ref={(element) => { inputRefProfit.current.push(element); }} placeholder='target profit' name={zone} onChange={handleChangeTargetProfit} />
                    <input type="number" ref={(element) => { inputRefVisitors.current.push(element); }} placeholder='expercted visitors' name={zone} onChange={handleChangeTargetVisitors} />
                  </div>
                )}
                <button onClick={handleSubmitSuggestions}>Submit</button>
              </div>

            </div>

          </div>
          <div className='results'>
            <h3 style={{ textAlign: "center" }}>Suggestions</h3>
            <div className='outer_results' >


              <DataGrid
                pageSize={5}
                rows={suggestionResultsForTable}
                columns={columnsSuggest} />
            </div>
          </div>
        </div>

        <div className='analysis' >
          <div className='inputs'>
            <h3 style={{ textAlign: "center" }}>Required Input for Analysis</h3>
            <div className='actual_input'>
              <div className='months_input'>
                <h5 style={{ textAlign: "center" }}>Months of Interest</h5>
                {MONTHS.map((month) =>
                  <div >
                    <input type="checkbox" ref={(element) => { checkboxesRef.current.push(element); }} value={month} onChange={handleChangeMonthsAnalysis} />
                    <label >{month}</label>
                  </div>
                )}
              </div>
              <div className='deleted_zones'>
                <h5 style={{ textAlign: "center" }}>Delete choosen Zones</h5>
                {ZONES.map((zone) =>
                  <div>
                    <input type="checkbox" ref={(element) => { checkboxesRef.current.push(element); }} value={zone} onChange={handleChangeZones} />
                    <label style={{ display: "flex" }}>{zone}</label>
                  </div>
                )}
                {fetchedAnalysis === "OK" ? <button onClick={handleSubmitAnalysis}>Submit</button> : <button> <LinearProgress /></button>}
              </div>

            </div>

          </div>
          <div className='results'>
            <h3 style={{ textAlign: "center" }}>Analysis</h3>
            <div className='outer_results'>

              <div className='actual_results'>
                <div style={{ padding: "5px", width: "90%", display: 'flex', alignItems: "center", justifyContent: "center", margin: "5px", borderRadius: "5px" }}>
                  <input style={{ marginLeft: "30px" }} onClick={handleRadio} type="radio" value="monthsPY" name="maRadio" defaultChecked={true} /> Months Per Year
                  <input style={{ marginLeft: "30px" }} onClick={handleRadio} type="radio" value="zonesPY" name="maRadio" /> Zones Per Year
                  {/* <input style={{ marginLeft: "30px" }} onClick={handleRadio} type="radio" value="Other" name="maRadio" /> Zones Per Month */}
                  {radioB === "Other" ? <select style={{ marginLeft: "30px" }} onChange={e => console.log(e.target.value)}>
                    <option>Choose a Month</option>
                    {MONTHS.map((month) =>
                      <option>{month}</option>)}
                  </select> : <></>}
                </div>
                <div style={{ height: "90%", width: "100%" }}>
                  {radioB === "monthsPY" ? <div style={{ height: "90%", width: "100%", backgroundColor: "rgba(170, 240, 158, 0.3)" }}>
                    <DataGrid
                      pageSize={5}
                      rows={monthsPerYear}
                      columns={columnsMonthsPY} /></div> :

                    (radioB === "zonesPY" ? <div style={{ height: "90%", width: "100%", backgroundColor: "rgba(164, 176, 237, 0.3)" }}><DataGrid
                      pageSize={5}
                      rows={zonesPerYearState}
                      columns={columnsZonePY} /></div> :
                      <></>)}
                </div>

              </div>

            </div>
          </div>

        </div>
        <div className="charts_analysis" style={{ width: "100%", }}>

          {durationOfStayState.length > 0 && radioB === "zonesPY" ?
            <><div style={{ display: 'flex', width: "99%", height: "350px", borderRadius: "5px", boxShadow: "-5px 3px 14px 0px rgba(109, 109, 109, 0.85)", margin: "5px" }}>
              <h5 style={{ marginLeft: "5px" }}>Duration</h5>
              <BarChart
                xAxis={[
                  {
                    id: 'barCategories',
                    data: zonesPerYearNameState,
                    scaleType: 'band',
                    tickLabelStyle: {
                      angle: -35, fontSize: 12, textAnchor: 'end',
                    },
                  },
                ]}
                margin={{ bottom: 70 }}
                series={[
                  {
                    data: durationOfStayState,

                  },
                ]}

              />
              <h5 style={{ marginLeft: "5px" }}>Guests</h5>
              <BarChart
                xAxis={[
                  {
                    id: 'barCategories',
                    data: zonesPerYearNameState,
                    scaleType: 'band',
                    tickLabelStyle: {
                      angle: -35, fontSize: 12, textAnchor: 'end',
                    },
                  },
                ]}
                margin={{ bottom: 70 }}
                series={[
                  {
                    data: numberOfGuestsState,
                    color: "rgb(50, 121, 252)"
                  },
                ]}

              /></div>
              <div style={{ display: 'flex', width: "99%", height: "350px", borderRadius: "5px", boxShadow: "-5px 3px 14px 0px rgba(109, 109, 109, 0.85)", margin: "5px" }}>
                <h5 style={{ marginLeft: "5px" }}>Popularity</h5>
                <BarChart
                  xAxis={[
                    {
                      id: 'barCategories',
                      data: zonesPerYearNameState,
                      scaleType: 'band',
                      tickLabelStyle: {
                        angle: -35, fontSize: 12, textAnchor: 'end',
                      },
                    },

                  ]}
                  margin={{ bottom: 70 }}
                  series={[
                    {
                      data: popularityState,
                      color: "rgb(111, 247, 37)"
                    },
                  ]}

                />
                <h5 style={{ marginLeft: "5px" }}>Profit</h5>
                <BarChart
                  xAxis={[
                    {
                      id: 'barCategories',
                      data: zonesPerYearNameState,
                      scaleType: 'band',
                      tickLabelStyle: {
                        angle: -35, fontSize: 12, textAnchor: 'end',
                      },
                    },
                  ]}
                  margin={{ bottom: 70 }}
                  series={[
                    {
                      data: profitState,
                      color: "rgb(247, 191, 37)"
                    },
                  ]}
                /></div></>
            : <></>}


          {radioB === "monthsPY" && monthsPerYear.length > 0 ?
            <><div style={{ display: 'flex', width: "99%", height: "350px", borderRadius: "5px", boxShadow: "-5px 3px 14px 0px rgba(109, 109, 109, 0.85)", margin: "5px" }}>
              <h5 style={{ marginLeft: "5px" }}>Duration</h5>
              <BarChart
                xAxis={[
                  {
                    id: 'barCategories',
                    data: monthsNameState,
                    scaleType: 'band',
                    tickLabelStyle: {
                      angle: -35, fontSize: 12, textAnchor: 'end',
                    },
                  },
                ]}
                margin={{ bottom: 70 }}
                series={[
                  {
                    data: durationOfStayStateMPY,

                  },
                ]}

              />
              <h5 style={{ marginLeft: "5px" }}>Guests</h5>
              <BarChart
                xAxis={[
                  {
                    id: 'barCategories',
                    data: monthsNameState,
                    scaleType: 'band',
                    tickLabelStyle: {
                      angle: -35, fontSize: 12, textAnchor: 'end',
                    },
                  },
                ]}
                margin={{ bottom: 70 }}
                series={[
                  {
                    data: numberOfGuestsStateMPY,
                    color: "rgb(50, 121, 252)"
                  },
                ]}

              /></div>
              <div style={{ display: 'flex', width: "99%", height: "350px", borderRadius: "5px", boxShadow: "-5px 3px 14px 0px rgba(109, 109, 109, 0.85)", margin: "5px" }}>
                <h5 style={{ marginLeft: "5px" }}>Popularity</h5>
                <BarChart
                  xAxis={[
                    {
                      id: 'barCategories',
                      data: monthsNameState,
                      scaleType: 'band',
                      tickLabelStyle: {
                        angle: -35, fontSize: 12, textAnchor: 'end',
                      },
                    },

                  ]}
                  margin={{ bottom: 70 }}
                  series={[
                    {
                      data: popularityStateMPY,
                      color: "rgb(111, 247, 37)"
                    },
                  ]}

                />
                <h5 style={{ marginLeft: "5px" }}>Profit</h5>
                <BarChart
                  xAxis={[
                    {
                      id: 'barCategories',
                      data: monthsNameState,
                      scaleType: 'band',
                      tickLabelStyle: {
                        angle: -35, fontSize: 12, textAnchor: 'end',
                      },
                    },
                  ]}
                  margin={{ bottom: 70 }}
                  series={[
                    {
                      data: profitStateMPY,
                      color: "rgb(247, 191, 37)"
                    },
                  ]}
                /></div></> : <></>}



        </div>

      </div>
    </div>
  );
}

export default App;
