import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import axios from "axios";
import Card from "../components/Card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const allCategories = useSelector((state) => state.categories);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAnalyse, setShowAnalyse] = useState(false);
  const [countInEachCategory, setCountInEachCategory] = useState([]);

  const chartData = {
    labels: allCategories,
    datasets: [
      {
        label: "number of products",
        data: countInEachCategory,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
        ],
        hoverOffset: 4,
        borderColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const currentCategory =
        selectedCategory === "All"
          ? ""
          : "/category/" + selectedCategory.split(" ").join("%20");
      const { data } = await axios.get(
        "https://fakestoreapi.com/products" + currentCategory
      );
      setData(data);
      setLoading(false);
    };

    const getCountInEachCategory = async () => {
      const { data } = await axios.get("https://fakestoreapi.com/products/");
      const countCalulated = allCategories.map((category) => {
        return data.filter((product) => product.category === category).length;
      });
      setCountInEachCategory(countCalulated);
    };

    fetchData();
    getCountInEachCategory();
    return () => {};
  }, [selectedCategory]);

  return (
    <div>
      <NavBar />
      {loading && (
        <div className="flex justify-center">
          <svg
            aria-hidden="true"
            className="w-96 h-96 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 m-10 p-20"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      <div className="flex flex-wrap justify-around">
        {!loading &&
          data.map((product, index) => <Card product={product} key={index} />)}
      </div>
      <div
        className="bg-blue-600 fixed bottom-10 right-10 px-8 py-2 border rounded-xl text-white font-semibold cursor-pointer hover:bg-blue-700"
        onClick={() => setShowAnalyse(true)}
      >
        Analyse
      </div>
      {showAnalyse ? (
        <>
          <div className="m-4 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">category Analyse</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowAnalyse(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <Pie data={chartData} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Home;
