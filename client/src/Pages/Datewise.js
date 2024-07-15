import React, { useEffect, useState } from "react";
import { ExpenseData } from "../Data";
import BarChart from "../components/BarChart";
import { useNavigate } from "react-router-dom";
import { Segregator } from "../utilities/Categorysegregator";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
// import { SingleDatePicker } from "react-dates";
// import 'react-dates/initialize';
import  moment  from "moment";

let total = 0;






export default function Datewise() {
const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const startDate = new Date();
  const [selectDate, setSelectedDate] = useState(new Date());
  const [focused, setFocused] = useState(null);



//   const [date, setDate] = useState({
//     startdate:  new Date(
//       startDate.getFullYear(),
//       startDate.getMonth() - 1,
//       startDate.getDate()
//     ).toDateString()
  
//   });

  const [result, setResult] = useState(null);

  const [date, setDate] = useState(moment());

  const [expenseData, SetExpenseData] = useState({
    datasets: [
      {
        label: "Expense",
        color: "red",
        data: [],
        borderColor: "black",
        backgroundColor: [
          "rgba(195, 193, 200,1)",
          "rgba(179, 178, 186,1)",
          "rgb(173, 172, 181,1)",
          "rgba(157, 157, 167, 1)",
          "rgba(141, 142, 153, 1)",
          "rgba(109, 111, 124, 1)",
          "rgba(157, 157, 167, 1)",
        ],
      },
    ],
    labels: ExpenseData.map((data) => data.day),
  });

  useEffect(() => {
    async function fetchDailyData() {
    //   const res = await fetch(`/expense/getsingledt_expense/${date.format("YYYY-MM-DD")}`);
      //let data;
      const res = await fetch(`/expense/getsingledt_expense/${date.format("YYYY-MM-DD")}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}});
      const data = await res.json();
    //   const data = await res.json();
      
console.log(data)
      if (data.error) {
        navigate("/");
      } else {
        const Segregated = Segregator(data.filterData);
        total = Segregated[1];
        SetExpenseData({
          datasets: [
            {
              label: "Expense",
              data: Object.values(Segregated[0]),
              borderColor: "black",
              backgroundColor: [
                "rgba(195, 193, 200,1)",
                "rgba(179, 178, 186,1)",
                "rgb(173, 172, 181,1)",
                "rgba(157, 157, 167, 1)",
                "rgba(141, 142, 153, 1)",
                "rgba(109, 111, 124, 1)",
                "rgba(157, 157, 167, 1)",
              ],
              // borderColor: [
              //   "rgba(195, 193, 200,1)",
              //   "rgba(179, 178, 186,1)",
              //   "rgb(173, 172, 181,1)",
              //   "rgba(157, 157, 167, 1)",
              //   "rgba(141, 142, 153, 1)",
              //   "rgba(109, 111, 124, 1)",
              //   "rgba(157, 157, 167, 1)",
              // ],
              borderWidth: 1,
            },
          ],
          labels: Object.keys(Segregated[0]),
        });
      }
    }
    fetchDailyData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
//   const [isLoading, setIsLoading] = useState(false);

  const HandleView = async () => {
    setIsLoading(true);
    const res = await fetch(`/expense/getsingledt_expense/${date.format("YYYY-MM-DD")}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}}).then(function(response) {
        return response.json();
      });
    // const data = await res.json();
    const data = res;
    console.log("rerrwrwew");

    console.log(data);
    if (data.error) {
        navigate("/");
      } else {
        const Segregated = Segregator(data.filterData);
        total = Segregated[1];
        SetExpenseData({
          datasets: [
            {
              label: "Expense",
              data: Object.values(Segregated[0]),
              borderColor: "black",
              backgroundColor: [
                "rgba(195, 193, 200,1)",
                "rgba(179, 178, 186,1)",
                "rgb(173, 172, 181,1)",
                "rgba(157, 157, 167, 1)",
                "rgba(141, 142, 153, 1)",
                "rgba(109, 111, 124, 1)",
                "rgba(157, 157, 167, 1)",
              ],
              // borderColor: [
              //   "rgba(195, 193, 200,1)",
              //   "rgba(179, 178, 186,1)",
              //   "rgb(173, 172, 181,1)",
              //   "rgba(157, 157, 167, 1)",
              //   "rgba(141, 142, 153, 1)",
              //   "rgba(109, 111, 124, 1)",
              //   "rgba(157, 157, 167, 1)",
              // ],
              borderWidth: 1,
            },
          ],
          labels: Object.keys(Segregated[0]),
        });
      }
  };
  return (
    <div className="bg-violet-100" style={{width:'1000px'}}>
      <div className="bg-violet-400 w-3/4 p-5 flex m-auto mt-14 rounded-md justify-center">
        <h1 className="font-bold text-xl font-lexand text-black mr-3 mt-3">
          Datewise Spending
        </h1>



        <span className="font-bold text-2xl font-lexend text-black bg-[#fc7b54] p-3 rounded-md">
          {total}
        </span>
      </div>
      <div className="bg-violet-400 w-3/4 p-5 flex m-auto mt-14 rounded-md justify-center">
       
<div>
<h5 className=" text-m font-lexand text-black mr-2 mt-2">
          Select Date
        </h5>
<DatePicker
 showIcon
        selected={date.toDate()}
        onChange={(date) => { 
         console.log(date)
          setDate(moment(date))
        
          
        }}
        className="p-3  w-3/4 rounded-md outline-none bg-violet-100 px-4 placeholder-[#fc7b54] mt-4 text-black"
      
        showYearDropdown
      />

    </div>
    <div className="mt-4 w-fit ml-auto text-black flex">

    <button
              onClick={HandleView}
              className="py-2 px-4 rounded-md hover:scale-110 duration-150 ease-out font-bold font-lexend bg-[#fc7b54] mr-4"
            >
              view
            </button>
      </div>

       
      </div>
      <div className="w-3/4 m-auto mt-14 bg-white rounded-lg p-6">
        <BarChart chartData={expenseData} />
      </div>
    </div>
  );
}
