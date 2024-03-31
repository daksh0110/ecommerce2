import React, { useState } from "react";
import Layout from "../Layout";
import Image from "next/image";
import axios from "axios";
import Loading from "./Loading";

import { useRouter } from "next/router";
const ProductForm = ({
  id,
  Title: existingTitle,
  Description: existingDescription,
  Price: existingPrice,
  Images: existingImages,
}) => {
  const [Title, setTitle] = useState(existingTitle || "");
  const [Description, SetDiscription] = useState(existingDescription || "");
  const [Price, setPrice] = useState(existingPrice || 0);
  const [Images, Setimages] = useState(existingImages || []);
  const [isUploading, setisUploading] = useState(false);
  const Data = { Title, Description, Price, Images };
  const router = useRouter();
  const onSubmit = (event) => {
    console.log(id);
    if (id) {
      axios.put("/api/Products/?id=" + id, Data).then((response) => {
        console.log(response.data);
      });
    } else {
      console.log("Submitted");
      axios.post("/api/Products", Data).then(function (response) {
        console.log(response);
      });
    }

    event.preventDefault();
    router.push("/Products");
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
    setisUploading(true);
    const response = await axios.post("/api/upload", formData);

    Setimages((prevImages) => [...prevImages, response.data]);
    setisUploading(false);
  };
  return (
    <form className=" flex flex-col">
      <label className="p-2 text-2xl font-bold text-blue-800 login-font ">
        Title
      </label>
      <input
        type="text"
        name="Title"
        value={Title}
        placeholder="Product name"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className=" border-2 rounded-lg p-1 "
      />
      <label className="p-2 text-2xl font-bold text-blue-800 login-font">
        Description
      </label>
      <textarea
        type="text"
        name="Description"
        placeholder="Description of the product"
        value={Description}
        onChange={(e) => {
          SetDiscription(e.target.value);
        }}
        className="border-2 rounded-lg resize-y"
      />
      <label className="p-2 text-2xl  font-bold text-blue-800 login-font">
        Category
      </label>

      <label className="p-2 text-2xl  font-bold text-blue-800 login-font">
        Images
      </label>

      {Images.length === 0 ? (
        <h1 className="pb-1 flex">No Images are present</h1>
      ) : (
        <div className="flex flex-wrap ">
          {Images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={index}
              className="my-2 mr-3 h-24 w-24"
            />
          ))}
          {isUploading && (
            <div className=" h-24 w-24">
              <Loading />
            </div>
          )}
        </div>
      )}

      <div className="h-24 w-24 flex  rounded-xl   bg-gray-400">
        <label
          for="fileInput"
          onChange={handleChange}
          className="cursor-pointer flex text-center w-full justify-center items-center "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
          <input
            type="file"
            id="fileInput"
            name="file"
            hidden
            className="cursor-pointer"
          />
        </label>
      </div>

      <label className="p-2 text-2xl font-bold text-blue-800 login-font">
        Price
      </label>
      <input
        type="number"
        name="Price"
        placeholder="Price of the Product"
        value={Price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        className="border-2 rounded-lg p-1"
      />
      <button
        type="submit"
        onClick={onSubmit}
        className="  mt-4 border text-left w-min p-2 rounded-xl bg-blue-800 login-font text-white"
      >
        Save
      </button>
    </form>
  );
};

export default ProductForm;
