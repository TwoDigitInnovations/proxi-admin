import { Api, ApiFormData } from "@/services/service";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { FiEdit } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { MdOutlineFileUpload } from "react-icons/md";

function Categories(props) {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [loadTypeData, setloadTypeData] = useState([]);
  const [editid, seteditid] = useState("");
  const [mainFilterData, setMainFilterData] = useState([]);
  const f = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    props.loader(true);
    Api("get", "category/getCategory", "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================> form data :: ", res);
        setloadTypeData(res.data);
        setMainFilterData(res.data);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const submit = (e) => {
    e.preventDefault();

    const datas = new FormData();
    datas.append('name', data.name);

    if (selectedImage) {
      datas.append('image', selectedImage);
    } else {
      console.log('No image selected');
    }


    let method = "post";
    let url = "category/createCategory";
    if (editid) {
      datas.id = data._id;
      url = `category/updateCategory`;
      method = "post";
    }

    ApiFormData(method, url, datas, router).then(
      (res) => {
        console.log("Post truck type", res);
        setData({
          name: "",
          image: "",
        });
        getCategory();
        seteditid("");
        setSelectedImage(null);
        setImagePreview(null);
      },
      (err) => {
        console.log(err);
        props.loader(false);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const deleteCategory = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to proceed with the deletion?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(function (result) {
      console.log(result);
      if (result.isConfirmed) {
        const data = {
          _id,
        };

        props.loader(true);
        Api("delete", `category/deleteCategory/${_id}`, data, router).then(
          (res) => {
            console.log("res================>", res.data?.meaasge);
            props.loader(false);

            getCategory();
          },
          (err) => {
            props.loader(false);
            console.log(err);
            props.toaster({ type: "error", message: err?.data?.meaasge });
            props.toaster({ type: "error", message: err?.meaasge });
          }
        );
      } else if (result.isDenied) {
        // setFullUserDetail({})
      }
    });
  };

  // const handleImageChange = (event) => {
  //   return
  //   const file = event.target.files[0];
  //   const datas = new FormData();
  //   datas.append("file", file);
  //   props.loader(true);
  //   ApiFormData("post", "/user/fileupload", datas, router).then(
  //     (res) => {
  //       props.loader(false);
  //       console.log("res================>", res);
  //       if (res.status) {
  //         setData({ ...data, image: res.data.file });
  //         props.toaster({ type: "success", message: res.data.message });
  //       }
  //     },
  //     (err) => {
  //       props.loader(false);
  //       console.log(err);
  //       props.toaster({ type: "error", message: err?.message });
  //     }
  //   );
  //   const reader = new FileReader();
  //   // let key = event.target.name;
  //   // reader.onloadend = () => {
  //   //   const base64 = reader.result;
  //   //   console.log(base64);
  //   //   // setData({ ...data, img: base64, profile: file });
  //   // };

  //   // if (file) {
  //   //   reader.readAsDataURL(file);
  //   // }
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        Swal.fire('Error!', 'Please select an image file', 'error');
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire('Error!', 'Image size should be less than 10MB', 'error');
        return;
      }

      setSelectedImage(file);
      console.log(file)
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result)
        setImagePreview(e.target.result);
        // setData({ ...data, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    // setData({
    //   name: "",
    //   image: "",
    // });
  };

  return (
    <section className=" w-full h-full bg-transparent md:pt-5 pt-5 pb-5 pl-5 pr-5">
      <p className="font-bold  text-black md:text-[32px] text-2xl">Add Categories</p>

      <section className="h-full w-full overflow-scroll no-scrollbar md:mt-0 mt-5 md:pb-32 pb-28">
        <form className="bg-white border md:my-5 border-[var(--custom-lightsGrayColor)] rounded-[10px] md:p-10 p-5" onSubmit={submit}>

          <div className="md:flex flex-col justify-center items-center">
            <div className="flex flex-col justify-start items-start md:w-auto w-full">
              <p className="text-[var(--custom-lightGrayInputName)] text-sm font-semibold pb-2">
                Add Categories
              </p>
              <input
                className="bg-[var(--custom-lightGrayInputBg)] border border-[var(--custom-offWhite)] outline-none md:h-[50px] h-[40px] md:w-[500px] w-full rounded-[5px] px-5 text-sm font-normal text-black"
                type="text"
                placeholder="Name of Category"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
                required
              />
            </div>

            <div className="mt-5 relative">
              <div className="flex flex-col justify-start items-start">
                <p className="text-[var(--custom-lightGrayInputName)] text-sm font-semibold pb-2">
                  Upload image
                </p>
                <div className="bg-[var(--custom-lightGrayInputBg)] border border-[var(--custom-offWhite)] md:h-[50px] h-[40px] md:w-[500px] w-full rounded-[5px] px-5 text-sm font-normal text-black flex justify-start items-center">
                  <input
                    type="text"
                    className="bg-[var(--custom-lightGrayInputBg)] outline-none md:w-[90%] w-[85%]"
                    value={data?.image}
                    onChange={(e) => {
                      setData({ ...data, image: e.target.value });
                    }}
                  // required
                  />
                </div>
              </div>

              <div className="absolute top-[36px] md:right-[10px]  right-[10px]">
                <MdOutlineFileUpload
                  className="text-black h-8 w-8 cursor-pointer"
                  onClick={() => {
                    f.current.click();
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={f}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            {imagePreview && (
              <div className="flex items-center space-x-2 mt-5">
                <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-md" />
                <button
                  type="button"
                  onClick={clearImage}
                  className="btn-secondary btn-sm"
                >
                  Clear Image
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center pt-5">
            <button
              className="md:h-[40px] h-[40px] md:w-[274px] w-full bg-[var(--custom-orange)] rounded-[10px] md:text-lg text-base text-white "
              type="submit"
            >
              {/* Add Now */}
              {editid ? 'Update' : 'Add Now'}
            </button>
          </div>
        </form>

        <div className="bg-white border border-[var(--custom-lightsGrayColor)] rounded-[10px] p-5 md:mt-0 mt-5">
          <input
            className="bg-custom-lightGrayInputBg text-custom-black border border-[var(--custom-offWhite)] outline-none h-[40px] md:w-[435px] w-full px-5 rounded-[10px] text-custom-darkBlack font-semibold	text-base"
            type="text"
            placeholder="Search categories name"
            onChange={(text) => {
              const d = mainFilterData.filter((f) => f.name.toLowerCase().includes(text?.target.value.toLowerCase()))
              setloadTypeData(d)
            }}
          />
        </div>

        {loadTypeData.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-[var(--custom-lightsGrayColor)] rounded-[10px] p-5 mt-5"
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex justify-start items-center">
                {/* <input
                  className="md:h-[30px] h-[15px] md:w-[30px] w-[15px]"
                  type="checkbox"
                /> */}
                <p className={`text-base text-black font-semibold`}>
                  {/* pl-5 */}
                  {item?.name}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <FiEdit
                  className={`md:h-[30px] h-[20px] md:w-[30px] w-[20px] text-[var(--custom-darkGray)] mr-[20px] cursor-pointer`}
                  onClick={() => {
                    console.log(item)
                    seteditid(item._id), setData({ name: item?.name });
                    setImagePreview(item?.image)
                  }}
                />
                <IoCloseCircleOutline
                  className={`md:h-[30px] h-[20px] md:w-[30px] w-[20px] text-[var(--custom-darkGray)] cursor-pointer`}
                  onClick={() => {
                    deleteCategory(item?._id);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}

export default Categories;
